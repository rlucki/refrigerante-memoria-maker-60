import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { refrigerantes } from "@/data/refrigerantsData";

interface RefrigeranteTableProps {
  sistemaData: any;
  onSelectChange: (field: string, value: string) => void;
}

const RefrigeranteTable: React.FC<RefrigeranteTableProps> = ({
  sistemaData,
  onSelectChange,
}) => {
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
            {/* Selección de refrigerante */}
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
                    {refrigerantes.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
              <td className="border border-gray-300 p-2">
                <Input
                  value={sistemaData.composicion || ""}
                  readOnly
                  className="bg-gray-50"
                />
              </td>
            </tr>

            {/* Campos autocompletados o editables */}
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
                            <SelectItem value="Grupo 1">Grupo&nbsp;1</SelectItem>
                            <SelectItem value="Grupo 2L">Grupo&nbsp;2L</SelectItem>
                            <SelectItem value="Grupo 2">Grupo&nbsp;2</SelectItem>
                            <SelectItem value="Grupo 3">Grupo&nbsp;3</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="Grupo A">Grupo&nbsp;A</SelectItem>
                            <SelectItem value="Grupo B">Grupo&nbsp;B</SelectItem>
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
                <td className="border border-gray-300 p-2" />
              </tr>
            ))}

            {/* Gas fluorado: calculado */}
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
                {sistemaData.gasFluorado === "SI" && (
                  <span className="text-sm text-green-700">
                    ✓ Aplican reglamentos de gases fluorados
                  </span>
                )}
                {sistemaData.gasFluorado === "NO" && (
                  <span className="text-sm text-red-700">
                    ✗ No aplican reglamentos de gases fluorados
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefrigeranteTable;
