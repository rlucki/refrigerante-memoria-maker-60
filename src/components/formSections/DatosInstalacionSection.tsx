import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NormativaSection from "./NormativaSection";

interface DatosInstalacionSectionProps {
  onChange?: (field: string, value: any) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
  gasFluorado: string;
  codigoPostal: string;
}

const DatosInstalacionSection: React.FC<DatosInstalacionSectionProps> = ({
  onChange,
  onCalculationsChange,
  onExcelUpload,
  gasFluorado,
  codigoPostal,
}) => {
  useEffect(() => {
    onChange?.("cpInstalacion", codigoPostal);
  }, [codigoPostal, onChange]);

  const fields = [
    { id: "nombreInstalacion", label: "Nombre de la instalación", defaultValue: "Instalación frigorífica DINOSOL Costa del Silencio (Arona)" },
    { id: "ubicacion", label: "Ubicación", defaultValue: "C/ EL MOJÓN, S/N" },
    { id: "poblacionInstalacion", label: "Población", defaultValue: "COSTA DEL SILENCIO (ARONA)" },
    { id: "provinciaInstalacion", label: "Provincia", defaultValue: "SANTA CRUZ DE TENERIFE" },
    { id: "cpInstalacion", label: "C.P.", defaultValue: codigoPostal },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">2.- DATOS DE LA INSTALACIÓN</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(field => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  value={field.id === "cpInstalacion" ? codigoPostal : undefined}
                  defaultValue={field.defaultValue}
                  onChange={e => onChange?.(e.target.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Separator className="my-6" />

      <NormativaSection
        gasFluorado={gasFluorado}
        codigoPostal={codigoPostal}
        onNormativaChange={(field, value) => onChange?.(field, value)}
      />
    </div>
  );
};

export default DatosInstalacionSection;