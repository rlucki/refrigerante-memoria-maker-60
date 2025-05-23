
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClasificacionInstalacionTableProps {
  nivelInstalacion: string;
  documentoNecesario: string;
  onSelectChange: (field: string, value: string) => void;
}

const ClasificacionInstalacionTable = ({
  nivelInstalacion,
  documentoNecesario,
  onSelectChange
}: ClasificacionInstalacionTableProps) => {
  return (
    <div className="avoid-break">
      <table className="w-full border-collapse classification-table">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border">Parámetro</th>
            <th className="text-left p-2 border" colSpan={2}>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border font-medium">Clasificación de la Instalación</td>
            <td className="p-2 border" colSpan={2}>
              <Select 
                value={nivelInstalacion} 
                onValueChange={(value) => onSelectChange("nivelInstalacion", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nivel 1">Nivel 1</SelectItem>
                  <SelectItem value="Nivel 2">Nivel 2</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
          <tr>
            <td className="p-2 border font-medium">Documento necesario</td>
            <td className="p-2 border" colSpan={2}>
              <Select 
                value={documentoNecesario} 
                onValueChange={(value) => onSelectChange("documentoNecesario", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar documento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Memoria">Memoria</SelectItem>
                  <SelectItem value="Proyecto">Proyecto</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClasificacionInstalacionTable;
