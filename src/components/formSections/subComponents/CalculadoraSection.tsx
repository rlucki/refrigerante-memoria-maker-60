
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalculadoraSectionProps {
  onCalculationsChange?: (field: string, value: string) => void;
}

const CalculadoraSection = ({ onCalculationsChange }: CalculadoraSectionProps) => {
  const handleCalcChange = (field: string, value: string) => {
    if (onCalculationsChange) {
      onCalculationsChange(field, value);
    }
  };

  return (
    <>
      <h3 className="text-lg font-medium mb-4">Configuración de Compresores y Equipos</h3>
      <div className="space-y-6">
        {/* Compresor MT */}
        <div className="grid gap-2">
          <Label htmlFor="compresorMT">Compresor MT</Label>
          <Select 
            onValueChange={(value) => handleCalcChange("compresorMT", value)}
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
            onValueChange={(value) => handleCalcChange("compresorBT", value)}
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
            onValueChange={(value) => handleCalcChange("compresorParalelo", value)}
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
      </div>
    </>
  );
};

export default CalculadoraSection;
