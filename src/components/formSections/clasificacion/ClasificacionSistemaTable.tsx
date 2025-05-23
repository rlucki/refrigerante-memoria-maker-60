
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClasificacionSistemaTableProps {
  metodoEnfriamiento: string;
  seguridadSistema: string;
  onSelectChange: (field: string, value: string) => void;
}

const ClasificacionSistemaTable = ({ 
  metodoEnfriamiento, 
  seguridadSistema, 
  onSelectChange 
}: ClasificacionSistemaTableProps) => {
  return (
    <div className="border-b pb-4 avoid-break">
      <table className="w-full border-collapse classification-table">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border">Clasificación del sistema</th>
            <th className="text-left p-2 border">Criterio</th>
            <th className="text-left p-2 border">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border font-medium" rowSpan={2}>Clasificación del sistema</td>
            <td className="p-2 border">Atendiendo al método de enfriamiento</td>
            <td className="p-2 border">
              <Select 
                value={metodoEnfriamiento} 
                onValueChange={(value) => onSelectChange("metodoEnfriamiento", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sistema directo">Sistema directo</SelectItem>
                  <SelectItem value="Sistema indirecto">Sistema indirecto</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
          <tr>
            <td className="p-2 border">Atendiendo a criterios de seguridad del sistema</td>
            <td className="p-2 border">
              <Select 
                value={seguridadSistema} 
                onValueChange={(value) => onSelectChange("seguridadSistema", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tipo 1">Tipo 1</SelectItem>
                  <SelectItem value="Tipo 2">Tipo 2</SelectItem>
                  <SelectItem value="Tipo 3">Tipo 3</SelectItem>
                  <SelectItem value="Tipo 4">Tipo 4</SelectItem>
                  <SelectItem value="Tipos 1 y 2">Tipos 1 y 2</SelectItem>
                  <SelectItem value="Tipos 1 y 3">Tipos 1 y 3</SelectItem>
                  <SelectItem value="Tipos 2 y 3">Tipos 2 y 3</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClasificacionSistemaTable;
