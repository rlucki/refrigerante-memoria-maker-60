
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NormativaSection from "./NormativaSection";

interface DatosInstalacionSectionProps {
  onChange?: (field: string, value: any) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
  gasFluorado?: string;
  codigoPostal?: string; // Add postal code prop
  onNormativaChange?: (field: string, value: any) => void; // Add this missing prop
}

const DatosInstalacionSection = ({ 
  onChange, 
  onCalculationsChange, 
  onExcelUpload,
  gasFluorado,
  codigoPostal,
  onNormativaChange
}: DatosInstalacionSectionProps) => {
  
  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">2.- DATOS DE LA INSTALACIÓN</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombreInstalacion">Nombre de la instalación</Label>
              <Input 
                id="nombreInstalacion" 
                placeholder="Nombre de la instalación" 
                defaultValue="Instalación frigorífica DINOSOL Costa del Silencio (Arona)"
                onChange={(e) => onChange?.(e.target.id, e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ubicacion">Ubicación</Label>
              <Input 
                id="ubicacion" 
                placeholder="Ubicación" 
                defaultValue="C/ EL MOJÓN, S/N"
                onChange={(e) => onChange?.(e.target.id, e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="poblacionInstalacion">Población</Label>
              <Input 
                id="poblacionInstalacion" 
                placeholder="Población" 
                defaultValue="COSTA DEL SILENCIO (ARONA)"
                onChange={(e) => onChange?.(e.target.id, e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provinciaInstalacion">Provincia</Label>
              <Input 
                id="provinciaInstalacion" 
                placeholder="Provincia" 
                defaultValue="SANTA CRUZ DE TENERIFE"
                onChange={(e) => onChange?.(e.target.id, e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cpInstalacion">C.P.</Label>
              <Input 
                id="cpInstalacion" 
                placeholder="Código postal" 
                defaultValue="38640"
                onChange={(e) => onChange?.(e.target.id, e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      <Separator className="my-6" />

      {/* Pass both gas fluorado and postal code to NormativaSection */}
      <NormativaSection 
        onChange={onChange} 
        aplicaGasesFluorados={gasFluorado}
        codigoPostal={codigoPostal}
        onNormativaChange={onNormativaChange}
      />
    </div>
  );
};

export default DatosInstalacionSection;
