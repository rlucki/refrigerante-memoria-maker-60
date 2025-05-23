
import { useState, useEffect } from "react";
import { refrigerantesData } from "@/data/refrigerantsData";

export interface SistemaData {
  metodoEnfriamiento: string;
  seguridadSistema: string;
  categoriaLocal: string;
  refrigerante: string;
  composicionRefrigerante: string;
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
  nivelInstalacion: string;
  documentoNecesario: string;
}

interface UseRefrigeranteDataProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => void;
  onGasFluoradoChange?: (field: string, value: string) => void;
}

const useRefrigeranteData = ({ onChange, onGasFluoradoChange }: UseRefrigeranteDataProps) => {
  // Default data state
  const [sistemaData, setSistemaData] = useState<SistemaData>({
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
        // First update all other refrigerant properties
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
          temperaturaAutoignicion: data.temperaturaAutoignicion
        }).forEach(([id, value]) => {
          onChange({ id, value });
        });
        
        // Update gasFluorado last to ensure it takes precedence
        console.log("Setting gasFluorado from refrigerant to:", data.gasFluorado);
        onChange({ id: "gasFluorado", value: data.gasFluorado });
      }
    }
  }, [sistemaData.refrigerante, onChange]);

  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    setSistemaData(prev => ({ ...prev, [field]: value }));
    
    if (onChange) {
      // For most fields, just update normally
      onChange({ id: field, value: value });
      
      // Special case for gasFluorado: when changed manually, update with special field name
      if (field === "gasFluorado") {
        console.log("Manual change of gasFluorado to:", value);
        if (onGasFluoradoChange) {
          onGasFluoradoChange("manualGasFluorado", value);
        }
      }
      
      // When changing refrigerant, let the useEffect handle the updates
      if (field === "refrigerante") {
        console.log("Refrigerant changed to:", value);
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

  return { 
    sistemaData, 
    handleSelectChange, 
    handleInputChange
  };
};

export default useRefrigeranteData;
