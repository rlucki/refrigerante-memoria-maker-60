/**
 * excelUtils.ts
 * Utilidades para leer y procesar datos de Excel (SheetJS / objeto plano)
 */

import * as XLSX from "xlsx";

/* ══════════════════════════  CONVERSIÓN DE COLUMNAS  ═════════════════════════ */

// "A" → 0, "Z" → 25, "AA" → 26, "AB" → 27…
export const columnLetterToIndex = (label: string): number => {
  let idx = 0;
  for (let i = 0; i < label.length; i++) {
    idx = idx * 26 + label.toUpperCase().charCodeAt(i) - 64;
  }
  return idx - 1; // 0-based
};

// 0 → "A", 27 → "AB"
export const indexToColumnLetter = (index: number): string => {
  let s = "";
  index++; // a 1-based
  while (index > 0) {
    const r = (index - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    index = Math.floor((index - 1) / 26);
  }
  return s;
};

/* ═════════════════════════════  RANGO → ARRAY OBJ  ═══════════════════════════ */

/**
 * Devuelve un array de objetos de acuerdo con el mapeo columna-campo.
 */
export const extractDataFromRange = (
  sheet: XLSX.WorkSheet,
  startCol: string,
  endCol: string,
  startRow: number,
  endRow: number,
  columnMapping: Record<string, string>
): any[] => {
  if (!sheet) return [];

  const out: any[] = [];
  console.log(
    `Extrayendo datos ${startCol}${startRow}:${endCol}${endRow}`
  );

  for (let row = startRow; row <= endRow; row++) {
    const hasData = Object.values(columnMapping).some((col) => {
      const cell = sheet[`${col.toUpperCase()}${row}`];
      return cell && cell.v !== undefined && cell.v !== "";
    });
    if (!hasData) continue;

    const record: Record<string, any> = {};
    for (const [key, col] of Object.entries(columnMapping)) {
      record[key] = sheet[`${col.toUpperCase()}${row}`]?.v ?? "";
    }

    // Excluir cabeceras
    const first = record[Object.keys(record)[0]];
    if (
      first &&
      [
        "DENOMINACIÓN",
        "CENTRAL FRIGORÍFICA",
        "CARACTERÍSTICA",
        "MAQUINARIA INSTALADA",
        "ELEMENTO",
        "CENTRAL POSITIVA",
        "CENTRAL INTERMEDIA",
        "CENTRAL NEGATIVA",
        "COMPRESORES PARALELOS",
      ].includes(String(first).toUpperCase())
    )
      continue;

    out.push(record);
  }

  return out;
};

/* ═════════════════════════════  RANGO → MATRIZ  ═════════════════════════════ */

/**
 * Devuelve TODAS las celdas de un rectángulo como matriz bidimensional.
 * Útil si el nº de columnas varía (p.ej. compresores 1…N).
 */
export const extractMatrix = (
  sheet: XLSX.WorkSheet,
  startCol: string,
  endCol: string,
  startRow: number,
  endRow: number
): any[][] => {
  if (!sheet) return [];

  const matrix: any[][] = [];
  const cStart = columnLetterToIndex(startCol);
  const cEnd = columnLetterToIndex(endCol);

  for (let r = startRow; r <= endRow; r++) {
    const row: any[] = [];
    for (let c = cStart; c <= cEnd; c++) {
      const colL = indexToColumnLetter(c);
      const cell = sheet[`${colL}${r}`];
      row.push(cell ? cell.v : "");
    }
    if (row.some((v) => v !== "")) matrix.push(row);
  }
  return matrix;
};

/* ═══════════════════════  ENVOLTORIO PRINCIPAL  ═════════════════════════════ */

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

  // Soporta workbook (SheetJS) o “objeto plano” con hojas
  const sheet = workbook.Sheets
    ? workbook.Sheets[opts.sheet]
    : workbook[opts.sheet];

  if (!sheet) {
    console.warn(`Hoja "${opts.sheet}" no encontrada`);
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

/* ════════════════════════════════  UTIL EXTRA  ══════════════════════════════ */

export const calculateSum = (data: any[], field = "cargaT"): number =>
  data.reduce((sum, row) => {
    const v =
      typeof row[field] === "number"
        ? row[field]
        : parseFloat(row[field] ?? "");
    return sum + (Number.isFinite(v) ? v : 0);
  }, 0);
