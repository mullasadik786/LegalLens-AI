import React from 'react';
import { Scale, Sparkles, Upload, FileText, Globe, ShieldCheck, Download, Menu, X, ArrowRight, Zap, Sun, Moon } from 'lucide-react';
import { LegalDocument, SupportedLanguage } from '../types/legal';

interface NavbarProps {
  currentDoc: LegalDocument | null;
  documents: LegalDocument[];
  onSelectDoc: (doc: LegalDocument) => void;
  language: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenUpload: () => void;
  onOpenExport: () => void;
  onLoadDemo: () => void;
  onNavigateHome: () => void;
  onToggleSidebarMobile: () => void;
  sidebarMobileOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDoc,
  documents,
  onSelectDoc,
  language,
  onSelectLanguage,
  theme,
  onToggleTheme,
  onOpenUpload,
  onOpenExport,
  onLoadDemo,
  onNavigateHome,
  onToggleSidebarMobile,
  sidebarMobileOpen,
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebarMobile}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Toggle navigation menu"
          >
            {sidebarMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Scale className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-white brand-title tracking-tight">LegalLens</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide">Turn Complexity into Clarity</p>
            </div>
          </div>
        </div>

        {/* Center: Active Document Selector (if documents exist) */}
        {documents.length > 0 && currentDoc && (
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-full px-3 py-1.5 max-w-md">
            <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-xs text-slate-400 shrink-0">Active:</span>
            <select
              value={currentDoc.id}
              onChange={(e) => {
                const found = documents.find(d => d.id === e.target.value);
                if (found) onSelectDoc(found);
              }}
              className="bg-transparent text-xs text-slate-200 font-medium truncate outline-none cursor-pointer pr-2"
            >
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id} className="bg-slate-900 text-slate-200">
                  {doc.title} {doc.isDemo ? '(Demo)' : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Right: Language, Theme Toggle, Demo Trigger, Upload & Export Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-xs font-medium text-slate-200 outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900 text-white">English</option>
              <option value="te" className="bg-slate-900 text-white">తెలుగు (Telugu)</option>
              <option value="hi" className="bg-slate-900 text-white">हिन्दी (Hindi)</option>
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button
            id="nav-theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer shadow-sm"
          >
            {theme === 'light' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Security status badge */}
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Vault Isolated</span>
          </div>

          {/* Quick Demo Button */}
          <button
            id="nav-interactive-demo-btn"
            onClick={onLoadDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg transition"
            title="Load Acme Technologies Fictional Demo Agreement"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Try Demo</span>
          </button>

          {/* Export Button */}
          {currentDoc && (
            <button
              onClick={onOpenExport}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export</span>
            </button>
          )}

          {/* Upload Document Primary CTA */}
          <button
            id="nav-upload-doc-btn"
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg shadow-md shadow-indigo-600/25 transition cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>
    </header>
  );
};

