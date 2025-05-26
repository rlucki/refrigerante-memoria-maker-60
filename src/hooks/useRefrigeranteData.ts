
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
  });

  // Update refrigerant properties when refrigerant changes (WITHOUT gasFluorado)
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

    // Update each field individually and notify parent
    Object.entries(updates).forEach(([field, value]) => {
      setSistemaData(prev => ({ ...prev, [field]: value }));
      notifyChange(field, value);
    });
  };

  // Generic handler for select changes
  const handleSelectChange = (field: string, value: string) => {
    // Special case for refrigerante selection
    if (field === "refrigerante") {
      updateRefrigerantProperties(value);
    } else {
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
    updateRefrigerantProperties
  };
};

export default useRefrigeranteData;
