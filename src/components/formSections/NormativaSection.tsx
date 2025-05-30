
import React from "react";
import NormativaDisplay from "./normativa/NormativaDisplay";

interface NormativaSectionProps {
  onChange?: (field: string, value: any) => void;
  aplicaGasesFluorados?: string; // ✓ Cambiamos el nombre de la prop
  codigoPostal?: string;
  onNormativaChange?: (field: string, value: any) => void;
}

const NormativaSection: React.FC<NormativaSectionProps> = (props) => {
  return <NormativaDisplay {...props} />;
};

export default NormativaSection;
