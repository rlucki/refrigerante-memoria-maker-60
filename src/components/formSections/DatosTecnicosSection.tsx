import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Hook y datos del refrigerante centralizados
import { useRefrigerante } from "../../hooks/useRefrigerante"; // Ruta relativa a tu hook
import { refrigerantesData, refrigerantes } from "../../data/refrigerantesData"; // Ruta relativa a tu fichero de datos

interface DatosTecnicosSectionProps {
  onChange?: (field: string, value: any) => void;
}

const DatosTecnicosSection = ({ onChange }: DatosTecnicosSectionProps) => {
  // Obtener refrigerante central
  const { seleccionado, setSeleccionado } = useRefrigerante();
  const propsRef = refrigerantesData[seleccionado] || {};

  // Notificar al padre cada vez que cambie el refrigerante
  useEffect(() => {
    if (!onChange) return;
    const derived = {
      refrigerante: seleccionado,
      composicionRefrigerante: propsRef.composicion,
      inflamabilidad: propsRef.inflamabilidad,
      toxicidad: propsRef.toxicidad,
      grupoSeguridad: propsRef.grupoSeguridad,
      directivaEquipos: propsRef.directivaEquipos,
      pca: propsRef.pca,
      agotamientoOzono: propsRef.agotamientoOzono,
      limitePractico: propsRef.limitePractico,
      atelOdl: propsRef.atelOdl,
      limiteInflamabilidad: propsRef.limiteInflamabilidad,
      temperaturaAutoignicion: propsRef.temperaturaAutoignicion,
      gasFluorado: propsRef.gasFluorado,
    };
    Object.entries(derived).forEach(([field, value]) => onChange(field, value));
  }, [seleccionado]);

  // Handler para otros campos
  const handleChange = (field: string, value: any) => {
    onChange?.(field, value);
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">7.- DATOS TÉCNICOS</h3>

        {/* Cámaras, Compresores, etc. */}
        {/* ... permanece igual, usando handleChange para onChange ... */}

        <Separator className="my-6" />
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">REFRIGERANTE</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Selector global */}
            <div className="space-y-2">
              <Label htmlFor="refrigerante_select">Identificación del refrigerante</Label>
              <Select
                id="refrigerante_select"
                value={seleccionado}
                onValueChange={setSeleccionado}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar refrigerante" />
                </SelectTrigger>
                <SelectContent>
                  {refrigerantes.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Campos derivadas del refrigerante */}
            {( [
                ["composicion", "Composición del refrigerante"],
                ["inflamabilidad", "Inflamabilidad"],
                ["toxicidad", "Toxicidad"],
                ["grupoSeguridad", "Grupo de seguridad"],
                ["directivaEquipos", "Directiva Equipos a Presión"],
                ["pca", "PCA"],
                ["agotamientoOzono", "PAO"],
                ["limitePractico", "Límite práctico"],
                ["atelOdl", "ATEL/ODL"],
                ["limiteInflamabilidad", "Límite inflamabilidad"],
                ["temperaturaAutoignicion", "Temperatura autoignición"],
                ["gasFluorado", "Gas fluorado"]
            ] as Array<[string, string]> ).map(([key, label]) => (
              <div className="space-y-2" key={key}>
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  value={(propsRef as any)[key] ?? ""}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DatosTecnicosSection;
