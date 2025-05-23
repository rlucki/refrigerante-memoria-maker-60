// src/components/formSections/DatosTecnicosSection.tsx

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

// Importa tu hook, que ya lee refrigerantesData internamente
import useRefrigeranteData from "@/hooks/useRefrigeranteData";

interface DatosTecnicosSectionProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { id: string; value: string }) => void;
  onGasFluoradoChange?: (field: string, value: string) => void;
}

const DatosTecnicosSection = ({ onChange, onGasFluoradoChange }: DatosTecnicosSectionProps) => {
  // Obtienes todo el sistemaData y los handlers
  const {
    sistemaData,
    handleSelectChange,
    handleInputChange
  } = useRefrigeranteData({ onChange, onGasFluoradoChange });

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">7.- DATOS TÉCNICOS</h3>

        {/* Cámaras, compresores... siguen igual, usando handleInputChange */}
        {/* ... */}

        <Separator className="my-6" />

        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">REFRIGERANTE</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Selector de refrigerante */}
            <div className="space-y-2">
              <Label htmlFor="refrigerante">Identificación del refrigerante</Label>
              <Select
                id="refrigerante"
                value={sistemaData.refrigerante}
                onValueChange={(val) => handleSelectChange("refrigerante", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar refrigerante" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(sistemaData).includes("refrigerante") /* o usa tu array de keys */}
                    ? Object.keys(refrigerantesData).map(r => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))
                    : null
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
