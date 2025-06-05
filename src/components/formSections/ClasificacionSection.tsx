
import React from "react";
import { Card } from "@/components/ui/card";
import { SistemaData } from "@/hooks/useRefrigeranteData";
import ClasificacionLocalTable from "./clasificacion/ClasificacionLocalTable";
import ClasificacionInstalacionTable from "./clasificacion/ClasificacionInstalacionTable";

interface ClasificacionSectionProps {
  sistemaData: SistemaData;
  onSelectChange: (field: string, value: string) => void;
}

const ClasificacionSection = ({ sistemaData, onSelectChange }: ClasificacionSectionProps) => {
  
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">5.- CLASIFICACIÓN</h3>
        
        <div className="space-y-6 classification-section">
          {/* Clasificación del local */}
          <ClasificacionLocalTable
            categoriaLocal={sistemaData.categoriaLocal}
            onSelectChange={onSelectChange}
          />

          {/* Clasificación de la instalación */}
          <ClasificacionInstalacionTable
            nivelInstalacion={sistemaData.nivelInstalacion}
            documentoNecesario={sistemaData.documentoNecesario}
            onSelectChange={onSelectChange}
          />
        </div>
      </div>
    </Card>
  );
};

export default ClasificacionSection;
