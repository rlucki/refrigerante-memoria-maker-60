
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface DatosGeneralesSectionProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => void;
}

const DatosGeneralesSection = ({ onChange }: DatosGeneralesSectionProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">1.- DATOS GENERALES DEL TITULAR</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nombreTitular">Nombre/Razón Social</Label>
            <Input 
              id="nombreTitular" 
              placeholder="Nombre del titular" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nifTitular">NIF/CIF</Label>
            <Input 
              id="nifTitular" 
              placeholder="NIF/CIF" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="direccionTitular">Dirección</Label>
            <Input 
              id="direccionTitular" 
              placeholder="Dirección" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="poblacionTitular">Población</Label>
            <Input 
              id="poblacionTitular" 
              placeholder="Población" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cp">Código Postal</Label>
            <Input 
              id="cp" 
              placeholder="Código postal" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="provinciaTitular">Provincia</Label>
            <Input 
              id="provinciaTitular" 
              placeholder="Provincia" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telefonoTitular">Teléfono</Label>
            <Input 
              id="telefonoTitular" 
              placeholder="Teléfono" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emailTitular">Email</Label>
            <Input 
              id="emailTitular" 
              type="email"
              placeholder="Email" 
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DatosGeneralesSection;
