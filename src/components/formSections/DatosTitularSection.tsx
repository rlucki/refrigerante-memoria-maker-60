
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
  // Create adapter functions to bridge the type differences
  const handleDatosTecnicosChange = (field: string, value: any) => {
    onChange({ id: field, value });
  };

  return (
    <div className="space-y-6">
      <ClasificacionSection onChange={onChange} />
      <DatosInstaladorSection onChange={onChange} />
      <DatosInstalacionSection onChange={onChange} onCalculationsChange={onCalculationsChange} onExcelUpload={onExcelUpload} />
      <DatosTecnicosSection onChange={handleDatosTecnicosChange} />
      <NormativaSection onChange={onNormativaChange} selectedRefrigerante={selectedRefrigerante} />
    </div>
  );
};

export default DatosTitularSection;
