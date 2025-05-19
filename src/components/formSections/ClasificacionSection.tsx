
import React from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClasificacionSectionProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => void;
  formData?: any;
}

const ClasificacionSection: React.FC<ClasificacionSectionProps> = ({ onChange, formData = {} }) => {
  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    onChange({ id: field, value });
  };
  
  // Handle radio group changes
  const handleRadioChange = (field: string, value: string) => {
    onChange({ id: field, value });
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Clasificación de la instalación</h3>
        <div className="space-y-4">
          {/* Método de enfriamiento */}
          <div>
            <Label htmlFor="metodoEnfriamiento">Método de enfriamiento</Label>
            <Select 
              defaultValue={formData.metodoEnfriamiento || "Sistema directo"}
              onValueChange={(value) => handleSelectChange("metodoEnfriamiento", value)}
            >
              <SelectTrigger id="metodoEnfriamiento" className="mt-2">
                <SelectValue placeholder="Seleccione método de enfriamiento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sistema directo">Sistema directo</SelectItem>
                <SelectItem value="Sistema indirecto">Sistema indirecto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Seguridad del sistema */}
          <div>
            <Label htmlFor="seguridadSistema">Seguridad del sistema</Label>
            <Select 
              defaultValue={formData.seguridadSistema || "Tipo 1"}
              onValueChange={(value) => handleSelectChange("seguridadSistema", value)}
            >
              <SelectTrigger id="seguridadSistema" className="mt-2">
                <SelectValue placeholder="Seleccione tipo de seguridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tipo 1">Tipo 1</SelectItem>
                <SelectItem value="Tipo 2">Tipo 2</SelectItem>
                <SelectItem value="Tipo 3">Tipo 3</SelectItem>
                <SelectItem value="Tipo 4">Tipo 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Categoría del local */}
          <div>
            <Label htmlFor="categoriaLocal">Categoría del local</Label>
            <Select 
              defaultValue={formData.categoriaLocal || "Categoría A"}
              onValueChange={(value) => handleSelectChange("categoriaLocal", value)}
            >
              <SelectTrigger id="categoriaLocal" className="mt-2">
                <SelectValue placeholder="Seleccione categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Categoría A">Categoría A</SelectItem>
                <SelectItem value="Categoría B">Categoría B</SelectItem>
                <SelectItem value="Categoría C">Categoría C</SelectItem>
                <SelectItem value="Categoría D">Categoría D</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Refrigerante (bidirectional with DescripcionInstalacionSection) */}
          <div>
            <Label htmlFor="refrigerante">Refrigerante</Label>
            <Input 
              id="refrigerante"
              className="mt-2"
              placeholder="Ej: R-448A"
              onChange={(e) => onChange(e)}
              defaultValue={formData.refrigerante || "R-448A"}
              value={formData.refrigerante || ""}
            />
          </div>
          
          {/* Composición del refrigerante */}
          <div>
            <Label htmlFor="composicionRefrigerante">Composición del refrigerante</Label>
            <Input 
              id="composicionRefrigerante"
              className="mt-2"
              placeholder="Ej: (26% R-32 / 26% R-125 / 21% R-134a / 20% R-1234yf / 7% R-1234ze)"
              onChange={(e) => onChange(e)}
              defaultValue={formData.composicionRefrigerante || "(26% R-32 / 26% R-125 / 21% R-134a / 20% R-1234yf / 7% R-1234ze)"}
              value={formData.composicionRefrigerante || ""}
            />
          </div>
          
          {/* Inflamabilidad */}
          <div>
            <Label htmlFor="inflamabilidad">Inflamabilidad</Label>
            <Select 
              defaultValue={formData.inflamabilidad || "Grupo 1"}
              onValueChange={(value) => handleSelectChange("inflamabilidad", value)}
            >
              <SelectTrigger id="inflamabilidad" className="mt-2">
                <SelectValue placeholder="Seleccione grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grupo 1">Grupo 1</SelectItem>
                <SelectItem value="Grupo 2L">Grupo 2L</SelectItem>
                <SelectItem value="Grupo 2">Grupo 2</SelectItem>
                <SelectItem value="Grupo 3">Grupo 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Toxicidad */}
          <div>
            <Label htmlFor="toxicidad">Toxicidad</Label>
            <Select 
              defaultValue={formData.toxicidad || "Grupo A"}
              onValueChange={(value) => handleSelectChange("toxicidad", value)}
            >
              <SelectTrigger id="toxicidad" className="mt-2">
                <SelectValue placeholder="Seleccione grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grupo A">Grupo A</SelectItem>
                <SelectItem value="Grupo B">Grupo B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Grupo de seguridad */}
          <div>
            <Label htmlFor="grupoSeguridad">Grupo de seguridad</Label>
            <Select 
              defaultValue={formData.grupoSeguridad || "A1"}
              onValueChange={(value) => handleSelectChange("grupoSeguridad", value)}
            >
              <SelectTrigger id="grupoSeguridad" className="mt-2">
                <SelectValue placeholder="Seleccione grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A1">A1</SelectItem>
                <SelectItem value="A2L">A2L</SelectItem>
                <SelectItem value="A2">A2</SelectItem>
                <SelectItem value="A3">A3</SelectItem>
                <SelectItem value="B1">B1</SelectItem>
                <SelectItem value="B2L">B2L</SelectItem>
                <SelectItem value="B2">B2</SelectItem>
                <SelectItem value="B3">B3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Directiva de equipos a presión */}
          <div>
            <Label htmlFor="directivaEquipos">Directiva equipos a presión</Label>
            <Input 
              id="directivaEquipos"
              className="mt-2"
              placeholder="Ej: 2"
              onChange={(e) => onChange(e)}
              defaultValue={formData.directivaEquipos || "2"}
              value={formData.directivaEquipos || ""}
            />
          </div>
          
          {/* PCA */}
          <div>
            <Label htmlFor="pca">PCA</Label>
            <Input 
              id="pca"
              className="mt-2"
              placeholder="Ej: 1387"
              onChange={(e) => onChange(e)}
              defaultValue={formData.pca || "1387"}
              value={formData.pca || ""}
            />
          </div>
          
          {/* Agotamiento de la capa de ozono */}
          <div>
            <Label htmlFor="agotamientoOzono">Agotamiento de la capa de ozono</Label>
            <Input 
              id="agotamientoOzono"
              className="mt-2"
              placeholder="Ej: 0"
              onChange={(e) => onChange(e)}
              defaultValue={formData.agotamientoOzono || "0"}
              value={formData.agotamientoOzono || ""}
            />
          </div>
          
          {/* Límite práctico */}
          <div>
            <Label htmlFor="limitePractico">Límite práctico</Label>
            <Input 
              id="limitePractico"
              className="mt-2"
              placeholder="Ej: 0.39 kg/m3"
              onChange={(e) => onChange(e)}
              defaultValue={formData.limitePractico || "0.39 kg/m3"}
              value={formData.limitePractico || ""}
            />
          </div>
          
          {/* ATEL/ODL */}
          <div>
            <Label htmlFor="atelOdl">ATEL/ODL</Label>
            <Input 
              id="atelOdl"
              className="mt-2"
              placeholder="Ej: 0.39 kg/m3"
              onChange={(e) => onChange(e)}
              defaultValue={formData.atelOdl || "0.39 kg/m3"}
              value={formData.atelOdl || ""}
            />
          </div>
          
          {/* Límite inferior de inflamabilidad */}
          <div>
            <Label htmlFor="limiteInflamabilidad">Límite inferior de inflamabilidad</Label>
            <Input 
              id="limiteInflamabilidad"
              className="mt-2"
              placeholder="Ej: NF"
              onChange={(e) => onChange(e)}
              defaultValue={formData.limiteInflamabilidad || "NF"}
              value={formData.limiteInflamabilidad || ""}
            />
          </div>
          
          {/* Temperatura de autoignición */}
          <div>
            <Label htmlFor="temperaturaAutoignicion">Temperatura de autoignición</Label>
            <Input 
              id="temperaturaAutoignicion"
              className="mt-2"
              placeholder="Ej: ND"
              onChange={(e) => onChange(e)}
              defaultValue={formData.temperaturaAutoignicion || "ND"}
              value={formData.temperaturaAutoignicion || ""}
            />
          </div>
          
          {/* Gas fluorado */}
          <div>
            <Label className="mb-2 block">¿Es gas fluorado?</Label>
            <RadioGroup 
              defaultValue={formData.gasFluorado || "SI"}
              onValueChange={(value) => handleRadioChange("gasFluorado", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SI" id="gas-fluorado-si" />
                <Label htmlFor="gas-fluorado-si">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="NO" id="gas-fluorado-no" />
                <Label htmlFor="gas-fluorado-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Nivel de instalación (bidirectional with DescripcionInstalacionSection) */}
          <div>
            <Label htmlFor="nivelInstalacion">Clasificación de la instalación</Label>
            <Select 
              defaultValue={formData.nivelInstalacion || "Nivel 1"}
              onValueChange={(value) => handleSelectChange("nivelInstalacion", value)}
            >
              <SelectTrigger id="nivelInstalacion" className="mt-2">
                <SelectValue placeholder="Seleccione nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nivel 1">Nivel 1</SelectItem>
                <SelectItem value="Nivel 2">Nivel 2</SelectItem>
                <SelectItem value="Nivel 3">Nivel 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClasificacionSection;
