
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

// Función para extraer texto plano del HTML
function extractTextFromHTML(html: string): string {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}

// Función para procesar títulos con formato especial
function processHeadings(html: string): Array<{ level: number; text: string; content: string }> {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  
  const sections: Array<{ level: number; text: string; content: string }> = [];
  const headings = temp.querySelectorAll('h1, h2, h3, h4, h5, h6, [data-heading]');
  
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1)) || 1;
    const text = heading.textContent || "";
    
    // Buscar el contenido que sigue a este título
    let content = "";
    let nextElement = heading.nextElementSibling;
    
    while (nextElement && !nextElement.matches('h1, h2, h3, h4, h5, h6, [data-heading]')) {
      content += nextElement.textContent || "";
      nextElement = nextElement.nextElementSibling;
    }
    
    sections.push({ level, text, content });
  });
  
  return sections;
}

/* ───── API principal ───── */
export async function buildWord(opts: {
  templateArrayBuffer: ArrayBuffer;
  htmlPreview: string;
  logoUrl?: string;
}) {
  const { templateArrayBuffer, htmlPreview, logoUrl } = opts;

  try {
    // Extraer secciones del HTML
    const sections = processHeadings(htmlPreview);
    
    // Crear documento Word con docx
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Título principal
          new Paragraph({
            children: [
              new TextRun({
                text: "MEMORIA TÉCNICA DESCRIPTIVA",
                bold: true,
                size: 32,
              }),
            ],
            heading: HeadingLevel.TITLE,
          }),
          
          // Agregar todas las secciones
          ...sections.flatMap(section => [
            new Paragraph({
              children: [
                new TextRun({
                  text: section.text,
                  bold: true,
                  size: 24,
                }),
              ],
              heading: section.level === 1 ? HeadingLevel.HEADING_1 : 
                      section.level === 2 ? HeadingLevel.HEADING_2 : 
                      HeadingLevel.HEADING_3,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: section.content,
                  size: 22,
                }),
              ],
            }),
            new Paragraph({ children: [] }), // Espacio entre secciones
          ]),
        ],
      }],
    });

    // Generar el documento
    const buffer = await Packer.toBuffer(doc);
    
    // Crear blob y descargar
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    
    saveAs(blob, "MemoriaTecnica.docx");
    
  } catch (error) {
    console.error("Error generating Word document:", error);
    throw error;
  }
}
