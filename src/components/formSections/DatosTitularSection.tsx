
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatosGeneralesSection from "./DatosGeneralesSection";
import DatosNotificacionSection from "./DatosNotificacionSection";
import DatosInstaladorSection from "./DatosInstaladorSection";
import DatosInstalacionSection from "./DatosInstalacionSection";
import DatosTecnicosSection from "./DatosTecnicosSection";
import ClasificacionSection from "./ClasificacionSection";
import { ExcelCalculationsForm } from "../ExcelCalculationsForm";
import { ExcelDataViewer } from "../ExcelDataViewer";

interface DatosTitularSectionProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => void;
  onNormativaChange?: (field: string, value: any) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
  onGasFluoradoChange?: (field: string, value: string) => void;
}

const DatosTitularSection = ({ 
  onChange, 
  onNormativaChange,
  onCalculationsChange,
  onExcelUpload,
  onGasFluoradoChange
}: DatosTitularSectionProps) => {
  const [activeSubTab, setActiveSubTab] = useState("titular");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [gasFluorado, setGasFluorado] = useState("SI"); // Estado local para gas fluorado

  // Handle postal code changes and propagate them
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => {
    let value: string;
    if ('target' in e) {
      value = e.target.value;
    } else {
      value = e.value;
    }
    
    if (e && ('id' in e ? e.id === 'cp' : e.target?.id === 'cp')) {
      setCodigoPostal(value);
      console.log("Postal code updated:", value);
    }
    
    // Propagate the change up
    if (onChange) {
      onChange(e);
    }
  };

  // Handle gas fluorado changes
  const handleGasFluoradoUpdate = (field: string, value: string) => {
    console.log("Gas fluorado updated in DatosTitularSection:", field, value);
    
    if (field === "gasFluorado") {
      setGasFluorado(value);
      
      // Propagate to parent components
      if (onGasFluoradoChange) {
        onGasFluoradoChange(field, value);
      }
      
      // Also update through onChange for general form handling
      if (onChange) {
        onChange({ id: field, value });
      }
    }
  };

  // Adapter function for DatosInstalacionSection
  const handleInstalacionChange = (field: string, value: any) => {
    // Convert to the format expected by handlePostalCodeChange
    handlePostalCodeChange({ id: field, value: value });
  };

  return (
    <div className="space-y-8">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="titular">Titular</TabsTrigger>
          <TabsTrigger value="notificacion">Notificación</TabsTrigger>
          <TabsTrigger value="instalador">Instalador</TabsTrigger>
          <TabsTrigger value="instalacion">Instalación</TabsTrigger>
          <TabsTrigger value="tecnicos">Técnicos</TabsTrigger>
          <TabsTrigger value="clasificacion">Clasificación</TabsTrigger>
          <TabsTrigger value="calculos">Cálculos</TabsTrigger>
        </TabsList>

        <TabsContent value="titular" className="mt-6">
          <DatosGeneralesSection onChange={handlePostalCodeChange} />
        </TabsContent>
        
        <TabsContent value="notificacion" className="mt-6">
          <DatosNotificacionSection onChange={handlePostalCodeChange} />
        </TabsContent>
        
        <TabsContent value="instalador" className="mt-6">
          <DatosInstaladorSection onChange={handlePostalCodeChange} />
        </TabsContent>
        
        <TabsContent value="instalacion" className="mt-6">
          <DatosInstalacionSection 
            onChange={handleInstalacionChange}
            onCalculationsChange={onCalculationsChange}
            onExcelUpload={onExcelUpload}
            gasFluorado={gasFluorado} // Pasar el estado actual
            codigoPostal={codigoPostal}
            onNormativaChange={onNormativaChange}
          />
        </TabsContent>
        
        <TabsContent value="tecnicos" className="mt-6">
          <DatosTecnicosSection 
            onChange={handlePostalCodeChange}
            onGasFluoradoChange={handleGasFluoradoUpdate}
          />
        </TabsContent>
        
        <TabsContent value="clasificacion" className="mt-6">
          <ClasificacionSection 
            onChange={handlePostalCodeChange}
            onGasFluoradoChange={handleGasFluoradoUpdate}
          />
        </TabsContent>
        
        <TabsContent value="calculos" className="mt-6">
          <div className="space-y-6">
            <ExcelCalculationsForm onCalculationsChange={onCalculationsChange} />
            <ExcelDataViewer onExcelUpload={onExcelUpload} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatosTitularSection;
