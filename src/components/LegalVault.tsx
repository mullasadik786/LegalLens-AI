import React, { useState } from 'react';
import {
  LockKeyhole,
  FileText,
  Trash2,
  ExternalLink,
  Cpu,
  GitCompare,
  Download,
  Upload,
  ShieldCheck,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { LegalDocument } from '../types/legal';
import { LegalImages } from '../assets/images';

interface LegalVaultProps {
  documents: LegalDocument[];
  onOpenDoc: (doc: LegalDocument) => void;
  onAnalyzeDoc: (doc: LegalDocument) => void;
  onCompareDoc: (doc: LegalDocument) => void;
  onDeleteDoc: (docId: string) => void;
  onUploadClick: () => void;
  onLoadDemo: () => void;
}

export const LegalVault: React.FC<LegalVaultProps> = ({
  documents,
  onOpenDoc,
  onAnalyzeDoc,
  onCompareDoc,
  onDeleteDoc,
  onUploadClick,
  onLoadDemo,
}) => {
  const [docToDelete, setDocToDelete] = useState<LegalDocument | null>(null);

  const confirmDelete = () => {
    if (docToDelete) {
      onDeleteDoc(docToDelete.id);
      setDocToDelete(null);
    }
  };

  return (
    <div className="w-full space-y-6 text-left pb-16">
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <LockKeyhole className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>My Private Legal Vault</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                Isolated Storage
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Encrypted documents, extracted chunks, and RAG embeddings strictly isolated to your browser session.
            </p>
          </div>
        </div>

        <button
          onClick={onUploadClick}
          className="px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Documents Grid or Empty State */}
      {documents.length === 0 ? (
        /* Empty State */
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 sm:p-16 text-center max-w-xl mx-auto space-y-5">
          <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border border-indigo-500/30 shadow-xl shadow-indigo-950/60">
            <img
              src={LegalImages.emptyState}
              alt="Empty Vault"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">No Documents Yet</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Your private Legal Vault is ready. Upload an agreement to generate instant X-Rays, clause maps, and consultation briefs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onUploadClick}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition cursor-pointer"
            >
              Upload Your First Document
            </button>
            <button
              onClick={onLoadDemo}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
            >
              ⚡ Load Fictional Demo Agreement
            </button>
          </div>
        </div>
      ) : (
        /* Documents Table / Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-4 transition-all shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                    {doc.documentType}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Analyzed</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {doc.title} {doc.isDemo && <span className="text-xs text-indigo-400 font-normal">(Demo)</span>}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                  <div>Pages: <strong className="text-slate-200">{doc.pageCount}</strong></div>
                  <div>Clauses: <strong className="text-slate-200">{doc.clausesCount}</strong></div>
                  <div>Uploaded: <strong className="text-slate-200">{doc.uploadedAt}</strong></div>
                  <div>Size: <strong className="text-slate-200">{doc.fileSize}</strong></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onAnalyzeDoc(doc)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>X-Ray</span>
                  </button>

                  <button
                    onClick={() => onOpenDoc(doc)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Read</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => onCompareDoc(doc)}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <GitCompare className="w-3 h-3" />
                    <span>Compare Version</span>
                  </button>

                  <button
                    onClick={() => setDocToDelete(doc)}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                    title="Delete document and associated chunks"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {docToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Delete Document & Analysis?</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete <strong>{docToDelete.title}</strong>? All extracted clauses, questions, timeline events, and embeddings will be immediately purged from your session storage.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDocToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
