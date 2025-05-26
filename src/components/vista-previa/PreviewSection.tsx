import React from "react";
import MemoriaPreview from "@/components/memoriaPreview/MemoriaPreview";

interface PreviewSectionProps {
  memoriaData: any;
  calculationsData: any;
  excelData: any;
  previewRef: React.RefObject<HTMLDivElement>;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  memoriaData,
  calculationsData,
  excelData,
  previewRef,
}) => {
  // ► Con este log sabrás qué valor de gasFluorado llega a la vista previa
  console.log("▶ gasFluorado que envío a la vista previa:", memoriaData.gasFluorado);

  return (
    <div ref={previewRef} className="pdf-preview-container">
      <style>
        {`
          .memoria-preview-container.continuous-flow > div {
            min-height: auto;
            max-height: none;
            height: auto;
            page-break-after: auto;
          }
          
          .memoria-preview-container {
            padding-bottom: 40px;
          }
          
          .memory-preview-page {
            margin-bottom: 20px;
          }
          
          /* Ensure content is always visible */
          .mb-8 {
            margin-bottom: 2rem !important;
          }
          
          /* Better spacing between sections */
          h3, h4 {
            margin-top: 1.5rem !important;
          }
          
          /* Make sure math formulas are properly displayed */
          .katex-display {
            overflow-x: auto;
            overflow-y: hidden;
            padding: 0.5rem 0;
          }
          
          /* Additional katex styling */
          .katex {
            font-size: 1.1em;
            line-height: 1.2;
          }
          
          /* Ensure katex doesn't overflow on mobile */
          @media (max-width: 768px) {
            .katex-display > .katex {
              max-width: 100%;
            }
          }
        `}
      </style>

      {/* Pasa TODO el objeto memoriaData sin filtrar */}
      <MemoriaPreview
        data={memoriaData}
        calculationsData={calculationsData}
        excelData={excelData}
      />
    </div>
  );
};

export default PreviewSection;
