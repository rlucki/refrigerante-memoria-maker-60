// src/components/memoriaPreview/utils/excelUtils.ts

/**
 * Utility functions for Excel data processing
 */

// Convertir letra de columna a índice (A→1, B→2, …, Z→26, AA→27…)
export const columnLetterToIndex = (columnLetter: string): number => {
  let result = 0;
  for (let i = 0; i < columnLetter.length; i++) {
    result = result * 26 + columnLetter.charCodeAt(i) - 64;
  }
  return result;
};

// Convertir índice a letra de columna
export const indexToColumnLetter = (index: number): string => {
  let columnLetter = '';
  while (index > 0) {
    const remainder = (index - 1) % 26;
    columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
    index = Math.floor((index - 1) / 26);
  }
  return columnLetter || 'A';
};

// Extraer datos de un rango definido, usando cell.w (formateado) o cell.v (valor)
export const extractDataFromRange = (
  sheet: any,
  startCol: string,
  endCol: string,
  startRow: number,
  endRow: number,
  columnMapping: { [key: string]: string }
): any[] => {
  if (!sheet) return [];

  const result: any[] = [];
  const startColIndex = columnLetterToIndex(startCol);
  const endColIndex   = columnLetterToIndex(endCol);

  for (let row = startRow; row <= endRow; row++) {
    // ¿Esta fila tiene al menos un dato útil?
    const hasValidData = Object.values(columnMapping).some(colLetter => {
      const cellKey = `${colLetter}${row}`;
      const cell = sheet[cellKey];
      return cell && (cell.w !== undefined || cell.v !== undefined);
    });

    if (!hasValidData) continue;

    const rowData: any = {};

    // Para cada campo usamos la celda formateada (w) si existe, o v si no
    for (const [field, colLetter] of Object.entries(columnMapping)) {
      const cellKey = `${colLetter}${row}`;
      const cell = sheet[cellKey];
      if (cell) {
        // .w = “formatted text” (lo que ves en Excel), .v = valor bruto
        rowData[field] = cell.w !== undefined ? cell.w : cell.v;
      } else {
        rowData[field] = '';
      }
    }

    // Filtrar encabezados (títulos de sección) para no incluirlos
    const firstValue = rowData[Object.keys(rowData)[0]];
    if (firstValue && ![
      "DENOMINACIÓN", "CENTRAL FRIGORÍFICA", "CARACTERÍSTICA",
      "MAQUINARIA INSTALADA", "ELEMENTO", "CENTRAL POSITIVA",
      "CENTRAL INTERMEDIA", "CENTRAL NEGATIVA", "COMPRESORES PARALELOS"
    ].includes(firstValue.toString().toUpperCase())) {
      result.push(rowData);
    }
  }

  return result;
};

// extractTableData llama a extractDataFromRange para una hoja concreta
export const extractTableData = (data: any, options: {
  sheet: string;
  startCol: string;
  endCol: string;
  startRow: number;
  endRow: number;
  mappings: { [key: string]: string };
}): any[] => {
  if (!data) return [];

  const sheet = data[options.sheet];
  if (!sheet) {
    console.warn(`Hoja "${options.sheet}" no encontrada en el Excel.`);
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

// Suma valores numéricos de un campo concreto (no afecta aquí)
export const calculateSum = (data: any[], field: string = "cargaT"): number => {
  return data.reduce((sum, row) => {
    const v = row[field];
    const num = typeof v === 'number'
      ? v
      : typeof v === 'string' && !isNaN(parseFloat(v))
        ? parseFloat(v)
        : 0;
    return sum + num;
  }, 0);
};
