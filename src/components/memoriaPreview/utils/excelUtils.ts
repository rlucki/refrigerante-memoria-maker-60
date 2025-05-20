
/**
 * Utility functions for Excel data processing
 */

// Function to convert column letter to index number
export const columnLetterToIndex = (columnLetter: string): number => {
  let result = 0;
  for (let i = 0; i < columnLetter.length; i++) {
    result = result * 26 + columnLetter.charCodeAt(i) - 64;
  }
  return result;
};

// Function to convert index number to column letter
export const indexToColumnLetter = (index: number): string => {
  let columnLetter = '';
  while (index > 0) {
    const remainder = (index - 1) % 26;
    columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
    index = Math.floor((index - 1) / 26);
  }
  return columnLetter || 'A';
};

// Extract data from a specific range of cells
export const extractDataFromRange = (
  sheet: any, 
  startCol: string, 
  endCol: string, 
  startRow: number, 
  endRow: number,
  columnMapping: { [key: string]: string }
): any[] => {
  if (!sheet) return [];
  
  const result = [];
  const startColIndex = columnLetterToIndex(startCol);
  const endColIndex = columnLetterToIndex(endCol);
  
  console.log(`Extrayendo datos del rango ${startCol}${startRow}-${endCol}${endRow}`);
  
  for (let row = startRow; row <= endRow; row++) {
    // Determine if the row contains valid data
    const hasValidData = Object.keys(columnMapping).some(key => {
      const colLetter = columnMapping[key];
      const cellKey = `${colLetter}${row}`;
      return sheet[cellKey] && sheet[cellKey].v !== undefined;
    });
    
    // Only process rows with at least one data point
    if (hasValidData) {
      const rowData: any = {};
      
      // Extract data according to column mapping
      Object.keys(columnMapping).forEach(key => {
        const colLetter = columnMapping[key];
        const cellKey = `${colLetter}${row}`;
        rowData[key] = sheet[cellKey]?.v;
      });
      
      // Filter rows with specific headers
      const firstColumnValue = rowData[Object.keys(rowData)[0]];
      if (firstColumnValue && 
          !["DENOMINACIÓN", "CENTRAL FRIGORÍFICA", "CARACTERÍSTICA", 
            "MAQUINARIA INSTALADA", "ELEMENTO", "CENTRAL POSITIVA", 
            "CENTRAL INTERMEDIA", "CENTRAL NEGATIVA", 
            "COMPRESORES PARALELOS"].includes(firstColumnValue)) {
        result.push(rowData);
      }
    }
  }
  
  return result;
};

// Extract table data from a specified range with column mappings
export const extractTableData = (data: any, options: {
  sheet: string,
  startCol: string,
  endCol: string,
  startRow: number,
  endRow: number,
  mappings: { [key: string]: string }
}): any[] => {
  if (!data) return [];
  
  console.log(`Procesando datos Excel para rango ${options.startCol}-${options.endCol}:`, data);
  
  // For data in spreadsheet format
  if (data && data[options.sheet]) {
    const sheet = data[options.sheet];
    return extractDataFromRange(sheet, options.startCol, options.endCol, options.startRow, options.endRow, options.mappings);
  }
  
  console.log(`No se encontró la hoja ${options.sheet} en los datos Excel`);
  return [];
};

// Calculate sum of values in a specified field
export const calculateSum = (data: any[], field: string = "cargaT"): number => {
  return data.reduce((sum, row) => {
    const value = typeof row[field] === 'number' ? row[field] : 
                 (typeof row[field] === 'string' && !isNaN(parseFloat(row[field]))) ? 
                 parseFloat(row[field]) : 0;
    return sum + value;
  }, 0);
};
