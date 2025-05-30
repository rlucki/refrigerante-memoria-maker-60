
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
          {/* Clasificación del sistema - incluye la pregunta principal de gas fluorado */}
          <ClasificacionSistemaTable 
            metodoEnfriamiento={sistemaData.metodoEnfriamiento}
            seguridadSistema={sistemaData.seguridadSistema}
            gasFluorado={sistemaData.gasFluorado}
            onSelectChange={handleSelectChange}
          />

          {/* Clasificación del local */}
          <ClasificacionLocalTable 
            categoriaLocal={sistemaData.categoriaLocal}
            onSelectChange={handleSelectChange}
          />

          {/* Refrigerante - sin la pregunta duplicada de gas fluorado */}
          <RefrigeranteTable
          sistemaData={sistemaData}
          onSelectChange={handleSelectChange}
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
