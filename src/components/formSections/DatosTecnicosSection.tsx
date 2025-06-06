
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface DatosTecnicosSectionProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { id: string; value: string }) => void;
  onGasFluoradoChange?: (field: string, value: string) => void;
}

const DatosTecnicosSection = ({ onChange }: DatosTecnicosSectionProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">4.- DATOS TÉCNICOS</h3>

        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">EQUIPOS DE REFRIGERACIÓN</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="camaras">Número de cámaras</Label>
              <Input 
                id="camaras" 
                placeholder="Número de cámaras"
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="compresores">Número de compresores</Label>
              <Input 
                id="compresores" 
                placeholder="Número de compresores"
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="evaporadores">Número de evaporadores</Label>
              <Input 
                id="evaporadores" 
                placeholder="Número de evaporadores"
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condensadores">Número de condensadores</Label>
              <Input 
                id="condensadores" 
                placeholder="Número de condensadores"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DatosTecnicosSection;
