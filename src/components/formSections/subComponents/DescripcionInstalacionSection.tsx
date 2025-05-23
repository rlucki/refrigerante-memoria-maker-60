
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fan, Thermometer, Gauge, AirVent, Weight } from "lucide-react";

interface DescripcionInstalacionSectionProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectChange: (id: string, value: string) => void;
  onCalculationsChange?: (field: string, value: string) => void;
}

const DescripcionInstalacionSection = ({
  handleInputChange,
  handleTextareaChange,
  handleSelectChange,
  onCalculationsChange
}: DescripcionInstalacionSectionProps) => {
  return (
    <>
      <h3 className="text-lg font-medium mb-4">Descripción de la instalación</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="descripcionInstalacion">Descripción detallada</Label>
          <Textarea
            id="descripcionInstalacion"
            className="w-full h-48 mt-2"
            placeholder="Introduzca la descripción de la instalación frigorífica"
            onChange={handleTextareaChange}
            defaultValue={`La instalación está compuesta por varios muebles frigoríficos tipo mural y dos armarios de congelados, así como tres cámaras de conservación, un obrador y dos cámaras de congelados. Los servicios positivos se alimentan desde una central compacta positiva, mientras que los servicios negativos se alimentan desde una central compacta negativa.

Las centrales compactas frigoríficas se encuentran ubicadas dentro de una sala de máquinas no específica. Los compresores utilizados son de tipo scroll de la marca COPELAND. Dichos compresores van provistos de todos los elementos de seguridad necesarios para garantizar el funcionamiento correcto de los mismos y un mantenimiento mínimo. 

Las centrales compactas frigoríficas incorporan el condensador de aire dentro de su propio carrozado. Los ventiladores de los condensadores son radiales de conmutación electrónica (EC) y medio nivel sonoro.

El refrigerante condensado se almacena en su correspondiente recipiente de líquido individual incorporado dentro de las propias máquinas descritas.  
Se ha instalado un evaporador en cada cámara, correctamente dimensionado a sus necesidades. El desescarche de los evaporadores se realiza por resistencias eléctricas.
El gas utilizado en la instalación es R-448A. La carga de refrigerante para la central compacta positiva es de 50 kg, mientras que la carga de refrigerante para la central compacta negativa es de 35 kg. Por lo que la instalación cuenta con una carga total de 85 kg de refrigerante R-448A repartida en dos sistemas diferentes.`}
          />
        </div>
        <div className="flex items-center gap-2">
          <Fan size={18} />
          <Label htmlFor="tipoVentilador">Tipo de ventilador</Label>
          <Select
            onValueChange={(value) => handleSelectChange("tipoVentilador", value)}
            defaultValue="Helicoidal"
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Seleccionar tipo de ventilador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Helicoidal">Helicoidal</SelectItem>
              <SelectItem value="Axial">Axial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer size={18} />
          <Label htmlFor="temperaturaDescarga">Temperatura de descarga (ºC)</Label>
          <Input 
            id="temperaturaDescarga"
            type="number"
            className="mt-2"
            placeholder="Ej: 124.8"
            onChange={handleInputChange}
            defaultValue="124.8"
          />
        </div>
        <div className="flex items-center gap-2">
          <Gauge size={18} />
          <Label htmlFor="presionDescarga">Presión de descarga (bar)</Label>
          <Input 
            id="presionDescarga"
            type="number"
            className="mt-2"
            step="0.1"
            placeholder="Ej: 93.7"
            onChange={handleInputChange}
            defaultValue="93.7"
          />
        </div>
        <div className="flex items-center gap-2">
          <AirVent size={18} />
          <Label htmlFor="ubicacionGascooler">Ubicación gascooler</Label>
          <Input 
            id="ubicacionGascooler"
            className="mt-2"
            placeholder="Indique la ubicación del gascooler"
            onChange={handleInputChange}
            defaultValue="Cubierta"
          />
        </div>
        <div>
          <Label htmlFor="tieneIHX">Intercambiador IHX</Label>
          <RadioGroup 
            onValueChange={(value) => {
              handleSelectChange("tieneIHX", value);
              if (onCalculationsChange) onCalculationsChange("tieneIHX", value);
            }}
            defaultValue="no"
            className="flex gap-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="si" id="tieneIHX-si" />
              <Label htmlFor="tieneIHX-si">Sí</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="tieneIHX-no" />
              <Label htmlFor="tieneIHX-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="tieneDesrecalentador">Desrecalentador</Label>
          <RadioGroup 
            onValueChange={(value) => {
              handleSelectChange("tieneDesrecalentador", value);
              if (onCalculationsChange) onCalculationsChange("tieneDesrecalentador", value);
            }}
            defaultValue="no"
            className="flex gap-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="si" id="tieneDesrecalentador-si" />
              <Label htmlFor="tieneDesrecalentador-si">Sí</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="tieneDesrecalentador-no" />
              <Label htmlFor="tieneDesrecalentador-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex items-center gap-2">
          <Weight size={18} />
          <Label htmlFor="kilosRefrigerante">Kilos de refrigerante según instalador (kg)</Label>
          <Input 
            id="kilosRefrigerante"
            type="number"
            step="0.1"
            className="mt-2"
            placeholder="Indique la cantidad en kg"
            onChange={handleInputChange}
            defaultValue="85"
          />
        </div>
      </div>
    </>
  );
};

export default DescripcionInstalacionSection;
