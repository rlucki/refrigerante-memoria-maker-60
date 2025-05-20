
/*  src/services/wordDocumentService.ts
    Genera un DOCX desde el navegador (sin instalar paquetes con npm).
    – Usa módulos ES servidos por CDN (https://esm.sh)
    – Inserta: contenido HTML de la vista previa, títulos data-heading (TOC),
      pie con logo y numeración de página.
*/

/* ────────  Imports ESM desde CDN  ──────── */
import PizZip from "https://esm.sh/pizzip@3.2.5/dist/pizzip.esm.js";
import Docxtemplater from "https://esm.sh/docxtemplater@3.39.1/build/docxtemplater.esm.js";
import htmlToDocx from "https://esm.sh/html-to-docx@2.4.0";
import { saveAs } from "https://esm.sh/file-saver@2.0.5";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TableOfContents,
  Footer,
  ImageRun,
  PageNumber,
  TextRun,
} from "https://esm.sh/docx@8.1.2";

/* ───── helper: pie con logo + nº página ───── */
async function buildFooter(logoUrl?: string) {
  const runs: (ImageRun | TextRun | PageNumber)[] = [];
  if (logoUrl) {
    const buf = await (await fetch(logoUrl)).arrayBuffer();
    runs.push(
      new ImageRun({ data: buf, transformation: { width: 80, height: 40 } }),
      new TextRun("   ")
    );
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
export async function generateWordDocument(wordTemplate: File, memoriaData: any): Promise<Blob> {
  // Convertir el archivo a ArrayBuffer
  const templateArrayBuffer = await wordTemplate.arrayBuffer();
  const htmlPreview = document.querySelector("#preview")?.innerHTML || "";
  
  return await buildWord({
    templateArrayBuffer,
    htmlPreview,
    logoUrl: undefined // Opcional: URL del logo para el pie de página
  });
}

export async function buildWord(opts: {
  templateArrayBuffer: ArrayBuffer; // plantilla .docx en ArrayBuffer
  htmlPreview: string;             // innerHTML del div #preview
  logoUrl?: string;                // URL/logo opcional
}): Promise<Blob> {
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
  const finalZip = PizZip.load(renderedBuf);
  const finalDoc = new Document(doc);
  finalZip.file(
    "word/document.xml",
    await Packer.toString(finalDoc) // reemplaza contenido
  );

  /* 6️⃣  crear blob para descargar */
  const blob = new Blob([finalZip.generate({ type: "arraybuffer" })], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  
  return blob;
}
