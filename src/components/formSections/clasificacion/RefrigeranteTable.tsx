
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { refrigerantes } from "@/data/refrigerantsData";

interface RefrigeranteTableProps {
  sistemaData: any;
  onSelectChange: (field: string, value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RefrigeranteTable = ({ sistemaData, onSelectChange, onInputChange }: RefrigeranteTableProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">REFRIGERANTE</h4>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Parámetro</th>
              <th className="border border-gray-300 p-2 text-left">Valor</th>
              <th className="border border-gray-300 p-2 text-left">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Refrigerante</td>
              <td className="border border-gray-300 p-2">
                <Select
                  value={sistemaData.refrigerante}
                  onValueChange={(val) => onSelectChange("refrigerante", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {refrigerantes.map(r => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
              <td className="border border-gray-300 p-2">
                <Input
                  value={sistemaData.composicionRefrigerante || ""}
                  readOnly
                  className="bg-gray-50"
                />
              </td>
            </tr>
            
            {[
              ["inflamabilidad", "- Clasificación en función de su inflamabilidad:"],
              ["toxicidad", "- Clasificación en función de su toxicidad:"],
              ["grupoSeguridad", "- Grupo de seguridad:"],
              ["directivaEquipos", "- Clasificación según Directiva de Equipos a Presión:"],
              ["pca", "- Potencial de calentamiento atmosférico (PCA):"],
              ["agotamientoOzono", "- Potencial de agotamiento de la capa de ozono (PAO):"],
              ["limitePractico", "- Límite práctico admisible:"],
              ["atelOdl", "- ATEL/ODL:"],
              ["limiteInflamabilidad", "- Límite inferior de inflamabilidad (LII):"],
              ["temperaturaAutoignicion", "- Temperatura de autoignición:"],
            ].map(([field, label]) => (
              <tr key={field}>
                <td className="border border-gray-300 p-2">{label}</td>
                <td className="border border-gray-300 p-2">
                  {field === "inflamabilidad" || field === "toxicidad" ? (
                    <Select
                      value={(sistemaData as any)[field] || ""}
                      onValueChange={(val) => onSelectChange(field, val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar grupo" />
                      </SelectTrigger>
                      <SelectContent>
                        {field === "inflamabilidad" ? (
                          <>
                            <SelectItem value="Grupo 1">Grupo 1</SelectItem>
                            <SelectItem value="Grupo 2">Grupo 2</SelectItem>
                            <SelectItem value="Grupo 3">Grupo 3</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="Grupo A">Grupo A</SelectItem>
                            <SelectItem value="Grupo B">Grupo B</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={(sistemaData as any)[field] || ""}
                      readOnly
                      className="bg-gray-50"
                    />
                  )}
                </td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
            ))}

            {/* Fila para Gas Fluorado - AUTOMÁTICO basado en refrigerante */}
            <tr>
              <td className="border border-gray-300 p-2">- Gas fluorado:</td>
              <td className="border border-gray-300 p-2">
                <Input
                  value={sistemaData.gasFluorado || ""}
                  readOnly
                  className="bg-gray-50"
                  placeholder="Automático según refrigerante"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <span className="text-sm text-gray-600">
                  {sistemaData.gasFluorado === "SI" ? "✓ Aplican reglamentos de gases fluorados" : 
                   sistemaData.gasFluorado === "NO" ? "✗ No aplican reglamentos de gases fluorados" : ""}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefrigeranteTable;
