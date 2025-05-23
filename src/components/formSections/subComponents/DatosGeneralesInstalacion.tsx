
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface DatosGeneralesInstalacionProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatosGeneralesInstalacion = ({ onChange }: DatosGeneralesInstalacionProps) => {
  return (
    <>
      <h3 className="text-lg font-medium mb-4">4.- DATOS INSTALACIÓN</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="direccionInstalacion">Dirección de la instalación</Label>
          <Input 
            id="direccionInstalacion" 
            placeholder="Dirección de la instalación" 
            defaultValue="AVDA. BLAS PÉREZ GONZÁLEZ, 4"
            onChange={onChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="poblacionInstalacion">Población</Label>
          <Input 
            id="poblacionInstalacion" 
            placeholder="Población" 
            defaultValue="PUERTO DE LA CRUZ"
            onChange={onChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="provinciaInstalacion">Provincia</Label>
          <Input 
            id="provinciaInstalacion" 
            placeholder="Provincia" 
            defaultValue="SANTA CRUZ DE TENERIFE"
            onChange={onChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cpInstalacion">C.P.</Label>
          <Input 
            id="cpInstalacion" 
            placeholder="Código postal" 
            defaultValue="35610"
            onChange={onChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telefono_instalacion">Teléfono</Label>
          <Input 
            id="telefono_instalacion" 
            placeholder="Teléfono" 
            defaultValue="922443768"
            onChange={onChange}
          />
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="num_inscripcion">Número de inscripción de la instalación</Label>
          <Input 
            id="num_inscripcion" 
            placeholder="Número de inscripción" 
            defaultValue="IF202400127"
            onChange={onChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fecha_inscripcion">Fecha</Label>
          <Input 
            id="fecha_inscripcion" 
            placeholder="Fecha" 
            type="date"
            defaultValue="2024-09-23"
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default DatosGeneralesInstalacion;
