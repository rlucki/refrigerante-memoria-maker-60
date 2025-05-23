
// Define refrigerant data structure
export interface RefrigeranteData {
  nombre: string;
  composicion: string;
  inflamabilidad: string;
  toxicidad: string;
  grupoSeguridad: string;
  directivaEquipos: string;
  pca: string;
  agotamientoOzono: string;
  limitePractico: string;
  atelOdl: string;
  limiteInflamabilidad: string;
  temperaturaAutoignicion: string;
  gasFluorado: string;
}

// Define refrigerants database
export const refrigerantesData: Record<string, RefrigeranteData> = {
  "R-1234yf": {
    nombre: "R-1234yf",
    composicion: "2,3,3,3-Tetrafluorpropeno - CF3CF=CH2",
    inflamabilidad: "Grupo 2L",
    toxicidad: "Grupo A",
    grupoSeguridad: "A2L",
    directivaEquipos: "1",
    pca: "4",
    agotamientoOzono: "0",
    limitePractico: "0.058 kg/m3",
    atelOdl: "0.47 kg/m3",
    limiteInflamabilidad: "0.289 kg/m3",
    temperaturaAutoignicion: "405 ºC",
    gasFluorado: "NO"
  },
  "R-1234ze": {
    nombre: "R-1234ze",
    composicion: "Trans 1,3,3,3-Tetrafluorpropeno - CF3CH=CHF",
    inflamabilidad: "Grupo 2L",
    toxicidad: "Grupo A",
    grupoSeguridad: "A2L",
    directivaEquipos: "2",
    pca: "7",
    agotamientoOzono: "0",
    limitePractico: "0.061 kg/m3",
    atelOdl: "0.28 kg/m3",
    limiteInflamabilidad: "0.303 kg/m3",
    temperaturaAutoignicion: "368 ºC",
    gasFluorado: "NO"
  },
  "R-134a": {
    nombre: "R-134a",
    composicion: "1,1,1,2-Tetrafluoretano - CF3CH2F",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "1.430",
    agotamientoOzono: "0",
    limitePractico: "0.25 kg/m3",
    atelOdl: "0.21 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "743 ºC",
    gasFluorado: "SI"
  },
  "R-170": {
    nombre: "R-170",
    composicion: "Etano - C2H6",
    inflamabilidad: "Grupo 3",
    toxicidad: "Grupo A",
    grupoSeguridad: "A3",
    directivaEquipos: "1",
    pca: "6",
    agotamientoOzono: "0",
    limitePractico: "0.0086 kg/m3",
    atelOdl: "0.0086 kg/m3",
    limiteInflamabilidad: "0.038 kg/m3",
    temperaturaAutoignicion: "515 ºC",
    gasFluorado: "NO"
  },
  "R-22": {
    nombre: "R-22",
    composicion: "Clorodifluormetano - CHClF2",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "1.810",
    agotamientoOzono: "0.055",
    limitePractico: "0.3 kg/m3",
    atelOdl: "0.21 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "635 ºC",
    gasFluorado: "SI"
  },
  "R-290": {
    nombre: "R-290",
    composicion: "Propano - C3H8",
    inflamabilidad: "Grupo 3",
    toxicidad: "Grupo A",
    grupoSeguridad: "A3",
    directivaEquipos: "1",
    pca: "3",
    agotamientoOzono: "0",
    limitePractico: "0.008 kg/m3",
    atelOdl: "0.09 kg/m3",
    limiteInflamabilidad: "0.038 kg/m3",
    temperaturaAutoignicion: "470 ºC",
    gasFluorado: "NO"
  },
  "R-32": {
    nombre: "R-32",
    composicion: "Difluormetano - CH2F2",
    inflamabilidad: "Grupo 2L",
    toxicidad: "Grupo A",
    grupoSeguridad: "A2L",
    directivaEquipos: "1",
    pca: "675",
    agotamientoOzono: "0",
    limitePractico: "0.061 kg/m3",
    atelOdl: "0.3 kg/m3",
    limiteInflamabilidad: "0.307 kg/m3",
    temperaturaAutoignicion: "648 ºC",
    gasFluorado: "SI"
  },
  "R-404A": {
    nombre: "R-404A",
    composicion: "44% R-125 / 52% R-143a / 4% R-134a",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "3.922",
    agotamientoOzono: "0",
    limitePractico: "0.52 kg/m3",
    atelOdl: "0.52 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "728 ºC",
    gasFluorado: "SI"
  },
  "R-407F": {
    nombre: "R-407F",
    composicion: "30% R-32 / 30% R-125 / 40% R-134a",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "1.825",
    agotamientoOzono: "0",
    limitePractico: "0.32 kg/m3",
    atelOdl: "0.32 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-410A": {
    nombre: "R-410A",
    composicion: "50% R-32 / 50% R-125",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "2.088",
    agotamientoOzono: "0",
    limitePractico: "0.44 kg/m3",
    atelOdl: "0.42 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-424A": {
    nombre: "R-424A",
    composicion: "50,5% R-125 / 47% R-134a / 0,9% R-600a / 1% R-600 / 0,6% R-601a",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "2.440",
    agotamientoOzono: "0",
    limitePractico: "0.1 kg/m3",
    atelOdl: "0.1 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-427A": {
    nombre: "R-427A",
    composicion: "15% R-32 / 25% R-125 / 10% R-143a / 50% R-134a",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "2.138",
    agotamientoOzono: "0",
    limitePractico: "0.29 kg/m3",
    atelOdl: "0.29 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-434A": {
    nombre: "R-434A",
    composicion: "63,2% R-125 / 18% R-143a / 16% R-134a / 2,8% R-600a",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "3.245",
    agotamientoOzono: "0",
    limitePractico: "0.32 kg/m3",
    atelOdl: "0.32 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-442A": {
    nombre: "R-442A",
    composicion: "31% R-32 / 31% R-125 / 30% R-134a / 3% R-152a / 5% R-227ea",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "1.888",
    agotamientoOzono: "0",
    limitePractico: "0.33 kg/m3",
    atelOdl: "0.33 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-448A": {
    nombre: "R-448A",
    composicion: "26% R-32 / 26% R-125 / 20% R-1234yf / 21% R-134a / 7% R-1234ze",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "1.387",
    agotamientoOzono: "0",
    limitePractico: "0.388 kg/m3",
    atelOdl: "0.388 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-449A": {
    nombre: "R-449A",
    composicion: "24,3% R-32 / 24,7% R-125 / 25,3% R-1234yf / 25,7% R-134a",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "1.397",
    agotamientoOzono: "0",
    limitePractico: "0.357 kg/m3",
    atelOdl: "0.357 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-450A": {
    nombre: "R-450A",
    composicion: "42% R-134a / 58% R-1234ze",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "604.7",
    agotamientoOzono: "0",
    limitePractico: "0.319 kg/m3",
    atelOdl: "0.319 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-452A": {
    nombre: "R-452A",
    composicion: "11% R-32 / 59% R-125 / 30% R-1234yf",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "2.140",
    agotamientoOzono: "0",
    limitePractico: "0.423 kg/m3",
    atelOdl: "0.423 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-453A": {
    nombre: "R-453A",
    composicion: "20% R-32 / 20% R-125 / 53,8% R-134a / 5% R-227ea / 0,6% R-600 / 0,6% R-601",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "1.765.4",
    agotamientoOzono: "0",
    limitePractico: "0.14 kg/m3",
    atelOdl: "0.14 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-454C": {
    nombre: "R-454C",
    composicion: "21,5% R-32 / 78,5% R-1234yf",
    inflamabilidad: "Grupo 2L",
    toxicidad: "Grupo A",
    grupoSeguridad: "A2L",
    directivaEquipos: "1",
    pca: "148.27",
    agotamientoOzono: "0",
    limitePractico: "0.059 kg/m3",
    atelOdl: "0.44 kg/m3",
    limiteInflamabilidad: "0.291 kg/m3",
    temperaturaAutoignicion: "444 ºC",
    gasFluorado: "SI"
  },
  "R-455A": {
    nombre: "R-455A",
    composicion: "3% R-744 / 21,5% R-32 / 75,5% R-1234yf",
    inflamabilidad: "Grupo 2L",
    toxicidad: "Grupo A",
    grupoSeguridad: "A2L",
    directivaEquipos: "1",
    pca: "148.18",
    agotamientoOzono: "0",
    limitePractico: "0.105 kg/m3",
    atelOdl: "0.414 kg/m3",
    limiteInflamabilidad: "0.423 kg/m3",
    temperaturaAutoignicion: "473 ºC",
    gasFluorado: "SI"
  },
  "R-507A": {
    nombre: "R-507A",
    composicion: "50% R-125 / 50% R-143a",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "3.985",
    agotamientoOzono: "0",
    limitePractico: "0.53 kg/m3",
    atelOdl: "0.53 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-513A": {
    nombre: "R-513A",
    composicion: "44% R-134a / 56% R-1234yf",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "631.4",
    agotamientoOzono: "0",
    limitePractico: "0.319 kg/m3",
    atelOdl: "0.319 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI"
  },
  "R-600": {
    nombre: "R-600",
    composicion: "Butano - C4H10",
    inflamabilidad: "Grupo 3",
    toxicidad: "Grupo A",
    grupoSeguridad: "A3",
    directivaEquipos: "1",
    pca: "4",
    agotamientoOzono: "0",
    limitePractico: "0.0089 kg/m3",
    atelOdl: "0.0024 kg/m3",
    limiteInflamabilidad: "0.038 kg/m3",
    temperaturaAutoignicion: "365 ºC",
    gasFluorado: "NO"
  },
  "R-600a": {
    nombre: "R-600a",
    composicion: "Isobutano - CH(CH3)3",
    inflamabilidad: "Grupo 3",
    toxicidad: "Grupo A",
    grupoSeguridad: "A3",
    directivaEquipos: "1",
    pca: "3",
    agotamientoOzono: "0",
    limitePractico: "0.011 kg/m3",
    atelOdl: "0.059 kg/m3",
    limiteInflamabilidad: "0.043 kg/m3",
    temperaturaAutoignicion: "460 ºC",
    gasFluorado: "NO"
  },
  "R-717": {
    nombre: "R-717",
    composicion: "Amoniaco - NH3",
    inflamabilidad: "Grupo 2L",
    toxicidad: "Grupo B",
    grupoSeguridad: "B2L",
    directivaEquipos: "1",
    pca: "0",
    agotamientoOzono: "0",
    limitePractico: "0.00035 kg/m3",
    atelOdl: "0.00022 kg/m3",
    limiteInflamabilidad: "0.116 kg/m3",
    temperaturaAutoignicion: "630 ºC",
    gasFluorado: "NO"
  },
  "R-744": {
    nombre: "R-744",
    composicion: "Dióxido de carbono - CO2",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "1",
    agotamientoOzono: "0",
    limitePractico: "0.1 kg/m3",
    atelOdl: "0.072 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "NO"
  }
};

// Export list of refrigerant names
export const refrigerantes = Object.keys(refrigerantesData);

// Option lists for select inputs
export const inflamabilidadOpciones = [
  { value: "Grupo 1", label: "Grupo 1 (Refrigerante no inflamable)" },
  { value: "Grupo 2L", label: "Grupo 2L (Refrigerante ligeramente inflamable)" },
  { value: "Grupo 2", label: "Grupo 2 (Refrigerante inflamable)" },
  { value: "Grupo 3", label: "Grupo 3 (Refrigerante muy inflamable)" }
];

export const toxicidadOpciones = [
  { value: "Grupo A", label: "Grupo A (Refrigerante de acción tóxica ligera o nula)" },
  { value: "Grupo B", label: "Grupo B (Refrigerante tóxico)" }
];
