/*  src/services/wordDocumentService.ts
    Genera un DOCX a partir de la plantilla subida, inyecta:
    – contenido HTML de la vista previa (tablas incluidas)
    – títulos marcados con data-heading (para índice)
    – pie de página con logo + nº de página
*/

import PizZip from "pizzip/browser";
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
  PageNumber,
  TextRun,
} from "docx";

/* ───────────────────────── helper: pie de página ───────────────────── */
async function buildFooter(logoUrl?: string) {
  const children = [];

  if (logoUrl) {
    const res = await fetch(logoUrl);
    const buffer = await res.arrayBuffer();
    children.push(
      new ImageRun({ data: buffer, transformation: { width: 80, height: 40 } })
    );
  }

  children.push(
    new TextRun("   Página "),
    PageNumber.CURRENT,
    new TextRun(" de "),
    PageNumber.TOTAL_PAGES
  );

  return new Footer({
    children: [new Paragraph({ children })],
  });
}

/* ───────────────────────── API principal ───────────────────────────── */
export async function buildWord({
  templateArrayBuffer,
  htmlPreview,
  logoUrl,
}: {
  templateArrayBuffer: ArrayBuffer;
  htmlPreview: string;
  logoUrl?: string;
}) {
  /* 1️⃣  extrae títulos (data-heading) de la vista previa */
  const temp = document.createElement("div");
  temp.innerHTML = htmlPreview;

  const headings = Array.from(
    temp.querySelectorAll("[data-heading]")
  ) as HTMLElement[];

  const headingParas: Paragraph[] = headings.map((el) => {
    const clean = el.dataset.heading!.replace(/&&/g, "");
    return new Paragraph({ text: clean, heading: HeadingLevel.HEADING_2 });
  });

  /* 2️⃣  convierte TODO el HTML (con las tablas) a fragmento DOCX */
  const bodyBuffer = await htmlToDocx(temp.innerHTML, {
    table: { row: { cantSplit: true } },
  });

  const bodyAttach = {
    _type: "doc_attach",
    data: bodyBuffer.toString("base64"),
  };

  /* 3️⃣  carga plantilla y rellena placeholder {{memoriaCompleta}} */
  const zip = new PizZip(templateArrayBuffer);
  const docTpl = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  docTpl.setData({ memoriaCompleta: bodyAttach });
  docTpl.render();
  const rendered = docTpl.getZip().generate({ type: "nodebuffer" });

  /* 4️⃣  inserta TOC + headings en una nueva sección */
  const footer = await buildFooter(logoUrl);

  const finalDoc = new Document({
    sections: [
      /* sección 0: contenido renderizado de la plantilla */
      {
        properties: {},
        headers: {},
        footers: footer ? { default: footer } : {},
        children: [
          /* el attachment sustituye al placeholder en la plantilla */
        ],
      },
      /* sección 1: índice */
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

  /* 5️⃣  descarga */
  const blob = new Blob([await Packer.toBuffer(finalDoc)], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  saveAs(blob, "MemoriaTecnica.docx");
}
