import { LegalDocument, ChatMessage, SupportedLanguage } from '../types/legal';
import { DEMO_DOCUMENT_V1 } from '../data/demoDocuments';

export interface AIProvider {
  answerQuestion(
    question: string,
    document: LegalDocument,
    language: SupportedLanguage
  ): Promise<{
    answer: string;
    evidence: Array<{
      page: number;
      section: string;
      text: string;
      confidence?: 'Evidence found' | 'Evidence incomplete' | 'Needs verification';
    }>;
    uncertainty?: string;
    needsProfessionalReview?: boolean;
  }>;
  translateText(text: string, targetLanguage: SupportedLanguage): Promise<string>;
  generateBrief(document: LegalDocument): Promise<any>;
}

export const LegalLensAIProvider: AIProvider = {
  async answerQuestion(question, document, language = 'en') {
    try {
      const res = await fetch('/api/documents/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          documentContext: document.overview.title + '\n' + JSON.stringify(document.overview) + '\n' + document.rawPages.map(p => `[Page ${p.pageNumber}]\n${p.content}`).join('\n\n'),
          rawPages: document.rawPages,
          language
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.warn('Backend question fetch failed, using fallback RAG parser:', err);

      // Local evidence RAG matching
      const qLower = question.toLowerCase();
      
      // Match clause by keyword
      const matchedClause = document.clauses.find(c => 
        qLower.includes(c.category.toLowerCase()) ||
        c.title.toLowerCase().split(' ').some(w => w.length > 3 && qLower.includes(w)) ||
        qLower.includes('terminate') && c.category === 'Termination' ||
        qLower.includes('obligation') && c.category === 'Obligations' ||
        qLower.includes('salary') && c.category === 'Payment' ||
        qLower.includes('bonus') && c.title.toLowerCase().includes('bonus') ||
        qLower.includes('ip') && c.category === 'Intellectual Property' ||
        qLower.includes('arbitration') && c.category === 'Dispute Resolution'
      );

      if (matchedClause) {
        let answerText = matchedClause.plainLanguage[language] || matchedClause.plainLanguage.en;
        return {
          answer: `According to ${matchedClause.sourceSection} (Page ${matchedClause.sourcePage}), the agreement provides: ${answerText}`,
          evidence: [
            {
              page: matchedClause.sourcePage,
              section: matchedClause.sourceSection,
              text: matchedClause.originalText,
              confidence: 'Evidence found'
            }
          ],
          uncertainty: matchedClause.attentionType === 'Potential Ambiguity' ? 'The provision may involve conditional discretion.' : '',
          needsProfessionalReview: matchedClause.attentionType === 'Professional Review'
        };
      }

      if (qLower.includes('date') || qLower.includes('when') || qLower.includes('deadline')) {
        const topEvents = document.timeline.slice(0, 3);
        return {
          answer: `Key dates identified in the document include: ${topEvents.map(e => `${e.title} on ${e.dateString} (${e.sourceSection}, Page ${e.sourcePage})`).join('; ')}.`,
          evidence: topEvents.map(e => ({
            page: e.sourcePage,
            section: e.sourceSection,
            text: e.description,
            confidence: 'Evidence found'
          })),
          uncertainty: '',
          needsProfessionalReview: false
        };
      }

      return {
        answer: 'The uploaded document does not provide enough specific information to answer that question directly. For matters not explicitly covered in the text, consulting legal counsel or human resources is recommended.',
        evidence: [],
        uncertainty: 'Information missing from contract clauses.',
        needsProfessionalReview: true
      };
    }
  },

  async translateText(text, targetLanguage) {
    if (targetLanguage === 'en') return text;
    try {
      const res = await fetch('/api/documents/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage })
      });
      if (res.ok) {
        const data = await res.json();
        return data.translatedText || text;
      }
    } catch {
      // fallback
    }
    return text;
  },

  async generateBrief(document) {
    try {
      const res = await fetch('/api/documents/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentTitle: document.title,
          overview: document.overview,
          clauses: document.clauses,
          attentionItems: document.attentionItems
        })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }
    return {
      title: `Legal Consultation Brief — ${document.title}`,
      generatedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      clientNotice: 'Generated for informational and consultation-preparation purposes only. This output is not legal advice.',
      sections: [
        {
          heading: '1. Executive Summary & Parties',
          content: `Document: ${document.overview.title}\nParties: ${document.overview.parties.join(' & ')}\nEffective Date: ${document.overview.effectiveDate}\nJurisdiction: ${document.overview.governingLaw}`
        },
        {
          heading: '2. Priority Attention Items',
          content: document.attentionItems.map(item => `• [${item.level}] ${item.title} (${item.sourceSection}, Page ${item.sourcePage}): ${item.observation}`).join('\n\n')
        },
        {
          heading: '3. Prepared Questions for Attorney',
          content: document.clauses.flatMap(c => c.questionsToConsider).slice(0, 5).map((q, i) => `${i + 1}. ${q}`).join('\n')
        }
      ]
    };
  }
};
