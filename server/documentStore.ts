import { LegalDocument } from '../src/types/legal';

// ==========================================
// SESSION-SCOPED DOCUMENT STORE & IDOR GUARDS
// ==========================================
export interface StoredDocument {
  document: LegalDocument;
  userId: string;
  createdAt: number;
}

class DocumentRepository {
  private documents = new Map<string, StoredDocument>();
  private analysisCache = new Map<string, any>();

  // Save document with strict user ownership
  save(doc: LegalDocument, userId: string): StoredDocument {
    const record: StoredDocument = {
      document: doc,
      userId,
      createdAt: Date.now()
    };
    this.documents.set(doc.id, record);
    return record;
  }

  // Retrieve document enforcing user ownership (IDOR defense)
  get(docId: string, userId: string): { status: 'OK' | 'FORBIDDEN' | 'NOT_FOUND'; document?: LegalDocument } {
    const record = this.documents.get(docId);
    if (!record) {
      return { status: 'NOT_FOUND' };
    }
    // Strict ownership verification:
    if (record.userId !== userId && record.userId !== 'public_demo') {
      return { status: 'FORBIDDEN' };
    }
    return { status: 'OK', document: record.document };
  }

  // Delete document and purge all associated memory (Privacy mandate)
  delete(docId: string, userId: string): boolean {
    const record = this.documents.get(docId);
    if (!record) return false;
    if (record.userId !== userId && record.userId !== 'public_demo') {
      return false;
    }
    this.documents.delete(docId);
    // Invalidate cached analysis
    for (const key of this.analysisCache.keys()) {
      if (key.startsWith(docId)) {
        this.analysisCache.delete(key);
      }
    }
    return true;
  }

  // Caching for expensive AI operations
  getCachedAnalysis(cacheKey: string): any | null {
    return this.analysisCache.get(cacheKey) || null;
  }

  setCachedAnalysis(cacheKey: string, data: any) {
    this.analysisCache.set(cacheKey, data);
  }

  // List documents owned by user
  listForUser(userId: string): LegalDocument[] {
    const docs: LegalDocument[] = [];
    for (const record of this.documents.values()) {
      if (record.userId === userId || record.userId === 'public_demo') {
        docs.push(record.document);
      }
    }
    return docs;
  }

  clear() {
    this.documents.clear();
    this.analysisCache.clear();
  }
}

export const documentStore = new DocumentRepository();
