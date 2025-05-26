
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";

interface ExcelCalculationsFormProps {
  onChange?: (field: string, value: string) => void;
  onCalculationsChange?: (field: string, value: string) => void;
}

const ExcelCalculationsForm: React.FC<ExcelCalculationsFormProps> = ({ onChange, onCalculationsChange }) => {
  const handleSelectChange = (field: string, value: string) => {
    if (onChange) {
      onChange(field, value);
    }
    if (onCalculationsChange) {
      onCalculationsChange(field, value);
    }
  };

  const handleRadioChange = (field: string, value: string) => {
    if (onChange) {
      onChange(field, value);
    }
    if (onCalculationsChange) {
      onCalculationsChange(field, value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
    if (onCalculationsChange) {
      onCalculationsChange(e.target.id, e.target.value);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-6">Configuración de Compresores y Equipos</h2>
        
        {/* Compresor MT */}
        <div className="grid gap-2">
          <Label htmlFor="compresorMT">Compresor MT</Label>
          <Select 
            onValueChange={(value) => handleSelectChange("compresorMT", value)}
            defaultValue="0"
          >
            <SelectTrigger id="compresorMT" className="w-full">
              <SelectValue placeholder="Seleccionar número" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Compresor BT */}
        <div className="grid gap-2">
          <Label htmlFor="compresorBT">Compresor BT</Label>
          <Select 
            onValueChange={(value) => handleSelectChange("compresorBT", value)}
            defaultValue="0"
          >
            <SelectTrigger id="compresorBT" className="w-full">
              <SelectValue placeholder="Seleccionar número" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Compresor Paralelo */}
        <div className="grid gap-2">
          <Label htmlFor="compresorParalelo">Compresor Paralelo</Label>
          <Select 
            onValueChange={(value) => handleSelectChange("compresorParalelo", value)}
            defaultValue="0"
          >
            <SelectTrigger id="compresorParalelo" className="w-full">
              <SelectValue placeholder="Seleccionar número" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Ubicación gascooler */}
        <div className="grid gap-2">
          <Label htmlFor="ubicacionGascooler">¿Dónde está situado el gascooler?</Label>
          <Input 
            id="ubicacionGascooler" 
            onChange={handleInputChange} 
            placeholder="Especifique la ubicación" 
          />
        </div>
        
        {/* Intercambiador de placas */}
        <div className="grid gap-2">
          <Label>¿Hay intercambiador de placas IHX?</Label>
          <RadioGroup 
            onValueChange={(value) => handleRadioChange("tieneIHX", value)} 
            defaultValue="no"
            className="flex gap-6"
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
        <div className="grid gap-2">
          <Label>¿Hay desrecalentador?</Label>
          <RadioGroup 
            onValueChange={(value) => handleRadioChange("tieneDesrecalentador", value)} 
            defaultValue="no"
            className="flex gap-6"
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
      </div>
    </Card>
  );
};

export default ExcelCalculationsForm;
