
import React from "react";
import NormativaSection from "./NormativaSection";
import DatosInstaladorSection from "./DatosInstaladorSection";
import DatosInstalacionSection from "./DatosInstalacionSection";
import ClasificacionSection from "./ClasificacionSection";
import DatosTecnicosSection from "./DatosTecnicosSection";

interface DatosTitularSectionProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => void;
  onNormativaChange: (field: string, value: any) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
  selectedRefrigerante?: string | null;
}

const DatosTitularSection = ({
  onChange,
  onNormativaChange,
  onCalculationsChange,
  onExcelUpload,
  selectedRefrigerante
}: DatosTitularSectionProps) => {
  // Create adapter for components that expect ChangeEvent<HTMLInputElement>
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  // Create adapter for DatosInstalacionSection passing through to parent onChange
  const handleInstalacionChange = (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => {
    onChange(e);
  };

  // Create adapter for DatosTecnicosSection which expects (field: string, value: any) => void
  const handleTecnicosChange = (field: string, value: any) => {
    onChange({ id: field, value });
  };
  
  return (
    <div className="space-y-6">
      <ClasificacionSection onChange={onChange} />
      <DatosInstaladorSection onChange={handleInputChange} />
      <DatosInstalacionSection onChange={handleInstalacionChange} onCalculationsChange={onCalculationsChange} onExcelUpload={onExcelUpload} />
      <DatosTecnicosSection onChange={handleTecnicosChange} />
      <NormativaSection onChange={onNormativaChange} selectedRefrigerante={selectedRefrigerante} />
    </div>
  );
};

export default DatosTitularSection;
