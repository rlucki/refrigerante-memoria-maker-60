
import { Document, Packer, Paragraph, TextRun, HeadingLevel, TableOfContents } from "docx";

interface MemoriaData {
  [key: string]: any;
}

// Function to generate document from template
export async function generateWordDocument(templateFile: File, memoriaData: MemoriaData) {
  try {
    // We'll create a new document rather than modifying an existing one
    // since directly modifying an existing DOCX is challenging in the browser
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Add title page
            new Paragraph({
              text: memoriaData.titulo || "MEMORIA TÉCNICA DESCRIPTIVA",
              heading: HeadingLevel.TITLE,
              alignment: "center"
            }),
            
            // Add table of contents
            new Paragraph({
              text: "ÍNDICE",
              heading: HeadingLevel.HEADING_1,
              alignment: "center"
            }),
            new TableOfContents("Índice", {
              hyperlink: true,
              headingStyleRange: "1-9",
            }),
            
            // Section 1: Datos del titular
            createHeadingWithText("1. DATOS DEL TITULAR", 
              `${memoriaData.titular || ''}\n` +
              `NIF/CIF: ${memoriaData.nif || ''}\n` +
              `Dirección: ${memoriaData.direccion || ''}\n` +
              `Población: ${memoriaData.poblacion || ''}, ${memoriaData.provincia || ''}\n` +
              `C.P.: ${memoriaData.cp || ''}\n` +
              `Teléfono: ${memoriaData.telefono || ''}\n` +
              `Email: ${memoriaData.email || ''}`
            ),
            
            // Section 12: Descripción de la instalación
            createHeadingWithText("12. DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA", 
              memoriaData.descripcionInstalacion || ''
            ),
            
            // Add more sections...
            // We would add all sections here based on memoriaData structure
          ],
        },
      ],
    });

    // Generate the document
    const buffer = await Packer.toBuffer(doc);
    
    // Create a blob from the buffer
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    
    // Return the blob for download
    return blob;
  } catch (error) {
    console.error("Error generating Word document:", error);
    throw new Error("No se pudo generar el documento Word");
  }
}

// Helper function to create a heading with text content
function createHeadingWithText(title: string, content: string) {
  return [
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: content,
        }),
      ],
    }),
  ];
}

// Function to check for index markers and process them
export function processIndexMarkers(text: string): { text: string, indexEntries: string[] } {
  const indexEntries: string[] = [];
  const processedText = text.replace(/&&(.*?)&&/g, (match, content) => {
    indexEntries.push(content);
    return content;
  });
  
  return { text: processedText, indexEntries };
}
