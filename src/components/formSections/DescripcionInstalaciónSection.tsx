
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DescripcionInstalacionSectionProps {
  onChange: (field: string, value: any) => void;
  formData?: any;
}

const DescripcionInstalacionSection: React.FC<DescripcionInstalacionSectionProps> = ({ onChange, formData }) => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Datos de la instalación</h3>
        <div className="space-y-4">
          {/* Clasificación de la instalación (bidireccional con ClasificacionSection) */}
          <div>
            <Label htmlFor="nivelInstalacionDesc">Clasificación de la instalación</Label>
            <Select 
              value={formData?.nivelInstalacion || "Nivel 1"}
              onValueChange={(value) => onChange("nivelInstalacion", value)}
            >
              <SelectTrigger id="nivelInstalacionDesc" className="mt-2">
                <SelectValue placeholder="Seleccione nivel de instalación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nivel 1">Nivel 1</SelectItem>
                <SelectItem value="Nivel 2">Nivel 2</SelectItem>
                <SelectItem value="Nivel 3">Nivel 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Refrigerante (bidireccional con ClasificacionSection) */}
          <div>
            <Label htmlFor="refrigeranteDesc">Refrigerante</Label>
            <Input 
              id="refrigeranteDesc"
              className="mt-2"
              placeholder="Ej: R-448A"
              value={formData?.refrigerante || ""}
              onChange={(e) => onChange("refrigerante", e.target.value)}
            />
          </div>

          {/* Tipo de ventilador */}
          <div>
            <Label className="mb-2 block">Tipo de ventilador</Label>
            <RadioGroup 
              value={formData?.tipoVentilador || "helicoidal"}
              onValueChange={(value) => onChange("tipoVentilador", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="helicoidal" id="helicoidal" />
                <Label htmlFor="helicoidal">Helicoidal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="centrifugo" id="centrifugo" />
                <Label htmlFor="centrifugo">Centrífugo</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Temperatura de descarga */}
          <div>
            <Label htmlFor="temperaturaDescarga">Temperatura de descarga (°C)</Label>
            <Input 
              id="temperaturaDescarga"
              className="mt-2"
              type="number"
              placeholder="Ej: 124.8"
              value={formData?.temperaturaDescarga || ""}
              onChange={(e) => onChange("temperaturaDescarga", e.target.value)}
            />
          </div>

          {/* Presión de descarga */}
          <div>
            <Label htmlFor="presionDescarga">Presión de descarga (bar)</Label>
            <Input 
              id="presionDescarga"
              className="mt-2"
              type="number"
              placeholder="Ej: 93.7"
              value={formData?.presionDescarga || ""}
              onChange={(e) => onChange("presionDescarga", e.target.value)}
            />
          </div>

          {/* Ubicación gascooler/condensador */}
          <div>
            <Label htmlFor="ubicacionGascoolerDesc">Ubicación gascooler o condensador</Label>
            <Input 
              id="ubicacionGascoolerDesc"
              className="mt-2"
              placeholder="Ej: Cubierta"
              value={formData?.ubicacionGascooler || ""}
              onChange={(e) => onChange("ubicacionGascooler", e.target.value)}
            />
          </div>

          {/* Intercambiador IHX */}
          <div>
            <Label className="mb-2 block">¿Hay intercambiador IHX?</Label>
            <RadioGroup 
              value={formData?.tieneIHX || "no"}
              onValueChange={(value) => onChange("tieneIHX", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="ihx-si" />
                <Label htmlFor="ihx-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="ihx-no" />
                <Label htmlFor="ihx-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Desrecalentador */}
          <div>
            <Label className="mb-2 block">¿Tiene desrecalentador?</Label>
            <RadioGroup 
              value={formData?.tieneDesrecalentador || "no"}
              onValueChange={(value) => onChange("tieneDesrecalentador", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="si" id="desrecalentador-si" />
                <Label htmlFor="desrecalentador-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="desrecalentador-no" />
                <Label htmlFor="desrecalentador-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Kg de refrigerante */}
          <div>
            <Label htmlFor="kgRefrigerante">Kg de refrigerante según instalador</Label>
            <Input 
              id="kgRefrigerante"
              className="mt-2"
              type="number"
              placeholder="Ej: 85"
              value={formData?.kgRefrigerante || ""}
              onChange={(e) => onChange("kgRefrigerante", e.target.value)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DescripcionInstalacionSection;
