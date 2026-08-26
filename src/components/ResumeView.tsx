import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Download, ExternalLink } from 'lucide-react';

interface ResumeViewProps {
  onBack: () => void;
  onOpenCommandPalette?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: (e?: React.MouseEvent) => void;
  sessionStartTime?: number;
}

export const ResumeView: React.FC<ResumeViewProps> = ({
  onBack,
}) => {
  const [isLoadingPdf, setIsLoadingPdf] = useState(true);
  const [pdfRenderFailed, setPdfRenderFailed] = useState(false);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = '/resume.pdf';
    a.download = 'Deepesh_Reddy_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenExternal = () => {
    window.open('/resume.pdf', '_blank');
  };

  // Render PDF using PDF.js onto Canvas for 100% clean PDF view (No Browser Toolbars)
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

        const loadingTask = pdfjsLib.getDocument('/resume.pdf');
        const pdf = await loadingTask.promise;

        if (!isMounted) return;

        const container = document.getElementById('pdf-canvas-container');
        if (container) {
          container.innerHTML = '';

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2.0 }); // High DPI Retina rendering

            const canvas = document.createElement('canvas');
            canvas.className = 'w-full h-auto rounded-xl shadow-2xl bg-white mb-6 border border-neutral-200 block';
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
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={onBack}
          className="p-2 rounded-md theme-subtle transition-all flex items-center gap-2 text-xs font-medium cursor-pointer shadow-sm"
          title="Back to Portfolio"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Header Title Section */}
      <div className="flex items-start justify-between gap-4 pt-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight theme-text-title">
            Resume
          </h1>
          <p className="text-xs theme-text-faint font-mono mt-1 font-medium">
            Deepesh Reddy • Software Engineer
          </p>
        </div>
      </div>

      {/* Resume File Info & Download Action Bar */}
      <div className="rounded-lg theme-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-md theme-subtle">
            <FileText className="w-5 h-5 theme-text-title" />
          </div>
          <div>
            <h3 className="text-base font-bold theme-text-title tracking-tight">
              Deepesh Reddy Resume
            </h3>
            <p className="text-xs theme-text-faint font-mono">
              PDF document
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleOpenExternal}
            className="p-2 rounded-md theme-subtle transition-all shadow-sm cursor-pointer"
            title="Open PDF in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-md theme-btn-primary font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Pure PDF Canvas Render Box — ZERO Browser Toolbars */}
      <div className="w-full max-w-3xl mx-auto space-y-4">
        {isLoadingPdf && (
          <div className="w-full h-96 rounded-lg theme-card flex flex-col items-center justify-center space-y-3 theme-text-muted">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            <p className="text-xs font-mono">Loading PDF document...</p>
          </div>
        )}

        {pdfRenderFailed ? (
          <div className="w-full p-8 rounded-lg theme-card text-center space-y-4">
            <p className="text-sm theme-text-muted">Could not render PDF inline.</p>
            <button
              onClick={handleOpenExternal}
              className="px-4 py-2 theme-btn-primary rounded-md text-xs font-medium shadow-sm cursor-pointer"
            >
              Open PDF in New Tab
            </button>
          </div>
        ) : (
          <div id="pdf-canvas-container" className="w-full flex flex-col items-center" />
        )}
      </div>

    </div>
  );
};
