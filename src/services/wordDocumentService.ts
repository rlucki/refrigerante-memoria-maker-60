
/*  src/services/wordDocumentService.ts
    Genera un DOCX desde el navegador.
    – Inserta: contenido HTML de la vista previa, títulos data-heading (TOC),
      pie con logo y numeración de página.
*/

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import htmlToDocx from "html-to-docx";
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
  IImageOptions,
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

  /* 2️⃣  convertir todo el HTML a fragmento DOCX */
  const bodyBuf = await htmlToDocx(tmp.innerHTML, {
    table: { row: { cantSplit: true } },
  });
  const bodyAttach = {
    _type: "doc_attach",
    data: bodyBuf.toString("base64"),
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

  const doc = new Document({
    sections: [
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
    ],
  });

  /* 5️⃣  fusionar la parte renderizada y la nueva sección */
  const finalZip = PizZip(renderedBuf); // Fixed: Removed .load() as it's not needed when passing arraybuffer directly
  
  // Fixed Document constructor to properly create a new document with sections
  const finalDoc = new Document({
    sections: doc.sections,
  });
  
  finalZip.file(
    "word/document.xml",
    await Packer.toString(finalDoc) // reemplaza contenido
  );

  /* 6️⃣  descargar */
  const blob = new Blob([finalZip.generate({ type: "arraybuffer" })], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  saveAs(blob, "MemoriaTecnica.docx");
}
