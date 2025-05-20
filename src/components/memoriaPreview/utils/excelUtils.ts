/**
 * excelUtils.ts – utilidades Excel (versión robusta)
 */

import * as XLSX from "xlsx";

/* ───── Conversión de columnas ───── */

export const columnLetterToIndex = (label: string) => {
  let idx = 0;
  for (let i = 0; i < label.length; i++) {
    idx = idx * 26 + label.toUpperCase().charCodeAt(i) - 64;
  }
  return idx - 1;
};
export const indexToColumnLetter = (n: number) => {
  let s = "";
  n++;
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
};

/* ───── Reglas de formato (decimales + unidad) ───── */

const FORMAT_RULES: Record<string, { dec: number; unit: string }> = {
  "POTENCIA FRIGORÍFICA": { dec: 1, unit: "kW" },
  "POTENCIA ABSORBIDA": { dec: 1, unit: "W" },
  "POTENCIA ABSORBIDA MÁXIMA": { dec: 1, unit: "W" },
  COP: { dec: 2, unit: "" },
  "CAUDAL MÁSICO": { dec: 1, unit: "kg/h" },
  "DESPLAZAMIENTO VOLUMÉTRICO": { dec: 1, unit: "m³/h" },
  "INTENSIDAD A RÉGIMEN": { dec: 0, unit: "A" },
  "INTENSIDAD MÁXIMA": { dec: 0, unit: "A" },
  "TEMP. PRESIÓN ABSOLUTA EVAPORACIÓN": { dec: 1, unit: "°C" },
  "TEMP. / PRESIÓN ABSOLUTA DESCARGA": { dec: 1, unit: "°C" },
  "TEMPERATURA SALIDA GAS COOLER": { dec: 1, unit: "°C" },
};

/* ───── Limpieza / formateo ───── */

const clean = (raw: any, label: string) => {
  if (raw === "/" || raw === "-") return "";
  const rule = FORMAT_RULES[label.toUpperCase()] || { dec: 1, unit: "" };
  const num = parseFloat(String(raw).replace(",", "."));
  if (!Number.isFinite(num)) return raw;
  const v = num.toFixed(rule.dec);
  return rule.unit ? `${v} ${rule.unit}` : v;
};

/* ───── Extraer rango ───── */

export const extractDataFromRange = (
  sheet: XLSX.WorkSheet,
  startCol: string,
  endCol: string,
  startRow: number,
  endRow: number,
  mapping: Record<string, string>,
) => {
  if (!sheet) return [];

  const out: any[] = [];

  // cuál es la primera clave (la columna “texto”)
  const charKey = Object.keys(mapping)[0];

  for (let r = startRow; r <= endRow; r++) {
    // ¿la fila tiene algún dato?
    const hasData = Object.values(mapping).some((col) => {
      const cell = sheet[`${col.toUpperCase()}${r}`];
      return cell && cell.v !== undefined && cell.v !== "";
    });
    if (!hasData) continue;

    const row: Record<string, any> = {};

    /* — lee la celda de texto primero — */
    const labelCell = sheet[`${mapping[charKey].toUpperCase()}${r}`];
    row[charKey] = labelCell?.v ?? "";

    /* — resto de celdas — */
    for (const [key, col] of Object.entries(mapping)) {
      if (key === charKey) continue;
      const cell = sheet[`${col.toUpperCase()}${r}`];
      row[key] = clean(cell?.v, row[charKey]);
    }

    /* — descartar cabeceras — */
    const labelU = String(row[charKey]).toUpperCase();
    if (
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
      ].includes(labelU)
    )
      continue;

    out.push(row);
  }

  return out;
};

/* ───── API principal ───── */

export const extractTableData = (
  wb: any,
  o: {
    sheet: string;
    startCol: string;
    endCol: string;
    startRow: number;
    endRow: number;
    mappings: Record<string, string>;
  },
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
    o.mappings,
  );
};

/* ───── Suma opcional ───── */

export const calculateSum = (rows: any[], field = "cargaT") =>
  rows.reduce((s, r) => {
    const v =
      typeof r[field] === "number" ? r[field] : parseFloat(r[field] ?? "");
    return s + (Number.isFinite(v) ? v : 0);
  }, 0);
