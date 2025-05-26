
import { useState, useEffect } from "react";
import { refrigerantesData } from "../data/refrigerantsData";

interface UseRefrigeranteDataProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { id: string; value: string }) => void;
  onGasFluoradoChange?: (field: string, value: string) => void;
}

interface SistemaData {
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
  metodoEnfriamiento: string;
  seguridadSistema: string;
  categoriaLocal: string;
  nivelInstalacion: string;
  documentoNecesario: string;
  [key: string]: string;
}

const useRefrigeranteData = ({ onChange, onGasFluoradoChange }: UseRefrigeranteDataProps) => {
  const [sistemaData, setSistemaData] = useState<SistemaData>({
    refrigerante: "",
    composicionRefrigerante: "",
    inflamabilidad: "",
    toxicidad: "",
    grupoSeguridad: "",
    directivaEquipos: "",
    pca: "",
    agotamientoOzono: "",
    limitePractico: "",
    atelOdl: "",
    limiteInflamabilidad: "",
    temperaturaAutoignicion: "",
    gasFluorado: "",
    metodoEnfriamiento: "",
    seguridadSistema: "",
    categoriaLocal: "",
    nivelInstalacion: "",
    documentoNecesario: "",
  });

  // Función centralizada para actualizar gasFluorado
  const updateGasFluorado = (value: string, source: string = "manual") => {
    console.log(`Updating gasFluorado from ${source}:`, value);
    
    setSistemaData(prev => ({ ...prev, gasFluorado: value }));
    notifyChange("gasFluorado", value);
    
    if (onGasFluoradoChange) {
      onGasFluoradoChange("gasFluorado", value);
    }
  };

  // Update refrigerant properties when refrigerant changes
  const updateRefrigerantProperties = (refrigeranteName: string) => {
    if (!refrigeranteName) return;

    const refrigerante = refrigerantesData[refrigeranteName];
    if (!refrigerante) return;

    const updates = {
      refrigerante: refrigeranteName,
      composicionRefrigerante: refrigerante.composicion || "",
      inflamabilidad: refrigerante.inflamabilidad || "",
      toxicidad: refrigerante.toxicidad || "",
      grupoSeguridad: refrigerante.grupoSeguridad || "",
      directivaEquipos: refrigerante.directivaEquipos || "",
      pca: refrigerante.pca || "",
      agotamientoOzono: refrigerante.agotamientoOzono || "",
      limitePractico: refrigerante.limitePractico || "",
      atelOdl: refrigerante.atelOdl || "",
      limiteInflamabilidad: refrigerante.limiteInflamabilidad || "",
      temperaturaAutoignicion: refrigerante.temperaturaAutoignicion || "",
    };

    // Update all fields except gasFluorado first
    Object.entries(updates).forEach(([field, value]) => {
      setSistemaData(prev => ({ ...prev, [field]: value }));
      notifyChange(field, value);
    });

    // Then update gasFluorado using the centralized function
    if (refrigerante.gasFluorado) {
      updateGasFluorado(refrigerante.gasFluorado, "refrigerant");
    }
  };

  // Generic handler for select changes
  const handleSelectChange = (field: string, value: string) => {
    // Special case for refrigerante selection
    if (field === "refrigerante") {
      updateRefrigerantProperties(value);
    } 
    // Special case for gasFluorado - use centralized function
    else if (field === "gasFluorado") {
      updateGasFluorado(value, "manual");
    } 
    // All other fields
    else {
      setSistemaData(prev => ({ ...prev, [field]: value }));
      notifyChange(field, value);
    }
  };

  // Handler for input changes from React.ChangeEvent
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSistemaData(prev => ({ ...prev, [id]: value }));
    notifyChange(id, value);
  };

  // Generic notification function
  const notifyChange = (field: string, value: string) => {
    if (onChange) {
      console.log("Field changed:", field, value);
      onChange({ id: field, value });
    }
  };

  return {
    sistemaData,
    handleSelectChange,
    handleInputChange,
    updateRefrigerantProperties,
    updateGasFluorado
  };
};

export default useRefrigeranteData;
