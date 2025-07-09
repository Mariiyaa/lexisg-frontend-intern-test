import { useRef, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Setup PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export default function PdfModal({ isOpen, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const containerRef = useRef(null);
  const page2Ref = useRef(null); // Ref to Page 2

  useEffect(() => {
    if (isOpen && page2Ref.current) {
      setTimeout(() => {
        page2Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600); // Wait for rendering
    }
  }, [isOpen]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] h-[90%] rounded shadow-lg relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded z-10"
        >
          Close
        </button>

        {/* PDF Scroll Area */}
        <div
          ref={containerRef}
          className="overflow-y-scroll h-full px-4 py-6 bg-gray-100"
        >
          <Document
            file="/judgement.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(err) => console.error("PDF load error:", err)}
            className="space-y-0"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={`page_${index + 1}`}
                className="flex justify-center mb-[-20px]"
                ref={index + 1 === 2 ? page2Ref : null} // Auto-scroll to page 2
              >
                <Page
                  pageNumber={index + 1}
                  width={800}
                  renderTextLayer={true}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
