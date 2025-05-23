
import { useState } from "react";
import DatosTitularSection from "./formSections/DatosTitularSection";

interface MemoriaTecnicaFormProps {
  onSubmit: () => void;
  onChange?: (field: string, value: any) => void;
  onWordTemplateUploaded?: (file: File) => void;
  onGenerateWordDocument?: () => void;
  hasWordTemplate?: boolean;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
}

const MemoriaTecnicaForm = ({ 
  onSubmit, 
  onChange, 
  onCalculationsChange,
  onExcelUpload
}: MemoriaTecnicaFormProps) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // Adapter function for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => {
    if (onChange) {
      if ('target' in e) {
        onChange(e.target.id, e.target.value);
      } else {
        onChange(e.id, e.value);
      }
    }
  };
  
  // Adapter function for NormativaSection
  const handleNormativaChange = (field: string, value: any) => {
    if (onChange) {
      onChange(field, value);
      
      // If we're updating the clasificacionSistema field, also update gasFluorado field to match
      if (field === "clasificacionSistema") {
        onChange("gasFluorado", value);
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <DatosTitularSection 
        onChange={handleInputChange}
        onNormativaChange={handleNormativaChange}
        onCalculationsChange={onCalculationsChange}
        onExcelUpload={onExcelUpload}
      />
    </form>
  );
};

export default MemoriaTecnicaForm;
