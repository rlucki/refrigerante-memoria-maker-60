
/**
 * Utility functions for Excel data processing
 */

import * as XLSX from "xlsx";

/* ──────────────────────────────────────────────────────────── */
/* Conversión de columnas                                       */
/* ──────────────────────────────────────────────────────────── */

// "A" → 0, "Z" → 25, "AA" → 26, "AB" → 27…
export const columnLetterToIndex = (columnLetter: string): number => {
  let result = 0;
  for (let i = 0; i < columnLetter.length; i++) {
    result = result * 26 + columnLetter.toUpperCase().charCodeAt(i) - 64;
  }
  return result - 1;                  //  👈  ¡0-based!
};

// 0 → "A", 27 → "AB"  (útil si lo necesitas para tests)
export const indexToColumnLetter = (index: number): string => {
  let columnLetter = "";
  index++;                            //  pasamos a 1-based temporalmente
  while (index > 0) {
    const remainder = (index - 1) % 26;
    columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
    index = Math.floor((index - 1) / 26);
  }
  return columnLetter;
};

/* ──────────────────────────────────────────────────────────── */
/* Lectura de rangos                                            */
/* ──────────────────────────────────────────────────────────── */

// Lee un bloque y devuelve un array de objetos según mappings
export const extractDataFromRange = (
  sheet: XLSX.WorkSheet,
  startCol: string,
  endCol: string,
  startRow: number,
  endRow: number,
  columnMapping: { [key: string]: string }
): any[] => {
  if (!sheet) return [];

  const result: any[] = [];
  console.log(
    `Extrayendo datos del rango ${startCol}${startRow}-${endCol}${endRow}`
  );

  for (let row = startRow; row <= endRow; row++) {
    // ¿Hay algún dato en esta fila?
    const hasValidData = Object.values(columnMapping).some((col) => {
      const cellKey = `${col.toUpperCase()}${row}`;
      return sheet[cellKey] && sheet[cellKey].v !== undefined;
    });

    if (!hasValidData) continue;

    const rowData: Record<string, any> = {};
    // Extraemos cada campo
    for (const [key, colLetter] of Object.entries(columnMapping)) {
      const cellKey = `${colLetter.toUpperCase()}${row}`;
      rowData[key] = sheet[cellKey]?.v;
    }

    // Filtramos cabeceras irrelevantes
    const first = rowData[Object.keys(rowData)[0]];
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
    ) {
      continue;
    }

    result.push(rowData);
  }

  return result;
};

/* ──────────────────────────────────────────────────────────── */
/* Wrapper de alto nivel                                        */
/* ──────────────────────────────────────────────────────────── */

export const extractTableData = (
  workbook: XLSX.WorkBook | undefined | null,
  options: {
    sheet: string;
    startCol: string;
    endCol: string;
    startRow: number;
    endRow: number;
    mappings: { [key: string]: string };
  }
): any[] => {
  // Check if workbook exists
  if (!workbook) {
    console.warn("No se proporcionó un archivo Excel válido");
    return [];
  }
  
  // Check if the requested sheet exists
  if (!workbook.Sheets || !workbook.SheetNames.includes(options.sheet)) {
    console.warn(`No se encontró la hoja "${options.sheet}" en el Excel cargado`);
    return [];
  }
  
  const sheet = workbook.Sheets[options.sheet];
  if (!sheet) {
    console.warn(`No se pudo acceder a la hoja "${options.sheet}"`);
    return [];
  }

  return extractDataFromRange(
    sheet,
    options.startCol,
    options.endCol,
    options.startRow,
    options.endRow,
    options.mappings
  );
};

/* ──────────────────────────────────────────────────────────── */
/* Sumas rápidas, por si las necesitas                           */
/* ──────────────────────────────────────────────────────────── */

export const calculateSum = (data: any[], field = "cargaT"): number =>
  data.reduce((sum, row) => {
    const v =
      typeof row[field] === "number"
        ? row[field]
        : parseFloat(row[field] ?? "");
    return sum + (Number.isFinite(v) ? v : 0);
  }, 0);
