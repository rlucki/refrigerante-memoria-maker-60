
import React from "react";
import { Card } from "@/components/ui/card";
import useRefrigeranteData from "@/hooks/useRefrigeranteData";
import ClasificacionSistemaTable from "./clasificacion/ClasificacionSistemaTable";
import ClasificacionLocalTable from "./clasificacion/ClasificacionLocalTable";
import RefrigeranteTable from "./clasificacion/RefrigeranteTable";
import ClasificacionInstalacionTable from "./clasificacion/ClasificacionInstalacionTable";

interface ClasificacionSectionProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => void;
  onGasFluoradoChange?: (field: string, value: string) => void;
}

const ClasificacionSection = ({ onChange, onGasFluoradoChange }: ClasificacionSectionProps) => {
  const { sistemaData, handleSelectChange, handleInputChange } = useRefrigeranteData({ 
    onChange, 
    onGasFluoradoChange 
  });
  
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">CLASIFICACIÓN DEL SISTEMA</h3>
        
        <div className="space-y-6 classification-section">
          {/* Clasificación del sistema */}
          <ClasificacionSistemaTable 
            metodoEnfriamiento={sistemaData.metodoEnfriamiento}
            seguridadSistema={sistemaData.seguridadSistema}
            onSelectChange={handleSelectChange}
          />

          {/* Clasificación del local */}
          <ClasificacionLocalTable 
            categoriaLocal={sistemaData.categoriaLocal}
            onSelectChange={handleSelectChange}
          />

          {/* Refrigerante - WITHOUT gas fluorado question */}
          <RefrigeranteTable 
            sistemaData={sistemaData}
            onSelectChange={handleSelectChange}
            onInputChange={handleInputChange}
          />

          {/* Clasificación de la instalación */}
          <ClasificacionInstalacionTable 
            nivelInstalacion={sistemaData.nivelInstalacion}
            documentoNecesario={sistemaData.documentoNecesario}
            onSelectChange={handleSelectChange}
          />
        </div>
      </div>
    </Card>
  );
};

export default ClasificacionSection;
