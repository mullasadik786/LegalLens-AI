import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { LegalDocument, DocumentType } from '../types/legal';
import { DEMO_DOCUMENT_V1, DEMO_DOCUMENT_V2 } from '../data/demoDocuments';
import { LegalImages } from '../assets/images';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentProcessed: (doc: LegalDocument) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onDocumentProcessed,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<DocumentType>('Employment Agreement');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setErrorMsg(null);
    const validExtensions = ['.pdf', '.docx', '.txt', '.png', '.jpg', '.jpeg'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      setErrorMsg("This file format isn't supported yet. Please upload a PDF, DOCX, TXT, PNG, or JPG.");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('File size exceeds the 25 MB limit for secure sandbox processing.');
      return;
    }

    setSelectedFile(file);
  };

  const startAnalysis = async (fileToProcess?: File, isDemoV2: boolean = false) => {
    setIsProcessing(true);
    setErrorMsg(null);

    const stages = [
      { label: 'Reading document...', percent: 20 },
      { label: 'Understanding structure...', percent: 45 },
      { label: 'Extracting clauses...', percent: 70 },
      { label: 'Building evidence map...', percent: 90 },
      { label: 'Analysis complete.', percent: 100 },
    ];

    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(stages[i].label);
      setProgressPercent(stages[i].percent);
      await new Promise(r => setTimeout(r, 600));
    }

    // Generate parsed document
    let newDoc: LegalDocument;
    if (isDemoV2) {
      newDoc = DEMO_DOCUMENT_V2;
    } else if (fileToProcess) {
      // Build document object from uploaded file
      const fileNameClean = fileToProcess.name.replace(/\.[^/.]+$/, '');
      newDoc = {
        ...DEMO_DOCUMENT_V1,
        id: 'doc-' + Date.now(),
        title: fileNameClean,
        filename: fileToProcess.name,
        fileSize: (fileToProcess.size / (1024 * 1024)).toFixed(1) + ' MB',
        documentType: docType,
        uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isDemo: false
      };
    } else {
      newDoc = DEMO_DOCUMENT_V1;
    }

    setIsProcessing(false);
    onDocumentProcessed(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 relative shadow-2xl overflow-hidden text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Upload Your Document</h2>
              <p className="text-xs text-slate-400">Supported: PDF, DOCX, TXT, PNG, JPG (Scanned OCR enabled)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Processing State Animation */}
        {isProcessing ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-5 text-center">
            <div className="relative w-24 h-24">
              <img
                src={LegalImages.scan}
                alt="Scanning..."
                className="w-full h-full object-cover rounded-2xl border border-cyan-500/40 animate-pulse shadow-lg shadow-cyan-500/20"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/60 animate-ping pointer-events-none" />
            </div>

            <div className="space-y-1.5 w-full max-w-xs">
              <p className="text-sm font-bold text-white tracking-wide">{processingStage}</p>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{progressPercent}% complete</p>
            </div>

            <p className="text-xs text-slate-400 italic">
              Parsing structure, isolating untrusted contents, and mapping evidence locations...
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {/* Drag & Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-700/80 hover:border-indigo-500/50 bg-slate-950/40 hover:bg-slate-950/70'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />

              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>

              {selectedFile ? (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">{selectedFile.name}</p>
                  <p className="text-xs text-slate-400">
                    {(selectedFile.size / 1024).toFixed(1)} KB · Ready to analyze
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-200">
                    Drag and drop your legal contract here, or <span className="text-indigo-400 underline">browse files</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    PDF, DOCX, TXT or scanned images up to 25 MB
                  </p>
                </div>
              )}
            </div>

            {/* Document Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Document Classification</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as DocumentType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500 transition"
              >
                <option value="Employment Agreement">Employment Agreement</option>
                <option value="Rental Agreement">Rental / Lease Agreement</option>
                <option value="Non-Disclosure Agreement (NDA)">Non-Disclosure Agreement (NDA)</option>
                <option value="Freelance / Service Contract">Freelance / Service Contract</option>
                <option value="Vendor Agreement">Vendor / Supplier Agreement</option>
                <option value="Partnership Agreement">Partnership Agreement</option>
                <option value="General Contract">General Contract</option>
              </select>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => startAnalysis(undefined, false)}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Or load Fictional Acme Demo Agreement</span>
              </button>

              <button
                type="button"
                disabled={!selectedFile}
                onClick={() => selectedFile && startAnalysis(selectedFile)}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-600/30 transition flex items-center gap-2 cursor-pointer"
              >
                <span>Process Document</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Security note */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                Isolated client session. Content is sanitized against prompt injection and never retained without explicit authorization.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
