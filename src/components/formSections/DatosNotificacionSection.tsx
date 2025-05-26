
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface DatosNotificacionSectionProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => void;
}

const DatosNotificacionSection = ({ onChange }: DatosNotificacionSectionProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">2.- DATOS PARA NOTIFICACIONES</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nombreNotificacion">Nombre/Razón Social</Label>
            <Input 
              id="nombreNotificacion" 
              placeholder="Nombre para notificaciones" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nifNotificacion">NIF/CIF</Label>
            <Input 
              id="nifNotificacion" 
              placeholder="NIF/CIF" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="direccionNotificacion">Dirección</Label>
            <Input 
              id="direccionNotificacion" 
              placeholder="Dirección" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="poblacionNotificacion">Población</Label>
            <Input 
              id="poblacionNotificacion" 
              placeholder="Población" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cpNotificacion">Código Postal</Label>
            <Input 
              id="cpNotificacion" 
              placeholder="Código postal" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="provinciaNotificacion">Provincia</Label>
            <Input 
              id="provinciaNotificacion" 
              placeholder="Provincia" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telefonoNotificacion">Teléfono</Label>
            <Input 
              id="telefonoNotificacion" 
              placeholder="Teléfono" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emailNotificacion">Email</Label>
            <Input 
              id="emailNotificacion" 
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

export default DatosNotificacionSection;
