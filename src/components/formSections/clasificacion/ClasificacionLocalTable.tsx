
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClasificacionLocalTableProps {
  categoriaLocal: string;
  onSelectChange: (field: string, value: string) => void;
}

const ClasificacionLocalTable = ({ 
  categoriaLocal, 
  onSelectChange 
}: ClasificacionLocalTableProps) => {
  return (
    <div className="border-b pb-4 avoid-break">
      <table className="w-full border-collapse classification-table">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border">Clasificación</th>
            <th className="text-left p-2 border">Criterio</th>
            <th className="text-left p-2 border">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border font-medium">Clasificación del local</td>
            <td className="p-2 border">Atendiendo a criterios de seguridad del local</td>
            <td className="p-2 border">
              <Select 
                value={categoriaLocal} 
                onValueChange={(value) => onSelectChange("categoriaLocal", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Categoría A">Categoría A</SelectItem>
                  <SelectItem value="Categoría B">Categoría B</SelectItem>
                  <SelectItem value="Categoría C">Categoría C</SelectItem>
                  <SelectItem value="Categoría D">Categoría D</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClasificacionLocalTable;
