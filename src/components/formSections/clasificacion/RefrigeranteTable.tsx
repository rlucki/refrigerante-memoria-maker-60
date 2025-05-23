
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { refrigerantes, inflamabilidadOpciones, toxicidadOpciones } from "@/data/refrigerantsData";

interface RefrigeranteTableProps {
  sistemaData: {
    refrigerante: string;
    composicionRefrigerante: string;
    inflamabilidad: string;
    toxicidad: string;
    grupoSeguridad: string;
    directivaEquipos: string;
    pca: string;
    agotamientoOzono: string;
    limitePractico: string;
    atelOdl: string;
    limiteInflamabilidad: string;
    temperaturaAutoignicion: string;
    gasFluorado: string;
  };
  onSelectChange: (field: string, value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RefrigeranteTable = ({ sistemaData, onSelectChange, onInputChange }: RefrigeranteTableProps) => {
  return (
    <div className="border-b pb-4 classification-section">
      <table className="w-full border-collapse classification-table">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border">Parámetro</th>
            <th className="text-left p-2 border">Valor</th>
            <th className="text-left p-2 border">Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border font-medium">Refrigerante</td>
            <td className="p-2 border">
              <Select 
                value={sistemaData.refrigerante} 
                onValueChange={(value) => onSelectChange("refrigerante", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar refrigerante" />
                </SelectTrigger>
                <SelectContent>
                  {refrigerantes.map((ref) => (
                    <SelectItem key={ref} value={ref}>
                      {ref}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </td>
            <td className="p-2 border">
              <Input
                id="composicionRefrigerante"
                value={sistemaData.composicionRefrigerante}
                onChange={onInputChange}
                className="w-full"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="p-2 border">- Clasificación en función de su inflamabilidad:</td>
            <td className="p-2 border" colSpan={2}>
              <Select 
                value={sistemaData.inflamabilidad}
                onValueChange={(value) => onSelectChange("inflamabilidad", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar grupo" />
                </SelectTrigger>
                <SelectContent>
                  {inflamabilidadOpciones.map((opcion) => (
                    <SelectItem key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </td>
          </tr>
          <tr>
            <td className="p-2 border">- Clasificación en función de su toxicidad:</td>
            <td className="p-2 border" colSpan={2}>
              <Select 
                value={sistemaData.toxicidad} 
                onValueChange={(value) => onSelectChange("toxicidad", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar grupo" />
                </SelectTrigger>
                <SelectContent>
                  {toxicidadOpciones.map((opcion) => (
                    <SelectItem key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </td>
          </tr>
          <tr>
            <td className="p-2 border">- Grupo de seguridad:</td>
            <td className="p-2 border" colSpan={2}>
              <Input
                id="grupoSeguridad"
                value={sistemaData.grupoSeguridad}
                onChange={onInputChange}
                className="w-full"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="p-2 border">- Clasificación según Directiva de Equipos a Presión:</td>
            <td className="p-2 border" colSpan={2}>
              <Input
                id="directivaEquipos"
                value={sistemaData.directivaEquipos}
                onChange={onInputChange}
                className="w-full"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="p-2 border">- Potencial de calentamiento atmosférico (PCA):</td>
            <td className="p-2 border" colSpan={2}>
              <Input
                id="pca"
                value={sistemaData.pca}
                onChange={onInputChange}
                className="w-full"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="p-2 border">- Potencial de agotamiento de la capa de ozono (PAO):</td>
            <td className="p-2 border" colSpan={2}>
              <Input
                id="agotamientoOzono"
                value={sistemaData.agotamientoOzono}
                onChange={onInputChange}
                className="w-full"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="p-2 border">- Límite práctico admisible:</td>
            <td className="p-2 border" colSpan={2}>
              <Input
                id="limitePractico"
                value={sistemaData.limitePractico}
                onChange={onInputChange}
                className="w-full"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="p-2 border">- ATEL/ODL:</td>
            <td className="p-2 border" colSpan={2}>
              <Input
                id="atelOdl"
                value={sistemaData.atelOdl}
                onChange={onInputChange}
                className="w-full"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="p-2 border">- Límite inferior de inflamabilidad (LII):</td>
            <td className="p-2 border" colSpan={2}>
              <Input
                id="limiteInflamabilidad"
                value={sistemaData.limiteInflamabilidad}
                onChange={onInputChange}
                className="w-full"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="p-2 border">- Temperatura de autoignición:</td>
            <td className="p-2 border" colSpan={2}>
              <Input
                id="temperaturaAutoignicion"
                value={sistemaData.temperaturaAutoignicion}
                onChange={onInputChange}
                className="w-full"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="p-2 border">- Gas fluorado:</td>
            <td className="p-2 border" colSpan={2}>
              <Select 
                value={sistemaData.gasFluorado} 
                onValueChange={(value) => onSelectChange("gasFluorado", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SI">SI</SelectItem>
                  <SelectItem value="NO">NO</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RefrigeranteTable;
