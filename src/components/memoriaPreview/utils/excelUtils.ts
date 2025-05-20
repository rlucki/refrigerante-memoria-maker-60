/**
 * excelUtils.ts – SOLO utilidades TypeScript, sin JSX
 */

import * as XLSX from "xlsx";

/* ───────────── Conversión de letras de columna ───────────── */

// "A" → 0, "AA" → 26 …
export const columnLetterToIndex = (label: string): number => {
  let idx = 0;
  for (let i = 0; i < label.length; i++) {
    idx = idx * 26 + label.toUpperCase().charCodeAt(i) - 64;
  }
  return idx - 1;          // 0-based
};

export const indexToColumnLetter = (n: number): string => {
  let s = "";
  n++;
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
};

/* ───────────── Limpieza / formateo de valores ───────────── */

const clean = (v: any) => {
  if (v === "/" || v === "-") return "";
  const num = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(num) ? num.toFixed(1) : v; // 1 decimal
};

/* ───────────── Extrae filas de un rango ───────────── */

export const extractDataFromRange = (
  sheet: XLSX.WorkSheet,
  startCol: string,
  endCol: string,
  startRow: number,
  endRow: number,
  mapping: Record<string, string>
) => {
  if (!sheet) return [];

  const out: any[] = [];

  for (let r = startRow; r <= endRow; r++) {
    // ¿hay algo en la fila?
    const has = Object.values(mapping).some((col) => {
      const c = sheet[`${col.toUpperCase()}${r}`];
      return c && c.v !== undefined && c.v !== "";
    });
    if (!has) continue;

    const row: Record<string, any> = {};
    for (const [key, col] of Object.entries(mapping)) {
      const cell = sheet[`${col.toUpperCase()}${r}`];
      row[key] = clean(cell?.v);
    }

    // descartar cabeceras que no queremos
    const first = String(row[Object.keys(row)[0]]).toUpperCase();
    if (
      [
        "DENOMINACIÓN",
        "CENTRAL FRIGORÍFICA",
        "CARACTERÍSTICA",
        "MAQUINARIA INSTALADA",
        "ELEMENTO",
        "CENTRAL POSITIVA",
        "CENTRAL INTERMEDIA", // ← título que aparece en tu Excel
        "CENTRAL NEGATIVA",
        "COMPRESORES PARALELOS",
      ].includes(first)
    )
      continue;

    out.push(row);
  }

  return out;
};

/* ───────────── API principal que usa la utilidad ───────────── */

export const extractTableData = (
  wb: any,
  o: {
    sheet: string;
    startCol: string;
    endCol: string;
    startRow: number;
    endRow: number;
    mappings: Record<string, string>;
  }
) => {
  if (!wb) return [];

  const sheet = wb.Sheets ? wb.Sheets[o.sheet] : wb[o.sheet];
  if (!sheet) {
    console.warn(`No se encontró la hoja "${o.sheet}"`);
    return [];
  }

  return extractDataFromRange(
    sheet,
    o.startCol,
    o.endCol,
    o.startRow,
    o.endRow,
    o.mappings
  );
};

/* ───────────── Suma rápida (opcional) ───────────── */

export const calculateSum = (rows: any[], field = "cargaT") =>
  rows.reduce((s, r) => {
    const v =
      typeof r[field] === "number" ? r[field] : parseFloat(r[field] ?? "");
    return s + (Number.isFinite(v) ? v : 0);
  }, 0);
