/**
 * excelUtils.ts – utilidades para leer Excel y formatear valores
 * NO contiene JSX.
 */

import * as XLSX from "xlsx";

/* ──────────────────── CONVERSIÓN DE COLUMNAS ──────────────────── */

// "A" → 0, "Z" → 25, "AA" → 26…
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

/* ─────────────── TABLA DE FORMATOS (decimales + unidad) ─────────────── */

const FORMAT_RULES: Record<string, { dec: number; unit: string }> = {
  "Potencia frigorífica": { dec: 1, unit: "kW" },
  "Potencia absorbida": { dec: 1, unit: "W" },
  "Potencia absorbida máxima": { dec: 1, unit: "W" },
  COP: { dec: 2, unit: "" },
  "Caudal Másico": { dec: 1, unit: "kg/h" },
  "Desplazamiento Volumétrico": { dec: 1, unit: "m³/h" },
  "Intensidad a régimen": { dec: 0, unit: "A" },
  "Intensidad máxima": { dec: 0, unit: "A" },
  "Temp. Presión absoluta Evaporación": { dec: 1, unit: "°C" },
  "Temp. / Presión absoluta Descarga": { dec: 1, unit: "°C" },
  "Temperatura Salida Gas Cooler": { dec: 1, unit: "°C" },
  // añade más si las necesitas
};

/* ───────────── LIMPIEZA / FORMATEO SEGÚN LA REGLA ───────────── */

const clean = (raw: any, caracteristica: string) => {
  if (raw === "/" || raw === "-") return "";
  const rule = FORMAT_RULES[caracteristica] || { dec: 1, unit: "" };
  const num = parseFloat(String(raw).replace(",", "."));
  if (!Number.isFinite(num)) return raw; // deja texto si no es número
  const val = num.toFixed(rule.dec);
  return rule.unit ? `${val} ${rule.unit}` : val;
};

/* ───────────── EXTRAER FILAS DE UN RANGO ───────────── */

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
    // ¿hay al menos un valor?
    const hasData = Object.values(mapping).some((col) => {
      const c = sheet[`${col.toUpperCase()}${r}`];
      return c && c.v !== undefined && c.v !== "";
    });
    if (!hasData) continue;

    const row: Record<string, any> = {};

    // primero leemos la característica para poder formatear el resto
    const charCell = sheet[`${mapping.caracteristica.toUpperCase()}${r}`];
    row.caracteristica = charCell?.v ?? "";

    for (const [key, col] of Object.entries(mapping)) {
      if (key === "caracteristica") continue;
      const cell = sheet[`${col.toUpperCase()}${r}`];
      row[key] = clean(cell?.v, row.caracteristica);
    }

    // descartar filas-cabecera
    const first = String(row.caracteristica).toUpperCase();
    const CABECERAS = [
      "DENOMINACIÓN",
      "CENTRAL FRIGORÍFICA",
      "CARACTERÍSTICA",
      "MAQUINARIA INSTALADA",
      "ELEMENTO",
      "CENTRAL POSITIVA",
      "CENTRAL INTERMEDIA",
      "CENTRAL NEGATIVA",
      "COMPRESORES PARALELOS",
    ];
    if (CABECERAS.includes(first)) continue;

    out.push(row);
  }

  return out;
};

/* ───────────── API PRINCIPAL ───────────── */

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

/* ───────────── Suma opcional ───────────── */

export const calculateSum = (rows: any[], field = "cargaT") =>
  rows.reduce((s, r) => {
    const v =
      typeof r[field] === "number" ? r[field] : parseFloat(r[field] ?? "");
    return s + (Number.isFinite(v) ? v : 0);
  }, 0);
