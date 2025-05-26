
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClasificacionSistemaTableProps {
  metodoEnfriamiento: string;
  seguridadSistema: string;
  gasFluorado: string;
  onSelectChange: (field: string, value: string) => void;
}

const ClasificacionSistemaTable = ({ 
  metodoEnfriamiento, 
  seguridadSistema, 
  gasFluorado,
  onSelectChange 
}: ClasificacionSistemaTableProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">CLASIFICACIÓN DEL SISTEMA</h4>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Clasificación del sistema</th>
              <th className="border border-gray-300 p-2 text-left">Criterio</th>
              <th className="border border-gray-300 p-2 text-left">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Clasificación del sistema</td>
              <td className="border border-gray-300 p-2">Atendiendo al método de enfriamiento</td>
              <td className="border border-gray-300 p-2">
                <Select
                  value={metodoEnfriamiento}
                  onValueChange={(val) => onSelectChange("metodoEnfriamiento", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sistema directo">Sistema directo</SelectItem>
                    <SelectItem value="Sistema indirecto">Sistema indirecto</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Clasificación del sistema</td>
              <td className="border border-gray-300 p-2">Atendiendo a criterios de seguridad del sistema</td>
              <td className="border border-gray-300 p-2">
                <Select
                  value={seguridadSistema}
                  onValueChange={(val) => onSelectChange("seguridadSistema", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tipo 1">Tipo 1</SelectItem>
                    <SelectItem value="Tipo 2">Tipo 2</SelectItem>
                    <SelectItem value="Tipo 3">Tipo 3</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClasificacionSistemaTable;
