export const columnLetterToIndex = (columnLetter: string): number => {
  let result = 0;
  for (let i = 0; i < columnLetter.length; i++) {
    result = result * 26 + columnLetter.charCodeAt(i) - 64;
  }
  return result;
};

export const indexToColumnLetter = (index: number): string => {
  let columnLetter = '';
  while (index > 0) {
    const remainder = (index - 1) % 26;
    columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
    index = Math.floor((index - 1) / 26);
  }
  return columnLetter || 'A';
};

export const extractColumnAndRow = (
  cellId: string
): { column: string; row: number } | null => {
  const match = cellId.match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;
  return {
    column: match[1],
    row: parseInt(match[2], 10),
  };
};

export const compareColumns = (a: string, b: string): number => {
  if (a.length !== b.length) {
    return a.length - b.length;
  }
  return a.localeCompare(b);
};
