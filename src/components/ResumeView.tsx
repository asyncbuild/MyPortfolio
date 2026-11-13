import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeViewProps {
  onBack: () => void;
  onOpenCommandPalette?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: (e?: React.MouseEvent) => void;
  sessionStartTime?: number;
}

interface ResumeMeta {
  fileId: string;
  fileName: string;
  folderUrl: string;
  viewUrl: string;
  downloadUrl: string;
  previewUrl: string;
  pdfProxyUrl: string;
}

const DEFAULT_META: ResumeMeta = {
  fileId: PERSONAL_INFO.resumeDriveFileId || '1LALaVnCWuSCh8NChgQX1JeaCCi-9P1QV',
  fileName: 'DeepeshReddy.pdf',
  folderUrl: PERSONAL_INFO.resumeDriveFolderUrl || 'https://drive.google.com/drive/folders/1UX5SMG8lc-FwWiNs6VbJmwe7xvk3-c2r',
  viewUrl: PERSONAL_INFO.resumeDriveViewUrl || 'https://drive.google.com/file/d/1LALaVnCWuSCh8NChgQX1JeaCCi-9P1QV/view',
  downloadUrl: PERSONAL_INFO.resumeDriveDownloadUrl || 'https://drive.google.com/uc?export=download&id=1LALaVnCWuSCh8NChgQX1JeaCCi-9P1QV',
  previewUrl: PERSONAL_INFO.resumeDrivePreviewUrl || 'https://drive.google.com/file/d/1LALaVnCWuSCh8NChgQX1JeaCCi-9P1QV/preview',
  pdfProxyUrl: '/api/resume?action=pdf&id=1LALaVnCWuSCh8NChgQX1JeaCCi-9P1QV',
};

export const ResumeView: React.FC<ResumeViewProps> = ({ onBack }) => {
  const [meta, setMeta] = useState<ResumeMeta>(DEFAULT_META);
  const [isLoadingPdf, setIsLoadingPdf] = useState(true);
  const [pdfRenderFailed, setPdfRenderFailed] = useState(false);

  // Sync latest resume metadata from Google Drive API endpoint in background
  useEffect(() => {
    let isMounted = true;
    const syncResumeMeta = async () => {
      try {
        const res = await fetch(`/api/resume?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.fileId && isMounted) {
            setMeta({
              fileId: data.fileId,
              fileName: data.fileName || DEFAULT_META.fileName,
              folderUrl: data.folderUrl || DEFAULT_META.folderUrl,
              viewUrl: data.viewUrl || `https://drive.google.com/file/d/${data.fileId}/view`,
              downloadUrl: data.downloadUrl || `https://drive.google.com/uc?export=download&id=${data.fileId}`,
              previewUrl: data.previewUrl || `https://drive.google.com/file/d/${data.fileId}/preview`,
              pdfProxyUrl: `/api/resume?action=pdf&id=${data.fileId}&t=${Date.now()}`,
            });
          }
        }
      } catch (err) {
        console.warn('Using default resume metadata fallback:', err);
      }
    };

    syncResumeMeta();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = meta.downloadUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.download = meta.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenExternal = () => {
    window.open(meta.viewUrl, '_blank', 'noopener,noreferrer');
  };

  // Render PDF using PDF.js onto Canvas for 100% clean PDF view
  useEffect(() => {
    let isMounted = true;

    const renderPdfCanvas = async () => {
      try {
        setIsLoadingPdf(true);
        setPdfRenderFailed(false);

        // Load PDF.js dynamically if not present
        if (!(window as any).pdfjsLib) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        // Try proxy endpoint first to get latest Drive file, fallback to static /resume.pdf
        let pdf;
        try {
          const proxyUrl = `/api/resume?action=pdf&id=${meta.fileId}&t=${Date.now()}`;
          const loadingTask = pdfjsLib.getDocument(proxyUrl);
          pdf = await loadingTask.promise;
        } catch {
          const fallbackTask = pdfjsLib.getDocument(`/resume.pdf?t=${Date.now()}`);
          pdf = await fallbackTask.promise;
        }

        if (!isMounted) return;

        const container = document.getElementById('pdf-canvas-container');
        if (container) {
          container.innerHTML = '';

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2.0 }); // High DPI Retina rendering

            const canvas = document.createElement('canvas');
            canvas.className = 'w-full max-w-full h-auto rounded-lg sm:rounded-xl shadow-xl bg-white mb-6 border border-neutral-200 dark:border-neutral-800 block';
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            await page.render(renderContext).promise;

            if (container && isMounted) {
              container.appendChild(canvas);
            }
          }
          setIsLoadingPdf(false);
        }
      } catch (err) {
        console.error('PDF.js render error:', err);
        if (isMounted) {
          setIsLoadingPdf(false);
          setPdfRenderFailed(true);
        }
      }
    };

    renderPdfCanvas();

    return () => {
      isMounted = false;
    };
  }, [meta.fileId]);

  return (
    <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-6 max-w-3xl mx-auto space-y-5 animate-in fade-in duration-200">
      
      {/* Unified Compact Navigation & Action Header */}
      <div className="flex items-center justify-between gap-3 pb-1">
        
        {/* Left: Back button + Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onBack}
            className="p-2 sm:px-2.5 sm:py-2 rounded-md theme-subtle transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer shadow-xs active:scale-[0.98] shrink-0"
            title="Back to Portfolio"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight theme-text-title">
            Resume
          </h1>
        </div>

        {/* Right: Clean, Responsive Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleOpenExternal}
            className="px-2.5 sm:px-3 py-2 rounded-md theme-subtle transition-all shadow-xs flex items-center gap-1.5 text-xs font-medium cursor-pointer hover:theme-text-title active:scale-[0.98]"
            title="Open in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Open in tab</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3 sm:px-4 py-2 rounded-md theme-btn-primary font-semibold text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 shadow-xs active:scale-[0.98] cursor-pointer"
            title="Download resume"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Pure PDF Canvas Render Box — Exact matching width */}
      <div className="w-full space-y-4">
        {isLoadingPdf && (
          <div className="w-full h-96 rounded-xl theme-card flex flex-col items-center justify-center space-y-3 theme-text-muted">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            <p className="text-xs font-mono">Loading PDF document...</p>
          </div>
        )}

        {pdfRenderFailed ? (
          <div className="w-full p-8 rounded-xl theme-card text-center space-y-4 border theme-border">
            <p className="text-sm theme-text-muted">Could not render PDF inline.</p>
            <button
              onClick={handleOpenExternal}
              className="px-4 py-2 theme-btn-primary rounded-md text-xs font-medium shadow-sm cursor-pointer"
            >
              Open PDF in New Tab
            </button>
          </div>
        ) : (
          <div id="pdf-canvas-container" className="w-full flex flex-col items-center max-w-full" />
        )}
      </div>

    </div>
  );
};
