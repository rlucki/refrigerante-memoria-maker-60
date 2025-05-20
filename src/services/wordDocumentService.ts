
/*  src/services/wordDocumentService.ts
    Genera un DOCX desde el navegador (sin instalar paquetes con npm).
    – Usa módulos ES servidos por CDN (https://esm.sh)
    – Inserta: contenido HTML de la vista previa, títulos data-heading (TOC),
      pie con logo y numeración de página.
*/

// Declare module interfaces to handle imported modules
declare module 'https://esm.sh/pizzip@3.2.5/dist/pizzip.esm.js' {
  export default class PizZip {
    constructor(data?: ArrayBuffer);
    file(path: string, data: any): void;
    generate(options: { type: string }): ArrayBuffer;
    load(data: ArrayBuffer): PizZip;
  }
}

declare module 'https://esm.sh/docxtemplater@3.39.1/build/docxtemplater.esm.js' {
  export default class Docxtemplater {
    constructor(zip: any, options?: any);
    setData(data: any): void;
    render(): void;
    getZip(): any;
  }
}

declare module 'https://esm.sh/html-to-docx@2.4.0' {
  export default function htmlToDocx(html: string, options?: any): Promise<any>;
}

declare module 'https://esm.sh/file-saver@2.0.5' {
  export function saveAs(data: Blob, filename: string): void;
}

declare module 'https://esm.sh/docx@8.1.2' {
  export class Document {
    constructor(options: any);
  }
  
  export class Packer {
    static toString(doc: Document): Promise<string>;
    static toBuffer(doc: Document): Promise<ArrayBuffer>;
  }
  
  export class Paragraph {
    constructor(options: any);
  }
  
  export enum HeadingLevel {
    HEADING_1 = 'Heading1',
    HEADING_2 = 'Heading2',
  }
  
  export class TableOfContents {
    constructor(title: string, options: any);
  }
  
  export class Footer {
    constructor(options: any);
  }
  
  export class ImageRun {
    constructor(options: any);
  }
  
  export class TextRun {
    constructor(text: string);
  }
  
  export class PageNumber {
    static get CURRENT(): any;
    static get TOTAL_PAGES(): any;
  }
}

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
  const runs: any[] = [];
  if (logoUrl) {
    try {
      const buf = await (await fetch(logoUrl)).arrayBuffer();
      runs.push(
        new ImageRun({ data: buf, transformation: { width: 80, height: 40 } }),
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
  const finalZip = PizZip.load(renderedBuf);
  const finalDoc = new Document(doc);
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
