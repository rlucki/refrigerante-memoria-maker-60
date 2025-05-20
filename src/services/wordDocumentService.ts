
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TableOfContents,
  Footer,
  ImageRun,
  TextRun,
  PageNumber,
} from "docx";

/* ───── helper: pie con logo + nº página ───── */
async function buildFooter(logoUrl?: string) {
  const runs: any[] = [];
  if (logoUrl) {
    try {
      const buf = await (await fetch(logoUrl)).arrayBuffer();
      runs.push(
        new ImageRun({
          data: buf,
          transformation: { width: 80, height: 40 },
          type: "png", // Add required type property
        }),
        new TextRun("   ")
      );
    } catch (error) {
      console.error("Error loading logo for footer:", error);
    }
  }
  runs.push(
    new TextRun("Página "),
    PageNumber.CURRENT,
    new TextRun(" de "),
    PageNumber.TOTAL_PAGES
  );

  return new Footer({
    children: [new Paragraph({ children: runs })],
  });
}

// Simple HTML to DOCX conversion function
async function simpleHtmlToDocx(html: string) {
  // Create a temporary element to parse the HTML
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  
  // Basic conversion of HTML elements to DOCX paragraphs
  const paragraphs: Paragraph[] = [];
  
  // Process text nodes and basic formatting
  Array.from(tmp.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      paragraphs.push(new Paragraph({ text: node.textContent.trim() }));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      
      // Handle headings
      if (element.tagName.match(/^H[1-6]$/)) {
        const level = parseInt(element.tagName[1]);
        paragraphs.push(new Paragraph({ 
          text: element.textContent || "",
          heading: level <= 2 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2
        }));
      } 
      // Handle paragraphs
      else if (element.tagName === 'P' || element.tagName === 'DIV') {
        paragraphs.push(new Paragraph({ text: element.textContent || "" }));
      }
      // Handle lists (simplified)
      else if (element.tagName === 'UL' || element.tagName === 'OL') {
        Array.from(element.children).forEach((li) => {
          paragraphs.push(new Paragraph({ text: `• ${li.textContent || ""}` }));
        });
      }
    }
  });
  
  // Create a basic document with these paragraphs
  const doc = new Document({
    sections: [{
      properties: {},
      children: paragraphs
    }]
  });
  
  // Convert to ArrayBuffer
  return await Packer.toBuffer(doc);
}

/* ───── API principal ───── */
export async function buildWord(opts: {
  templateArrayBuffer: ArrayBuffer; // plantilla .docx en ArrayBuffer
  htmlPreview: string;             // innerHTML del div #preview
  logoUrl?: string;                // URL/logo opcional
}) {
  const { templateArrayBuffer, htmlPreview, logoUrl } = opts;

  /* 1️⃣  extraer títulos marcados */
  const tmp = document.createElement("div");
  tmp.innerHTML = htmlPreview;
  const headingEls = Array.from(
    tmp.querySelectorAll<HTMLElement>("[data-heading]")
  );

  const headingParas = headingEls.map(
    (el) =>
      new Paragraph({
        text: el.dataset.heading!.replace(/&&/g, ""),
        heading: HeadingLevel.HEADING_2,
      })
  );

  try {
    /* 2️⃣  convertir todo el HTML a fragmento DOCX usando nuestra implementación simple */
    const bodyBuf = await simpleHtmlToDocx(tmp.innerHTML);
    
    // Convert the ArrayBuffer to base64 string for browser environment
    let base64String = btoa(
      new Uint8Array(bodyBuf)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    const bodyAttach = {
      _type: "doc_attach",
      data: base64String,
    };

    /* 3️⃣  renderizar plantilla con Docxtemplater */
    const zip = new PizZip(templateArrayBuffer);
    const docTpl = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    docTpl.setData({ memoriaCompleta: bodyAttach });
    docTpl.render(); // sustituye {{memoriaCompleta}}

    const renderedBuf = docTpl.getZip().generate({ type: "arraybuffer" });

    /* 4️⃣  construir documento final con TOC y pie */
    const footer = await buildFooter(logoUrl);

    // Save the sections configuration separately to avoid type issues
    const docSections = [
      {
        properties: {},
        footers: footer ? { default: footer } : undefined,
        children: [], // el contenido viene de la plantilla renderizada
      },
      {
        properties: {},
        children: [
          new Paragraph({
            text: "ÍNDICE",
            heading: HeadingLevel.HEADING_1,
            alignment: "center",
          }),
          new TableOfContents("Índice", {
            hyperlink: true,
            headingStyleRange: "1-9",
          }),
          ...headingParas,
        ],
      },
    ];

    // Create the document with the sections
    const doc = new Document({
      sections: docSections,
    });

    /* 5️⃣  fusionar la parte renderizada y la nueva sección */
    const finalZip = PizZip(renderedBuf);
    
    // Create a document with the same sections configuration
    const finalDoc = new Document({
      sections: docSections,
    });
    
    // Convert the document to a string and use it to replace the content in the ZIP
    const finalDocXml = await Packer.toString(finalDoc);
    
    finalZip.file(
      "word/document.xml",
      finalDocXml
    );

    /* 6️⃣  descargar */
    const blob = new Blob([finalZip.generate({ type: "arraybuffer" })], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(blob, "MemoriaTecnica.docx");
    
  } catch (error) {
    console.error("Error generating Word document:", error);
    throw error;
  }
}
