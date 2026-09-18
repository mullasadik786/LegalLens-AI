import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  Highlighter,
  CheckCircle2
} from 'lucide-react';
import { LegalDocument } from '../types/legal';

interface DocumentViewerProps {
  document: LegalDocument;
  targetPage?: number;
  highlightText?: string;
  onPageChange?: (page: number) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  targetPage = 1,
  highlightText = '',
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(targetPage);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [searchWord, setSearchWord] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetPage && targetPage >= 1 && targetPage <= document.rawPages.length) {
      setCurrentPage(targetPage);
    }
  }, [targetPage, document.rawPages.length]);

  const activePageData = document.rawPages.find(p => p.pageNumber === currentPage) || document.rawPages[0];

  const handlePrev = () => {
    if (currentPage > 1) {
      const next = currentPage - 1;
      setCurrentPage(next);
      if (onPageChange) onPageChange(next);
    }
  };

  const handleNext = () => {
    if (currentPage < document.rawPages.length) {
      const next = currentPage + 1;
      setCurrentPage(next);
      if (onPageChange) onPageChange(next);
    }
  };

  // Helper to render text with search or evidence highlight
  const renderHighlightedContent = (text: string) => {
    const term = searchWord.trim() || highlightText.trim();
    if (!term || term.length < 3) {
      return text;
    }

    try {
      const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-cyan-400/30 text-cyan-200 px-1 py-0.5 rounded border border-cyan-400/50">
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch {
      return text;
    }
  };

  return (
    <div className="w-full space-y-4 text-left pb-16">
      {/* Viewer Controls Toolbar */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
        {/* Left: Page Navigator */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition cursor-pointer"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-semibold text-slate-200 px-2">
            Page {currentPage} of {document.rawPages.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage >= document.rawPages.length}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition cursor-pointer"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Search In Document */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Find in page text..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Right: Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 10, 80))}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-400 w-12 text-center">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 10, 150))}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Document Sheet Presentation */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-12 flex justify-center min-h-[600px] overflow-auto shadow-2xl">
        <div
          ref={contentRef}
          className="bg-slate-900 text-slate-200 border border-slate-800/90 rounded-xl p-8 sm:p-14 shadow-2xl w-full max-w-3xl font-mono text-xs leading-relaxed whitespace-pre-wrap select-text transition-all duration-200 relative"
          style={{ fontSize: `${(13 * zoomLevel) / 100}px` }}
        >
          {/* Header watermark */}
          <div className="pb-4 mb-6 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>{document.filename}</span>
            <span>Page {currentPage} of {document.rawPages.length}</span>
          </div>

          {renderHighlightedContent(activePageData?.content || 'Page content unavailable.')}

          {/* Footer watermark */}
          <div className="pt-8 mt-12 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span>Verified Source Grounding</span>
            <span>Confidential & Proprietary</span>
          </div>
        </div>
      </div>
    </div>
  );
};
