
import PizZip from "pizzip";
import { saveAs } from "file-saver";

// Dynamic import for html-to-docx to handle potential compatibility issues
let htmlToDocx: any;

async function loadHtmlToDocx() {
  if (!htmlToDocx) {
    try {
      const module = await import("html-to-docx");
      htmlToDocx = module.default || module;
    } catch (error) {
      console.error("Failed to load html-to-docx:", error);
      throw new Error("html-to-docx package is not available");
    }
  }
  return htmlToDocx;
}

// The footer (logo and page numbers) should be defined in the Word template
// uploaded by the user, so we no longer construct it programmatically here.

/* ───── API principal ───── */
export async function buildWord(opts: {
  templateArrayBuffer: ArrayBuffer; // plantilla .docx en ArrayBuffer
  htmlPreview: string;             // innerHTML del div #preview
  logoUrl?: string;                // URL/logo opcional
}) {
  const { templateArrayBuffer, htmlPreview, logoUrl } = opts;

  // Load html-to-docx dynamically
  const htmlToDocxConverter = await loadHtmlToDocx();

  // 1️⃣ Convert the preview HTML to a DOCX fragment
  const tmp = document.createElement("div");
  tmp.innerHTML = htmlPreview;

  try {
    // 2️⃣ Convert HTML to a DOCX file using html-to-docx
    const bodyBuf = await htmlToDocxConverter(tmp.innerHTML, {
      table: { row: { cantSplit: true } },
    });

    // Open the generated docx and extract its XML and media
    const bodyZip = new PizZip(bodyBuf);
    const bodyXml = bodyZip.file("word/document.xml")?.asText() || "";

    // Create zip from the uploaded template
    const templateZip = new PizZip(templateArrayBuffer);

    // Replace placeholder with the generated XML
    const placeholder = "{{memoriaCompleta}}";
    const docXml = templateZip.file("word/document.xml")?.asText() || "";
    const newDocXml = docXml.replace(placeholder, bodyXml);
    templateZip.file("word/document.xml", newDocXml);

    // Copy media files from generated docx into template
    Object.keys(bodyZip.files)
      .filter((name) => name.startsWith("word/media"))
      .forEach((name) => {
        const content = bodyZip.file(name)?.asArrayBuffer();
        if (content) templateZip.file(name, content);
      });

    // Generate final document
    const renderedBuf = templateZip.generate({ type: "arraybuffer" });

    const blob = new Blob([renderedBuf], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(blob, "MemoriaTecnica.docx");
    
  } catch (error) {
    console.error("Error generating Word document:", error);
    throw error;
  }
}
