import { describe, it, expect } from 'vitest';
import { DEMO_DOCUMENT_V1, DEMO_DOCUMENT_V2, DEMO_COMPARISONS } from '../src/data/demoDocuments';

describe('Document Comparison & Version Diff Engine', () => {
  it('identifies differences across clauses between V1 and V2', () => {
    expect(DEMO_COMPARISONS.length).toBeGreaterThan(0);
    const bonusDiff = DEMO_COMPARISONS.find(c => c.title.toLowerCase().includes('signing bonus'));
    expect(bonusDiff).toBeDefined();
    expect(bonusDiff?.status).toBe('added');
  });

  it('detects notice period extension between versions', () => {
    const noticeDiff = DEMO_COMPARISONS.find(c => c.title.toLowerCase().includes('notice period'));
    expect(noticeDiff).toBeDefined();
    expect(noticeDiff?.versionA.section).toBe('Section 8.2');
    expect(noticeDiff?.versionB.section).toBe('Section 8.2');
    expect(noticeDiff?.deltaExplanation).toContain('60 days');
  });

  it('detects non-solicitation duration expansion', () => {
    const nonSolDiff = DEMO_COMPARISONS.find(c => c.title.toLowerCase().includes('non-solicitation'));
    expect(nonSolDiff).toBeDefined();
    expect(nonSolDiff?.category).toBe('RESTRICTIONS');
    expect(nonSolDiff?.financialImpact).toContain('post-employment constraint');
  });
});
