import { LegalDocument, EvidenceReference } from '../src/types/legal';

export interface DocumentChunk {
  pageNumber: number;
  section: string;
  text: string;
  score?: number;
}

// 1. Chunk document pages into distinct queryable segments with section headers
export function chunkDocument(document: LegalDocument): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];

  // First chunk from extracted clauses
  for (const clause of document.clauses) {
    chunks.push({
      pageNumber: clause.sourcePage,
      section: clause.sourceSection || clause.title,
      text: `${clause.title}: ${clause.originalText}`
    });
  }

  // Next chunk from raw pages
  for (const page of document.rawPages) {
    const paragraphs = page.content.split(/\n{2,}/);
    for (const para of paragraphs) {
      const trimmed = para.trim();
      if (trimmed.length > 30) {
        chunks.push({
          pageNumber: page.pageNumber,
          section: `Page ${page.pageNumber}`,
          text: trimmed
        });
      }
    }
  }

  return chunks;
}

// 2. Keyword & TF-IDF similarity scoring to retrieve only top-K relevant chunks
export function retrieveRelevantChunks(chunks: DocumentChunk[], query: string, topK = 4): DocumentChunk[] {
  const queryTerms = query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  if (queryTerms.length === 0) {
    return chunks.slice(0, topK);
  }

  const scored = chunks.map((chunk) => {
    const textLower = chunk.text.toLowerCase();
    const sectionLower = chunk.section.toLowerCase();
    let score = 0;

    for (const term of queryTerms) {
      if (sectionLower.includes(term)) score += 5; // Header matches are prioritized
      if (textLower.includes(term)) {
        score += 2;
        // Exact substring bonus
        if (textLower.indexOf(term) !== -1) score += 1;
      }
    }

    return { ...chunk, score };
  });

  return scored
    .filter((c) => (c.score || 0) > 0)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, topK);
}

// 3. Citation & Evidence Verification against Document Truth
export function validateEvidenceAgainstDocument(
  evidence: EvidenceReference[],
  document: LegalDocument
): EvidenceReference[] {
  return evidence.map((item) => {
    // Check if page exists in document
    const pageExists = document.rawPages.some((p) => p.pageNumber === item.page);
    
    // Check if quote exists partially or fully in document
    const snippet = item.text.trim().slice(0, 40).toLowerCase();
    const quoteExists = document.rawPages.some((p) => p.content.toLowerCase().includes(snippet)) ||
      document.clauses.some((c) => c.originalText.toLowerCase().includes(snippet));

    if (pageExists && quoteExists) {
      return {
        ...item,
        confidence: 'Evidence found'
      };
    } else if (pageExists) {
      return {
        ...item,
        confidence: 'Needs verification'
      };
    } else {
      return {
        ...item,
        confidence: 'Evidence incomplete'
      };
    }
  });
}
