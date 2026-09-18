import { describe, it, expect } from 'vitest';
import { chunkDocument, retrieveRelevantChunks, validateEvidenceAgainstDocument } from '../server/ragEngine';
import { LegalDocument } from '../src/types/legal';

describe('RAG Engine & Evidence Grounding', () => {
  const sampleDoc: LegalDocument = {
    id: 'doc-rag-1',
    title: 'Software Development Agreement',
    documentType: 'Development Agreement',
    riskScore: 50,
    summary: 'Dev agreement summary',
    effectiveDate: '2026-01-01',
    parties: ['Client', 'Developer'],
    clauses: [
      {
        id: 'c-1',
        title: 'Early Termination for Breach',
        category: 'Termination',
        originalText: 'Either party may terminate this agreement with 15 days written notice in the event of material breach.',
        plainLanguage: { en: 'You can cancel if there is a big contract violation with 15 days notice.' },
        whyItMatters: 'Protects against persistent default.',
        sourcePage: 2,
        sourceSection: 'Section 8.1',
        questionsToConsider: ['What constitutes material breach?']
      }
    ],
    timeline: [],
    rawPages: [
      {
        pageNumber: 1,
        content: 'Section 1. Definitions.\nSoftware means the source code.\nSection 2. Scope of Work.\nThe Developer shall deliver milestone 1 within 30 days.'
      },
      {
        pageNumber: 2,
        content: 'Section 8. Termination.\nEither party may terminate this agreement with 15 days written notice in the event of material breach.\nSection 9. Governing Law.\nThis agreement shall be governed by Delaware law.'
      }
    ]
  };

  it('chunks documents by sections and retains accurate page provenance', () => {
    const chunks = chunkDocument(sampleDoc);
    expect(chunks.length).toBeGreaterThanOrEqual(2);

    const termChunk = chunks.find(c => c.text.includes('Termination'));
    expect(termChunk).toBeDefined();
    expect(termChunk?.pageNumber).toBe(2);
    expect(termChunk?.section).toMatch(/Section 8/i);
  });

  it('retrieves relevant evidence chunks matching a question', () => {
    const chunks = chunkDocument(sampleDoc);
    const results = retrieveRelevantChunks(chunks, 'How can I terminate the agreement?', 2);

    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].text).toContain('terminate');
    expect(results[0].pageNumber).toBe(2);
  });

  it('verifies cited quotes exist faithfully in document text', () => {
    const validEvidence = [
      {
        page: 2,
        section: 'Section 8.1',
        text: 'Either party may terminate this agreement with 15 days written notice'
      }
    ];

    const invalidEvidence = [
      {
        page: 99,
        section: 'Section 99',
        text: 'This hallucinated text does not exist anywhere in the agreement at all.'
      }
    ];

    const validVerified = validateEvidenceAgainstDocument(validEvidence, sampleDoc);
    expect(validVerified[0].confidence).toBe('Evidence found');

    const invalidVerified = validateEvidenceAgainstDocument(invalidEvidence, sampleDoc);
    expect(invalidVerified[0].confidence).toBe('Evidence incomplete');
  });
});
