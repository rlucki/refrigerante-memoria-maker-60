
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import NormativaSection from "./NormativaSection";

interface DatosInstalacionSectionProps {
  onChange?: (field: string, value: any) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
  gasFluorado?: string;
  codigoPostal?: string;
  onNormativaChange?: (field: string, value: any) => void;
}

const DatosInstalacionSection = ({ 
  onChange, 
  onCalculationsChange, 
  onExcelUpload, 
  gasFluorado,
  codigoPostal,
  onNormativaChange
}: DatosInstalacionSectionProps) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
  };

  console.log("DatosInstalacionSection - gasFluorado prop:", gasFluorado);

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">4.- DATOS DE LA INSTALACIÓN</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="direccionInstalacion">Dirección</Label>
              <Input 
                id="direccionInstalacion" 
                placeholder="Dirección de la instalación" 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="poblacionInstalacion">Población</Label>
              <Input 
                id="poblacionInstalacion" 
                placeholder="Población" 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cpInstalacion">Código Postal</Label>
              <Input 
                id="cpInstalacion" 
                placeholder="Código postal" 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provinciaInstalacion">Provincia</Label>
              <Input 
                id="provinciaInstalacion" 
                placeholder="Provincia" 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefonoInstalacion">Teléfono</Label>
              <Input 
                id="telefonoInstalacion" 
                placeholder="Teléfono" 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="num_inscripcion">Número de inscripción</Label>
              <Input 
                id="num_inscripcion" 
                placeholder="Número de inscripción" 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fecha_inscripcion">Fecha de inscripción</Label>
              <Input 
                id="fecha_inscripcion" 
                type="date"
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tipoInstalacion">Tipo de instalación</Label>
              <Input 
                id="tipoInstalacion" 
                placeholder="Tipo de instalación" 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nombreProyecto">Nombre del proyecto</Label>
              <Input 
                id="nombreProyecto" 
                placeholder="Nombre del proyecto" 
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </Card>
      
      {/* Normativa Section */}
      <NormativaSection 
        onChange={onChange}
        aplicaGasesFluorados={gasFluorado} // Usar el prop recibido
        codigoPostal={codigoPostal}
        onNormativaChange={onNormativaChange}
      />
    </div>
  );
};

export default DatosInstalacionSection;
