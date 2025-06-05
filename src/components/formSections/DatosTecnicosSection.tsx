
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import the hook and data
import { SistemaData } from "@/hooks/useRefrigeranteData";
import { refrigerantesData, refrigerantes } from "@/data/refrigerantsData";

interface DatosTecnicosSectionProps {
  sistemaData: SistemaData;
  onSelectChange: (field: string, value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatosTecnicosSection = ({ sistemaData, onSelectChange, onInputChange }: DatosTecnicosSectionProps) => {

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
                onChange={onInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="compresores">Número de compresores</Label>
              <Input 
                id="compresores" 
                placeholder="Número de compresores"
                onChange={onInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="evaporadores">Número de evaporadores</Label>
              <Input 
                id="evaporadores" 
                placeholder="Número de evaporadores"
                onChange={onInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condensadores">Número de condensadores</Label>
              <Input 
                id="condensadores" 
                placeholder="Número de condensadores"
                onChange={onInputChange}
              />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">REFRIGERANTE</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Selector de refrigerante */}
            <div className="space-y-2">
              <Label htmlFor="refrigerante">Identificación del refrigerante</Label>
              <Select
                value={sistemaData.refrigerante}
                onValueChange={(val) => onSelectChange("refrigerante", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar refrigerante" />
                </SelectTrigger>
                <SelectContent>
                  {refrigerantes.map(r => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Campos derivados */}
            {[
              ["composicionRefrigerante", "Composición"],
              ["inflamabilidad", "Inflamabilidad"],
              ["toxicidad", "Toxicidad"],
              ["grupoSeguridad", "Grupo de seguridad"],
              ["directivaEquipos", "Directiva Equipos a Presión"],
              ["pca", "PCA"],
              ["agotamientoOzono", "PAO"],
              ["limitePractico", "Límite práctico"],
              ["atelOdl", "ATEL/ODL"],
              ["limiteInflamabilidad", "Límite inflamabilidad"],
              ["temperaturaAutoignicion", "Temperatura autoignición"],
              ["gasFluorado", "Gas fluorado"]
            ].map(([field, label]) => (
              <div className="space-y-2" key={field}>
                <Label htmlFor={field}>{label}</Label>
                <Input
                  id={field}
                  value={(sistemaData as any)[field] || ""}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DatosTecnicosSection;
