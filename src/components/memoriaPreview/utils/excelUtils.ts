
import * as XLSX from "xlsx";

/* ────────────────────────────── */
/* 1. Conversión de columnas      */
/* ────────────────────────────── */

// "A" → 0, "Z" → 25, "AA" → 26, "AB" → 27…
export const columnLetterToIndex = (col: string): number => {
  let n = 0;
  for (let i = 0; i < col.length; i++) {
    n = n * 26 + col.toUpperCase().charCodeAt(i) - 64;
  }
  return n - 1; // 0-based
};

// 0 → "A", 27 → "AB"  (por si necesitas lo contrario)
export const indexToColumnLetter = (idx: number): string => {
  let s = "";
  idx++; // 1-based temporal
  while (idx > 0) {
    const r = (idx - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    idx = Math.floor((idx - 1) / 26);
  }
  return s;
};

/* ────────────────────────────── */
/* 2. Lectura de un rango         */
/* ────────────────────────────── */

export const extractDataFromRange = (
  sheet: XLSX.WorkSheet,
  startCol: string,
  endCol: string,
  startRow: number,
  endRow: number,
  columnMapping: Record<string, string>
): any[] => {
  if (!sheet) return [];

  const result: any[] = [];
  console.log(
    `Extrayendo datos ${startCol}${startRow}-${endCol}${endRow}…`
  );

  for (let row = startRow; row <= endRow; row++) {
    // ¿existe algún dato en esta fila?
    const hasData = Object.values(columnMapping).some((col) => {
      const c = `${col.toUpperCase()}${row}`;
      return sheet[c] && sheet[c].v !== undefined;
    });
    if (!hasData) continue;

    const rowObj: Record<string, any> = {};

    for (const [field, col] of Object.entries(columnMapping)) {
      const key = `${col.toUpperCase()}${row}`;
      rowObj[field] = sheet[key]?.v;
    }

    // Filtra cabeceras
    const first = rowObj[Object.keys(rowObj)[0]];
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

    result.push(rowObj);
  }

  return result;
};

/* ────────────────────────────── */
/* 3. Wrapper alto nivel          */
/* ────────────────────────────── */

export const extractTableData = (
  workbook: any, // puede ser Workbook o objeto plano
  options: {
    sheet: string;
    startCol: string;
    endCol: string;
    startRow: number;
    endRow: number;
    mappings: Record<string, string>;
  }
): any[] => {
  if (!workbook) return [];

  // Compatibilidad doble: workbook.Sheets o plain object
  const sheet =
    workbook.Sheets
      ? workbook.Sheets[options.sheet]
      : workbook[options.sheet];

  if (!sheet) {
    console.warn(`Hoja "${options.sheet}" no encontrada`);
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

/* ────────────────────────────── */
/* 4. Suma rápida (opcional)      */
/* ────────────────────────────── */

export const calculateSum = (rows: any[], field = "cargaT"): number =>
  rows.reduce((sum, r) => {
    const v =
      typeof r[field] === "number" ? r[field] : parseFloat(r[field] ?? "");
    return sum + (Number.isFinite(v) ? v : 0);
  }, 0);