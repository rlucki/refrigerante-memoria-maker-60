
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
  const [selectedRefrigerante, setSelectedRefrigerante] = useState<string | null>(null);
  
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
    
    // Detect refrigerant changes
    if (('target' in e && e.target.id === 'refrigerante') || 
        (!('target' in e) && e.id === 'refrigerante')) {
      const value = 'target' in e ? e.target.value : e.value;
      setSelectedRefrigerante(value);
    }
  };
  
  // Adapter function for NormativaSection
  const handleNormativaChange = (field: string, value: any) => {
    if (onChange) {
      onChange(field, value);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <DatosTitularSection 
        onChange={handleInputChange}
        onNormativaChange={handleNormativaChange}
        onCalculationsChange={onCalculationsChange}
        onExcelUpload={onExcelUpload}
        selectedRefrigerante={selectedRefrigerante}
      />
    </form>
  );
};

export default MemoriaTecnicaForm;
