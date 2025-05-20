/*  src/services/wordDocumentService.ts
    - Genera DOCX con TOC, pie de página, y convierte la vista previa HTML.
*/

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import htmlToDocx from "html-to-docx";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  TableOfContents,
  Footer,
  ImageRun,
  PageNumber,
} from "docx";

/* ---------------- Helper: logo en el pie ------------------ */
async function buildFooter(logoUrl: string) {
  const res = await fetch(logoUrl);
  const buf = await res.arrayBuffer();
  return new Footer({
    children: [
      new Paragraph({
        children: [
          new ImageRun({ data: buf, transformation: { width: 80, height: 40 } }),
          new TextRun("   Página "),
          PageNumber.CURRENT,
          new TextRun(" de "),
          PageNumber.TOTAL_PAGES,
        ],
      }),
    ],
  });
}

/* ---------------- Helper: convierte el HTML preview -------- */
async function htmlPreviewToDocx(html: string) {
  const buffer = await htmlToDocx(html, {
    table: { row: { cantSplit: true } },
  });
  return new Paragraph({}); // placeholder (attach later via docxtemplater)
}

/* ---------------- API principal --------------------------- */
export async function buildWord({
  templateArrayBuffer,   // ArrayBuffer de plantilla.docx
  htmlPreview,           // innerHTML de #preview
  logoUrl,               // src del logo corporativo
}: {
  templateArrayBuffer: ArrayBuffer;
  htmlPreview: string;
  logoUrl?: string;
}) {
  /* 1) extrae headings marcados en la vista previa */
  const temp = document.createElement("div");
  temp.innerHTML = htmlPreview;
  const headingEls = temp.querySelectorAll("[data-heading]");
  const headingParas: Paragraph[] = [];

  headingEls.forEach((el) => {
    const raw = (el as HTMLElement).dataset.heading!;
    const clean = raw.replace(/&&/g, "");
    headingParas.push(
      new Paragraph({ text: clean, heading: HeadingLevel.HEADING_2 })
    );
  });

  /* 2) convierte el resto del HTML a docx fragmento */
  const bodyBuffer = await htmlToDocx(temp.innerHTML);

  /* 3) carga plantilla y rellena */
  const zip = new PizZip(templateArrayBuffer);
  const docx = new Docxtemplater(zip,
