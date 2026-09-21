import { describe, it, expect } from 'vitest';
import { documentStore } from '../server/documentStore';
import { LegalDocument } from '../src/types/legal';

describe('Document Store & IDOR Protection', () => {
  const createMockDoc = (id: string, title: string): LegalDocument => ({
    id,
    title,
    filename: `${title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
    fileSize: '128 KB',
    documentType: 'Employment Agreement',
    uploadedAt: '2026-10-01',
    pageCount: 1,
    sectionsCount: 1,
    clausesCount: 0,
    obligationsCount: 0,
    datesCount: 0,
    paymentsCount: 0,
    questionsCount: 0,
    overview: {
      title,
      documentType: 'Employment Agreement',
      parties: ['Party A', 'Party B'],
      effectiveDate: '2026-10-01',
      expirationDate: '2027-10-01',
      governingLaw: 'California',
      documentLanguage: 'English'
    },
    executiveSummary: {
      whatIsThis: 'Mock contract',
      parties: 'Party A and Party B',
      purpose: 'Mock purpose',
      obligations: 'Standard obligations',
      financialTerms: 'Standard terms',
      importantDates: 'None',
      termination: 'Standard',
      reviewCarefully: 'Standard'
    },
    clauses: [],
    timeline: [],
    attentionItems: [],
    decisionNodes: [],
    rawPages: [{ pageNumber: 1, content: 'Terms and conditions apply.' }]
  });

  it('stores and retrieves a document for the authorized owner', () => {
    const userA = 'user_session_abc123';
    const mockDoc = createMockDoc('doc-test-1', 'Consulting Contract');
    
    documentStore.save(mockDoc, userA);

    const result = documentStore.get(mockDoc.id, userA);
    expect(result.status).toBe('OK');
    expect(result.document?.title).toBe('Consulting Contract');
  });

  it('prevents IDOR: unauthorized user B cannot access user A document', () => {
    const userA = 'user_session_abc123';
    const userB = 'user_session_attacker999';
    const mockDoc = createMockDoc('doc-test-secret', 'Confidential Merger Agreement');

    documentStore.save(mockDoc, userA);

    // Attempt retrieval as user B
    const resultB = documentStore.get(mockDoc.id, userB);
    expect(resultB.status).toBe('FORBIDDEN');
    expect(resultB.document).toBeUndefined();

    // Attempt deletion as user B
    const deleted = documentStore.delete(mockDoc.id, userB);
    expect(deleted).toBe(false);

    // Verify user A still has access
    const resultA = documentStore.get(mockDoc.id, userA);
    expect(resultA.status).toBe('OK');
    expect(resultA.document).toBeDefined();
  });

  it('isolates document listings per user', () => {
    const userA = 'user_alice';
    const userB = 'user_bob';

    documentStore.save(createMockDoc('doc-a1', 'Alice Doc 1'), userA);
    documentStore.save(createMockDoc('doc-a2', 'Alice Doc 2'), userA);
    documentStore.save(createMockDoc('doc-b1', 'Bob Doc 1'), userB);

    const aliceDocs = documentStore.listForUser(userA);
    const bobDocs = documentStore.listForUser(userB);

    expect(aliceDocs.some(d => d.id === 'doc-a1')).toBe(true);
    expect(aliceDocs.some(d => d.id === 'doc-a2')).toBe(true);
    expect(aliceDocs.some(d => d.id === 'doc-b1')).toBe(false);

    expect(bobDocs.some(d => d.id === 'doc-b1')).toBe(true);
    expect(bobDocs.some(d => d.id === 'doc-a1')).toBe(false);
  });
});
