/**
 * excelUtils.ts – SOLO utilidades para leer Excel (sin JSX)
 */

import * as XLSX from "xlsx";

/* ── Conversión de letras de columna ── */

export const columnLetterToIndex = (label: string): number => {
  let idx = 0;
  for (let i = 0; i < label.length; i++) {
    idx = idx * 26 + label.toUpperCase().charCodeAt(i) - 64;
  }
  return idx - 1;                 // 0-based
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

/* ── Limpieza y formateo ── */

const clean = (v: any) => {
  if (v === "/" || v === "-") return "";
  const num = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(num) ? num.toFixed(1) : v;   // 1 decimal
};

/* ── Extraer filas de un rango ── */

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
    const has = Object.values(mapping).some((col) => {
      const c = sheet[`${col.toUpperCase()}${r}`];
      return c && c.v !== undefined && c.v !== "";
    });
    if (!has) continue;

    const row: Record<string, any> = {};
    for (const [k, col] of Object.entries(mapping)) {
      const cell = sheet[`${col.toUpperCase()}${r}`];
      row[k] = clean(cell?.v);
    }

    const first = String(row[Object.keys(row)[0]]).toUpperCase();
    const CABECERAS = [
      "DENOMINACIÓN",
      "CENTRAL FRIGORÍFICA",
      "CARACTERÍSTICA",
      "MAQUINARIA INSTALADA",
      "ELEMENTO",
      "CENTRAL POSITIVA",
      "CENTRAL INTERMEDIA", // título en tu Excel
      "CENTRAL NEGATIVA",
      "COMPRESORES PARALELOS",
    ];
    if (CABECERAS.includes(first)) continue;

    out.push(row);
  }

  return out;
};

/* ── API principal ── */

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

/* ── Suma opcional ── */

export const calculateSum = (rows: any[], field = "cargaT") =>
  rows.reduce((s, r) => {
    const v =
      typeof r[field] === "number" ? r[field] : parseFloat(r[field] ?? "");
    return s + (Number.isFinite(v) ? v : 0);
  }, 0);
