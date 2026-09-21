import React, { useState, useEffect } from 'react';
import { LegalDisclaimerBanner } from './components/LegalDisclaimerBanner';
import { TrustBar } from './components/TrustBar';
import { AnalysisProgressBanner } from './components/AnalysisProgressBanner';
import { NextStepNavigator } from './components/NextStepNavigator';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { HeroLanding } from './components/HeroLanding';
import { DocumentXRay } from './components/DocumentXRay';
import { ClauseExplorer } from './components/ClauseExplorer';
import { ClauseRadar } from './components/ClauseRadar';
import { LegalDecisionMap } from './components/LegalDecisionMap';
import { EvidenceChat } from './components/EvidenceChat';
import { DeepCompare } from './components/DeepCompare';
import { ObligationTimeline } from './components/ObligationTimeline';
import { ActionPlan } from './components/ActionPlan';
import { LawyerBriefModal } from './components/LawyerBriefModal';
import { DocumentViewer } from './components/DocumentViewer';
import { LegalVault } from './components/LegalVault';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { ExportCenterModal } from './components/ExportCenterModal';
import { EcommerceSupportHub } from './components/ecommerce/EcommerceSupportHub';
import { Sun, Moon } from 'lucide-react';

import { LegalDocument, SupportedLanguage, LegalClause } from './types/legal';
import { DEMO_DOCUMENT_V1, DEMO_DOCUMENT_V2, DEMO_COMPARISONS } from './data/demoDocuments';

export default function App() {
  const [documents, setDocuments] = useState<LegalDocument[]>([DEMO_DOCUMENT_V1, DEMO_DOCUMENT_V2]);
  const [currentDoc, setCurrentDoc] = useState<LegalDocument>(DEMO_DOCUMENT_V1);
  const [activeTab, setActiveTab] = useState<NavTab>('ecommerce_agent');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState<boolean>(false);
  const [showAnalysisProgress, setShowAnalysisProgress] = useState<boolean>(false);

  // Theme state: light or dark, persisted in localStorage
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('legallens_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('legallens_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Viewer state
  const [targetViewerPage, setTargetViewerPage] = useState<number>(1);
  const [targetViewerHighlight, setTargetViewerHighlight] = useState<string>('');

  // Chat preprompt
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | null>(null);

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Navigation handlers
  const handleJumpToEvidence = (page: number, section: string, text?: string) => {
    setTargetViewerPage(page);
    setTargetViewerHighlight(text || section);
    setActiveTab('viewer');
  };

  const handleAskAboutClause = (clauseTitle: string) => {
    setChatInitialPrompt(`Explain the implications of "${clauseTitle}" in plain language and what I should negotiate.`);
    setActiveTab('chat');
  };

  const handleAskAIFromNode = (question: string) => {
    setChatInitialPrompt(question);
    setActiveTab('chat');
  };

  const handleDocumentProcessed = (newDoc: LegalDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setCurrentDoc(newDoc);
    setShowAnalysisProgress(true);
    setActiveTab('xray');
  };

  const handleSelectClause = (clause: LegalClause) => {
    handleJumpToEvidence(clause.sourcePage, clause.sourceSection, clause.originalText);
  };

  const handleDeleteDoc = (docId: string) => {
    const updated = documents.filter((d) => d.id !== docId);
    setDocuments(updated);
    if (currentDoc.id === docId) {
      if (updated.length > 0) {
        setCurrentDoc(updated[0]);
      } else {
        setActiveTab('vault');
      }
    }
  };

  const handleLoadDemo = () => {
    if (!documents.some(d => d.id === DEMO_DOCUMENT_V1.id)) {
      setDocuments([DEMO_DOCUMENT_V1, DEMO_DOCUMENT_V2, ...documents]);
    }
    setCurrentDoc(DEMO_DOCUMENT_V1);
    setShowAnalysisProgress(true);
    setActiveTab('xray');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* 1. Sticky Legal Safety & Disclaimer Banner */}
      <LegalDisclaimerBanner />

      {/* 2. Trust Bar (Security, Evidence, AI Assistance, Not Legal Advice) */}
      <TrustBar />

      {/* 3. Top Application Navbar */}
      <Navbar
        currentDoc={currentDoc}
        documents={documents}
        onSelectDoc={(doc) => {
          setCurrentDoc(doc);
          setActiveTab('xray');
        }}
        language={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onLoadDemo={handleLoadDemo}
        onNavigateHome={() => setActiveTab('home')}
        onToggleSidebarMobile={() => setSidebarMobileOpen(!sidebarMobileOpen)}
        sidebarMobileOpen={sidebarMobileOpen}
      />

      {/* 4. Main Workspace Area */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar (visible once user enters document workspace) */}
        {activeTab !== 'home' && (
          <Sidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            isMobileOpen={sidebarMobileOpen}
            onCloseMobile={() => setSidebarMobileOpen(false)}
            hasDocument={Boolean(currentDoc)}
          />
        )}

        {/* Dynamic Center Stage */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto ${activeTab === 'home' || activeTab === 'ecommerce_agent' ? 'max-w-7xl mx-auto' : ''}`}>
          {activeTab === 'ecommerce_agent' && (
            <EcommerceSupportHub />
          )}

          {/* Analysis Progress Staging (Document loaded -> Text extracted -> Clauses identified -> Dates identified -> Evidence mapped -> Analysis ready) */}
          {showAnalysisProgress && (
            <AnalysisProgressBanner onComplete={() => setShowAnalysisProgress(false)} />
          )}

          {activeTab === 'home' && (
            <HeroLanding
              onStartAnalyze={() => setIsUploadOpen(true)}
              onStartDemo={handleLoadDemo}
              onExploreFeatures={(feat) => {
                if (feat === 'compare') setActiveTab('compare');
                else if (feat === 'radar') setActiveTab('radar');
                else if (feat === 'chat') setActiveTab('chat');
                else setActiveTab('xray');
              }}
            />
          )}

          {activeTab === 'xray' && currentDoc && (
            <DocumentXRay
              document={currentDoc}
              onJumpToEvidence={handleJumpToEvidence}
              onOpenClauseExplorer={() => setActiveTab('clauses')}
              onOpenTimeline={() => setActiveTab('timeline')}
              onOpenChat={() => setActiveTab('chat')}
            />
          )}

          {activeTab === 'clauses' && currentDoc && (
            <ClauseExplorer
              clauses={currentDoc.clauses}
              currentLanguage={currentLanguage}
              onJumpToEvidence={handleJumpToEvidence}
              onAskAboutClause={handleAskAboutClause}
            />
          )}

          {activeTab === 'radar' && currentDoc && (
            <ClauseRadar
              document={currentDoc}
              onSelectClause={handleSelectClause}
              onJumpToEvidence={handleJumpToEvidence}
            />
          )}

          {activeTab === 'decision_map' && currentDoc && (
            <LegalDecisionMap
              document={currentDoc}
              onJumpToEvidence={handleJumpToEvidence}
              onAskAI={handleAskAIFromNode}
            />
          )}

          {activeTab === 'chat' && currentDoc && (
            <EvidenceChat
              document={currentDoc}
              language={currentLanguage}
              onJumpToEvidence={handleJumpToEvidence}
              initialPrompt={chatInitialPrompt}
              onClearInitialPrompt={() => setChatInitialPrompt(null)}
            />
          )}

          {activeTab === 'next_steps' && currentDoc && (
            <NextStepNavigator
              document={currentDoc}
              onNavigateToTab={(tab: any) => setActiveTab(tab as NavTab)}
            />
          )}

          {activeTab === 'compare' && (
            <DeepCompare
              documentA={DEMO_DOCUMENT_V1}
              documentB={DEMO_DOCUMENT_V2}
              diffs={DEMO_COMPARISONS}
              onJumpToDocument={(docId, page) => {
                const target = documents.find(d => d.id === docId) || DEMO_DOCUMENT_V1;
                setCurrentDoc(target);
                setTargetViewerPage(page);
                setActiveTab('viewer');
              }}
            />
          )}

          {activeTab === 'timeline' && currentDoc && (
            <ObligationTimeline
              timeline={currentDoc.timeline}
              onJumpToEvidence={handleJumpToEvidence}
            />
          )}

          {activeTab === 'action_plan' && (
            <ActionPlan
              onJumpToEvidence={handleJumpToEvidence}
            />
          )}

          {activeTab === 'lawyer_brief' && currentDoc && (
            <LawyerBriefModal
              document={currentDoc}
              onJumpToEvidence={handleJumpToEvidence}
            />
          )}

          {activeTab === 'viewer' && currentDoc && (
            <DocumentViewer
              document={currentDoc}
              targetPage={targetViewerPage}
              highlightText={targetViewerHighlight}
              onPageChange={setTargetViewerPage}
            />
          )}

          {activeTab === 'vault' && (
            <LegalVault
              documents={documents}
              onOpenDoc={(doc) => {
                setCurrentDoc(doc);
                setActiveTab('viewer');
              }}
              onAnalyzeDoc={(doc) => {
                setCurrentDoc(doc);
                setActiveTab('xray');
              }}
              onCompareDoc={(doc) => {
                setCurrentDoc(doc);
                setActiveTab('compare');
              }}
              onDeleteDoc={handleDeleteDoc}
              onUploadClick={() => setIsUploadOpen(true)}
              onLoadDemo={handleLoadDemo}
            />
          )}

          {activeTab === 'settings' && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 max-w-2xl mx-auto space-y-6 text-left">
              <h1 className="text-xl font-bold text-white">LegalLens AI Settings & Preferences</h1>

              {/* Theme Selector Section */}
              <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-indigo-400 block text-sm">Appearance & Visual Theme</strong>
                    <p className="text-xs text-slate-400 mt-0.5">Choose your preferred workspace aesthetic.</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Active: {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'border-indigo-500 bg-indigo-500/15 text-indigo-300 shadow-sm ring-1 ring-indigo-500/40'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-slate-200">☀️ Light Theme</span>
                      <span className="text-[10px] text-slate-400 font-normal">Clean, high-contrast clarity</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'border-indigo-500 bg-indigo-500/15 text-indigo-300 shadow-sm ring-1 ring-indigo-500/40'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-slate-200">🌙 Dark Theme</span>
                      <span className="text-[10px] text-slate-400 font-normal">Deep twilight focus</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-indigo-400 block text-sm">Strict Zero Data Retention / Isolation</strong>
                  <p>Uploaded documents and conversation tokens remain ephemeral and local to your current container session. They are never retained for model re-training.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-indigo-400 block text-sm">Security Guardian Boundary</strong>
                  <p>All extracted texts and PDF streams are isolated in safe quotation blocks with prompt-injection filtering preventing malicious system directive overrides.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-indigo-400 block text-sm">Statutory Disclaimer</strong>
                  <p>LegalLens AI provides automated document intelligence, readability indexing, and consultation prep. It is not an attorney and does not dispense legal advice.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDocumentProcessed={handleDocumentProcessed}
      />

      {/* Export Center Modal */}
      {currentDoc && (
        <ExportCenterModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          document={currentDoc}
        />
      )}
    </div>
  );
}
