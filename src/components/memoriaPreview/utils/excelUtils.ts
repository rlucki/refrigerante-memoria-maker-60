/**
 * excelUtils.ts
 * Utilidades para leer y procesar datos de Excel (SheetJS u objeto plano)
 */

import * as XLSX from "xlsx";

/* ──────────────────────  CONVERSIÓN DE COLUMNAS  ────────────────────── */

// "A" → 0, "Z" → 25, "AA" → 26, …
export const columnLetterToIndex = (label: string): number => {
  let idx = 0;
  for (let i = 0; i < label.length; i++) {
    idx = idx * 26 + label.toUpperCase().charCodeAt(i) - 64;
  }
  return idx - 1; // 0-based
};

// 0 → "A", 27 → "AB"
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

/* ───────────────────  LIMPIEZA Y FORMATEO DE VALORES  ────────────────── */

const clean = (v: any) => {
  if (v === "/" || v === "-") return "";
  const num = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(num) ? num.toFixed(1) : v; // 1 decimal
};

/* ─────────────────────  EXTRACCIÓN DE RANGOS  ───────────────────────── */

export const extractDataFromRange = (
  sheet: XLSX.WorkSheet,
  startCol: string,
  endCol: string,
  startRow: number,
  endRow: number,
  columnMapping: Record<string, string>
) => {
  if (!sheet) return [];

  const result: any[] = [];
  console.log(
    `Extrayendo datos del rango ${startCol}${startRow}-${endCol}${endRow}`
  );

  for (let r = startRow; r <= endRow; r++) {
    // ¿la fila contiene algo?
    const hasData = Object.values(columnMapping).some((col) => {
      const cell = sheet[`${col.toUpperCase()}${r}`];
      return cell && cell.v !== undefined && cell.v !== "";
    });
    if (!hasData) continue;

    const row: Record<string, any> = {};
    for (const [key, col] of Object.entries(columnMapping)) {
      const cell = sheet[`${col.toUpperCase()}${r}`];
      row[key] = clean(cell?.v);
    }

    // descartar cabeceras
    const first = String(row[Object.keys(row)[0]]).toUpperCase();
    const CABECERAS = [
      "DENOMINACIÓN",
      "CENTRAL FRIGORÍFICA",
      "CARACTERÍSTICA",
      "MAQUINARIA INSTALADA",
      "ELEMENTO",
      "CENTRAL POSITIVA",
      "CENTRAL INTERMEDIA", //  ← rótulo de la positiva en Excel
      "CENTRAL NEGATIVA",
      "COMPRESORES PARALELOS",
    ];
    if (CABECERAS.includes(first)) continue;

    result.push(row);
  }

  return result;
};

/* ─────────────────────  API PRINCIPAL  ──────────────────────────────── */

export const extractTableData = (
  workbook: any,
  opts: {
    sheet: string;
    startCol: string;
    endCol: string;
    startRow: number;
    endRow: number;
    mappings: Record<string, string>;
  }
) => {
  if (!workbook) return [];

  const sheet = workbook.Sheets
    ? workbook.Sheets[opts.sheet] // workbook completo
    : workbook[opts.sheet]; // objeto plano

  if (!sheet) {
    console.warn(`No se encontró la hoja "${opts.sheet}"`);
    return [];
  }

  return extractDataFromRange(
    sheet,
    opts.startCol,
    opts.endCol,
    opts.startRow,
    opts.endRow,
    opts.mappings
  );
};

/* ─────────────────────  UTILIDAD DE SUMA  ───────────────────────────── */

export const calculateSum = (rows: any[], field = "cargaT") =>
  rows.reduce((sum, r) => {
    const v =
      typeof r[field] === "number" ? r[field] : parseFloat(r[field] ?? "");
    return sum + (Number.isFinite(v) ? v : 0);
  }, 0);
