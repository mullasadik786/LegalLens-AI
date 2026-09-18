export type DocumentType = 
  | 'Employment Agreement'
  | 'Rental Agreement'
  | 'Non-Disclosure Agreement (NDA)'
  | 'Freelance / Service Contract'
  | 'Vendor Agreement'
  | 'Terms & Conditions'
  | 'Partnership Agreement'
  | 'General Contract';

export type ClauseCategory = 
  | 'Payment'
  | 'Obligations'
  | 'Rights'
  | 'Termination'
  | 'Renewal'
  | 'Liability'
  | 'Confidentiality'
  | 'Intellectual Property'
  | 'Privacy'
  | 'Restrictions'
  | 'Dispute Resolution'
  | 'Governing Law'
  | 'Deadlines'
  | 'Notices'
  | 'Other';

export type AttentionLevel = 
  | 'Needs Attention'
  | 'Important Provision'
  | 'Potential Ambiguity'
  | 'Deadline'
  | 'Missing Information'
  | 'Professional Review';

export interface EvidenceReference {
  page: number;
  section: string;
  text: string;
  confidence?: 'Evidence found' | 'Evidence incomplete' | 'Needs verification';
}

export interface LegalClause {
  id: string;
  category: ClauseCategory;
  title: string;
  originalText: string;
  plainLanguage: {
    en: string;
    te?: string;
    hi?: string;
  };
  whyItMatters: string;
  sourcePage: number;
  sourceSection: string;
  questionsToConsider: string[];
  attentionType?: AttentionLevel;
}

export interface TimelineEvent {
  id: string;
  dateString: string;
  title: string;
  description: string;
  responsibleParty?: string;
  sourcePage: number;
  sourceSection: string;
  status: 'upcoming' | 'action_required' | 'milestone';
}

export interface DocumentOverview {
  title: string;
  documentType: DocumentType;
  parties: string[];
  effectiveDate: string;
  expirationDate: string;
  governingLaw: string;
  documentLanguage: string;
}

export interface ExecutiveSummary {
  whatIsThis: string;
  parties: string;
  purpose: string;
  obligations: string;
  financialTerms: string;
  importantDates: string;
  termination: string;
  reviewCarefully: string;
}

export interface AttentionItem {
  id: string;
  level: AttentionLevel;
  title: string;
  observation: string;
  reason: string;
  sourcePage: number;
  sourceSection: string;
  questionToConsider: string;
}

export interface DecisionNode {
  id: string;
  label: string;
  category: 'document' | 'parties' | 'obligations' | 'payments' | 'deadlines' | 'termination' | 'ip' | 'dispute';
  summary: string;
  sourcePage: number;
  sourceSection: string;
  connectedTo: string[];
}

export interface ComparisonDiff {
  id: string;
  category: string;
  title: string;
  status: 'modified' | 'added' | 'removed';
  versionA: {
    text: string;
    page: number;
    section: string;
  };
  versionB: {
    text: string;
    page: number;
    section: string;
  };
  deltaExplanation: string;
  financialImpact?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  evidence?: EvidenceReference[];
  uncertaintyNotice?: string;
  needsProfessionalReview?: boolean;
  translatedContent?: {
    te?: string;
    hi?: string;
  };
}

export interface ActionChecklistItem {
  id: string;
  category: 'Important Dates' | 'My Obligations' | 'Information to Verify' | 'Questions to Ask' | 'Documents to Gather' | 'Professional Review Topics';
  text: string;
  completed: boolean;
  sourcePage?: number;
  sourceSection?: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  filename: string;
  fileSize: string;
  documentType: DocumentType;
  uploadedAt: string;
  pageCount: number;
  sectionsCount: number;
  clausesCount: number;
  obligationsCount: number;
  datesCount: number;
  paymentsCount: number;
  questionsCount: number;
  overview: DocumentOverview;
  executiveSummary: ExecutiveSummary;
  clauses: LegalClause[];
  timeline: TimelineEvent[];
  attentionItems: AttentionItem[];
  decisionNodes: DecisionNode[];
  rawPages: { pageNumber: number; content: string }[];
  isDemo?: boolean;
}

export type SupportedLanguage = 'en' | 'te' | 'hi';
