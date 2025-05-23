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

import { useRefrigerante } from "@/context/RefrigeranteContext";
import { REFRIGERANTES, REFRIGERANTES_DATA } from "@/constants/refrigerantes";

interface DatosTecnicosSectionProps {
  onChange?: (field: string, value: any) => void;
}

const DatosTecnicosSection = ({ onChange }: DatosTecnicosSectionProps) => {
  // Obtener refrigerante central
  const { seleccionado, setSeleccionado } = useRefrigerante();
  const propsRef = REFRIGERANTES_DATA[seleccionado] || {};

  // Notificar al padre cada vez que cambie el refrigerante
  useEffect(() => {
    if (!onChange) return;
    // Campos derivados del refrigerante
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

  // Handler para campos libres
  const handleChange = (field: string, value: any) => {
    onChange?.(field, value);
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">7.- DATOS TÉCNICOS</h3>

        {/* Sección Refrigerante centralizada */}
        <Separator className="my-6" />
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">REFRIGERANTE</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {REFRIGERANTES.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {[
              ["composicion", "Composición del refrigerante", propsRef.composicion],
              ["inflamabilidad", "Inflamabilidad", propsRef.inflamabilidad],
              ["toxicidad", "Toxicidad", propsRef.toxicidad],
              ["grupoSeguridad", "Grupo de seguridad", propsRef.grupoSeguridad],
              ["directivaEquipos", "Directiva Equipos a Presión", propsRef.directivaEquipos],
              ["pca", "PCA", propsRef.pca],
              ["agotamientoOzono", "PAO", propsRef.agotamientoOzono],
              ["limitePractico", "Límite práctico", propsRef.limitePractico],
              ["atelOdl", "ATEL/ODL", propsRef.atelOdl],
              ["limiteInflamabilidad", "Límite inflamabilidad", propsRef.limiteInflamabilidad],
              ["temperaturaAutoignicion", "Temperatura autoignición", propsRef.temperaturaAutoignicion],
              ["gasFluorado", "Gas fluorado", propsRef.gasFluorado],
            ].map(([key, label, val]) => (
              <div className="space-y-2" key={key as string}>
                <Label htmlFor={key as string}>{label}</Label>
                <Input
                  id={key as string}
                  value={val || ""}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>

        {/* Otras secciones se quedarían igual, usando handleChange si son inputs libres */}
      </div>
    </Card>
  );
};

export default DatosTecnicosSection;
