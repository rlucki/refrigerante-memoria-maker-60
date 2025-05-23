import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ClasificacionSectionProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => void;
}

// Define refrigerant data structure
interface RefrigeranteData {
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

const ClasificacionSection = ({ onChange }: ClasificacionSectionProps) => {
  // Define refrigerants database
  const refrigerantesData: Record<string, RefrigeranteData> = {
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

  const refrigerantes = [
    "R-1234yf",
    "R-1234ze",
    "R-134a",
    "R-170",
    "R-22",
    "R-290",
    "R-32",
    "R-404A",
    "R-407F",
    "R-410A",
    "R-424A",
    "R-427A",
    "R-434A",
    "R-442A",
    "R-448A",
    "R-449A",
    "R-450A",
    "R-452A",
    "R-453A",
    "R-454C",
    "R-455A",
    "R-507A",
    "R-513A",
    "R-600",
    "R-600a",
    "R-717",
    "R-744"
  ];

  const inflamabilidadOpciones = [
    { value: "Grupo 1", label: "Grupo 1 (Refrigerante no inflamable)" },
    { value: "Grupo 2L", label: "Grupo 2L (Refrigerante ligeramente inflamable)" },
    { value: "Grupo 2", label: "Grupo 2 (Refrigerante inflamable)" },
    { value: "Grupo 3", label: "Grupo 3 (Refrigerante muy inflamable)" }
  ];

  const toxicidadOpciones = [
    { value: "Grupo A", label: "Grupo A (Refrigerante de acción tóxica ligera o nula)" },
    { value: "Grupo B", label: "Grupo B (Refrigerante tóxico)" }
  ];

  const [sistemaData, setSistemaData] = useState({
    metodoEnfriamiento: "Sistema directo",
    seguridadSistema: "Tipo 2",
    categoriaLocal: "Categoría A",
    refrigerante: "R-434A",
    composicionRefrigerante: "(63,2% R-125 / 18% R-143a / 16% R-134a / 2,8% R-600a)",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "3245",
    agotamientoOzono: "0",
    limitePractico: "0.32 kg/m3",
    atelOdl: "0.32 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI",
    nivelInstalacion: "Nivel 1",
    documentoNecesario: "Memoria"
  });

  // Update refrigerant properties when refrigerant changes
  useEffect(() => {
    const refrigeranteSelected = sistemaData.refrigerante;
    if (refrigeranteSelected && refrigerantesData[refrigeranteSelected]) {
      const data = refrigerantesData[refrigeranteSelected];
      setSistemaData(prev => ({
        ...prev,
        composicionRefrigerante: data.composicion,
        inflamabilidad: data.inflamabilidad,
        toxicidad: data.toxicidad,
        grupoSeguridad: data.grupoSeguridad,
        directivaEquipos: data.directivaEquipos,
        pca: data.pca,
        agotamientoOzono: data.agotamientoOzono,
        limitePractico: data.limitePractico,
        atelOdl: data.atelOdl,
        limiteInflamabilidad: data.limiteInflamabilidad,
        temperaturaAutoignicion: data.temperaturaAutoignicion,
        gasFluorado: data.gasFluorado
      }));

      // Notify parent component of changes
      if (onChange) {
        Object.entries({
          refrigerante: data.nombre,
          composicionRefrigerante: data.composicion,
          inflamabilidad: data.inflamabilidad,
          toxicidad: data.toxicidad,
          grupoSeguridad: data.grupoSeguridad,
          directivaEquipos: data.directivaEquipos,
          pca: data.pca,
          agotamientoOzono: data.agotamientoOzono,
          limitePractico: data.limitePractico,
          atelOdl: data.atelOdl,
          limiteInflamabilidad: data.limiteInflamabilidad,
          temperaturaAutoignicion: data.temperaturaAutoignicion,
          gasFluorado: data.gasFluorado
        }).forEach(([id, value]) => {
          onChange({ id, value });
        });
      }
    }
  }, [sistemaData.refrigerante]);

  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    setSistemaData(prev => ({ ...prev, [field]: value }));
    
    if (onChange) {
      onChange({ id: field, value: value });
      
      // Special case: when changing gasFluorado manually, notify with special field name
      // to distinguish from automatic updates
      if (field === "gasFluorado") {
        onChange({ id: "manualGasFluorado", value: value });
      }
    }
  };

  // Handle custom input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSistemaData(prev => ({ ...prev, [id]: value }));
    
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">CLASIFICACIÓN DEL SISTEMA</h3>
        
        <div className="space-y-6 classification-section">
          {/* Clasificación del sistema */}
          <div className="border-b pb-4 avoid-break">
            <table className="w-full border-collapse classification-table">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 border">Clasificación del sistema</th>
                  <th className="text-left p-2 border">Criterio</th>
                  <th className="text-left p-2 border">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border font-medium" rowSpan={2}>Clasificación del sistema</td>
                  <td className="p-2 border">Atendiendo al método de enfriamiento</td>
                  <td className="p-2 border">
                    <Select 
                      value={sistemaData.metodoEnfriamiento} 
                      onValueChange={(value) => handleSelectChange("metodoEnfriamiento", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar método" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sistema directo">Sistema directo</SelectItem>
                        <SelectItem value="Sistema indirecto">Sistema indirecto</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">Atendiendo a criterios de seguridad del sistema</td>
                  <td className="p-2 border">
                    <Select 
                      value={sistemaData.seguridadSistema} 
                      onValueChange={(value) => handleSelectChange("seguridadSistema", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tipo 1">Tipo 1</SelectItem>
                        <SelectItem value="Tipo 2">Tipo 2</SelectItem>
                        <SelectItem value="Tipo 3">Tipo 3</SelectItem>
                        <SelectItem value="Tipo 4">Tipo 4</SelectItem>
                        <SelectItem value="Tipos 1 y 2">Tipos 1 y 2</SelectItem>
                        <SelectItem value="Tipos 1 y 3">Tipos 1 y 3</SelectItem>
                        <SelectItem value="Tipos 2 y 3">Tipos 2 y 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Clasificación del local */}
          <div className="border-b pb-4 avoid-break">
            <table className="w-full border-collapse classification-table">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 border">Clasificación</th>
                  <th className="text-left p-2 border">Criterio</th>
                  <th className="text-left p-2 border">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border font-medium">Clasificación del local</td>
                  <td className="p-2 border">Atendiendo a criterios de seguridad del local</td>
                  <td className="p-2 border">
                    <Select 
                      value={sistemaData.categoriaLocal} 
                      onValueChange={(value) => handleSelectChange("categoriaLocal", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Categoría A">Categoría A</SelectItem>
                        <SelectItem value="Categoría B">Categoría B</SelectItem>
                        <SelectItem value="Categoría C">Categoría C</SelectItem>
                        <SelectItem value="Categoría D">Categoría D</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Refrigerante */}
          <div className="border-b pb-4 classification-section">
            <table className="w-full border-collapse classification-table">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 border">Parámetro</th>
                  <th className="text-left p-2 border">Valor</th>
                  <th className="text-left p-2 border">Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border font-medium">Refrigerante</td>
                  <td className="p-2 border">
                    <Select 
                      value={sistemaData.refrigerante} 
                      onValueChange={(value) => handleSelectChange("refrigerante", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar refrigerante" />
                      </SelectTrigger>
                      <SelectContent>
                        {refrigerantes.map((ref) => (
                          <SelectItem key={ref} value={ref}>
                            {ref}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-2 border">
                    <Input
                      id="composicionRefrigerante"
                      value={sistemaData.composicionRefrigerante}
                      onChange={handleInputChange}
                      className="w-full"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">- Clasificación en función de su inflamabilidad:</td>
                  <td className="p-2 border" colSpan={2}>
                    <Select 
                      value={sistemaData.inflamabilidad}
                      onValueChange={(value) => handleSelectChange("inflamabilidad", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar grupo" />
                      </SelectTrigger>
                      <SelectContent>
                        {inflamabilidadOpciones.map((opcion) => (
                          <SelectItem key={opcion.value} value={opcion.value}>
                            {opcion.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">- Clasificación en función de su toxicidad:</td>
                  <td className="p-2 border" colSpan={2}>
                    <Select 
                      value={sistemaData.toxicidad} 
                      onValueChange={(value) => handleSelectChange("toxicidad", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar grupo" />
                      </SelectTrigger>
                      <SelectContent>
                        {toxicidadOpciones.map((opcion) => (
                          <SelectItem key={opcion.value} value={opcion.value}>
                            {opcion.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">- Grupo de seguridad:</td>
                  <td className="p-2 border" colSpan={2}>
                    <Input
                      id="grupoSeguridad"
                      value={sistemaData.grupoSeguridad}
                      onChange={handleInputChange}
                      className="w-full"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">- Clasificación según Directiva de Equipos a Presión:</td>
                  <td className="p-2 border" colSpan={2}>
                    <Input
                      id="directivaEquipos"
                      value={sistemaData.directivaEquipos}
                      onChange={handleInputChange}
                      className="w-full"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">- Potencial de calentamiento atmosférico (PCA):</td>
                  <td className="p-2 border" colSpan={2}>
                    <Input
                      id="pca"
                      value={sistemaData.pca}
                      onChange={handleInputChange}
                      className="w-full"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">- Potencial de agotamiento de la capa de ozono (PAO):</td>
                  <td className="p-2 border" colSpan={2}>
                    <Input
                      id="agotamientoOzono"
                      value={sistemaData.agotamientoOzono}
                      onChange={handleInputChange}
                      className="w-full"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">- Límite práctico admisible:</td>
                  <td className="p-2 border" colSpan={2}>
                    <Input
                      id="limitePractico"
                      value={sistemaData.limitePractico}
                      onChange={handleInputChange}
                      className="w-full"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">- ATEL/ODL:</td>
                  <td className="p-2 border" colSpan={2}>
                    <Input
                      id="atelOdl"
                      value={sistemaData.atelOdl}
                      onChange={handleInputChange}
                      className="w-full"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">- Límite inferior de inflamabilidad (LII):</td>
                  <td className="p-2 border" colSpan={2}>
                    <Input
                      id="limiteInflamabilidad"
                      value={sistemaData.limiteInflamabilidad}
                      onChange={handleInputChange}
                      className="w-full"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">- Temperatura de autoignición:</td>
                  <td className="p-2 border" colSpan={2}>
                    <Input
                      id="temperaturaAutoignicion"
                      value={sistemaData.temperaturaAutoignicion}
                      onChange={handleInputChange}
                      className="w-full"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">- Gas fluorado:</td>
                  <td className="p-2 border" colSpan={2}>
                    <Select 
                      value={sistemaData.gasFluorado} 
                      onValueChange={(value) => handleSelectChange("gasFluorado", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SI">SI</SelectItem>
                        <SelectItem value="NO">NO</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Clasificación de la instalación */}
          <div className="avoid-break">
            <table className="w-full border-collapse classification-table">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 border">Parámetro</th>
                  <th className="text-left p-2 border" colSpan={2}>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border font-medium">Clasificación de la Instalación</td>
                  <td className="p-2 border" colSpan={2}>
                    <Select 
                      value={sistemaData.nivelInstalacion} 
                      onValueChange={(value) => handleSelectChange("nivelInstalacion", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nivel 1">Nivel 1</SelectItem>
                        <SelectItem value="Nivel 2">Nivel 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border font-medium">Documento necesario</td>
                  <td className="p-2 border" colSpan={2}>
                    <Select 
                      value={sistemaData.documentoNecesario} 
                      onValueChange={(value) => handleSelectChange("documentoNecesario", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar documento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Memoria">Memoria</SelectItem>
                        <SelectItem value="Proyecto">Proyecto</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClasificacionSection;
