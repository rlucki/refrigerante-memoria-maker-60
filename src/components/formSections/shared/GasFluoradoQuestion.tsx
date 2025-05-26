
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GasFluoradoQuestionProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
}

const GasFluoradoQuestion = ({ 
  value, 
  onChange, 
  label = "¿Es refrigerante fluorado?",
  disabled = false 
}: GasFluoradoQuestionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="gas_fluorado">{label}</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="SI">SI</SelectItem>
          <SelectItem value="NO">NO</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GasFluoradoQuestion;
