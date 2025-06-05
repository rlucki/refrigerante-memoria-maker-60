
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DatosInstaladorSection from "./DatosInstaladorSection";
import DatosTecnicosSection from "./DatosTecnicosSection";
import NormativaSection from "./NormativaSection";
import ClasificacionSection from "./ClasificacionSection";
import useRefrigeranteData, { SistemaData } from "@/hooks/useRefrigeranteData";
import ExcelCalculationsForm from "../ExcelCalculationsForm";

interface DatosInstalacionSectionProps {
  onChange?: (field: string, value: any) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
  gasFluorado?: string;
  codigoPostal?: string;
  onNormativaChange?: (field: string, value: any) => void;
}

const DatosInstalacionSection = ({
  onChange, 
  onCalculationsChange, 
  onExcelUpload, 
  gasFluorado,
  codigoPostal,
  onNormativaChange 
}: DatosInstalacionSectionProps) => {
  const [formData, setFormData] = useState({
    instalador: "GESTÉCNICA INTEGRAL 10. S.L.",
    cif_instalacion: "B76501931",
    n_registro_instalacion: "38020755",
    direccion_instalador: "C/ ISAAC PERAL, Nº 3, NAVE 5",
    poblacion_instalacion: "EL ROSARIO",
    cp_instalacion: "38109",
    telefono_instalacion: "922618202",
    mail_instalacion: "gestecnicaintegral10@gestecnicaintegral10.es",
    direccionInstalacion: "AVDA. BLAS PÉREZ GONZÁLEZ, 4",
    poblacionInstalacion: "PUERTO DE LA CRUZ",
    cpInstalacion: "35610",
    provinciaInstalacion: "SANTA CRUZ DE TENERIFE",
    telefonoInstalacion: "922443768",
    num_inscripcion: "IF202400127",
    fecha_inscripcion: "2024-09-23",
    gasFluorado: "SI"
  });

  // Update gasFluorado when it changes from parent
  useEffect(() => {
    if (gasFluorado && gasFluorado !== formData.gasFluorado) {
      console.log("🔄 Updating gasFluorado in DatosInstalacionSection:", gasFluorado);
      setFormData(prev => ({ ...prev, gasFluorado }));
    }
  }, [gasFluorado]);

  const handleInputChange = (field: string, value: any) => {
    console.log("🔄 DatosInstalacionSection field change:", field, value);
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (onChange) {
      onChange(field, value);
    }
  };

  const handleGasFluoradoChange = (field: string, value: string) => {
    console.log("🔄 Gas fluorado change in DatosInstalacionSection:", field, value);
    
    setFormData(prev => ({ ...prev, gasFluorado: value }));
    
    if (onChange) {
      onChange("gasFluorado", value);
      onChange("aplicaGasesFluorados", value);
    }
  };

  // Handlers for specific component signatures
  const handleInstaladorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e.target.id, e.target.value);
  };

  const handleTecnicosChange = (e: React.ChangeEvent<HTMLInputElement> | { id: string; value: string }) => {
    if ('target' in e) {
      handleInputChange(e.target.id, e.target.value);
    } else {
      handleInputChange(e.id, e.value);
    }
  };

  const {
    sistemaData,
    handleSelectChange,
    handleInputChange: handleRefrigeranteInputChange
  } = useRefrigeranteData({
    onChange: handleTecnicosChange,
    onGasFluoradoChange: handleGasFluoradoChange
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="instalacion" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="instalacion">2. Datos Instalación</TabsTrigger>
          <TabsTrigger value="instalador">3. Datos Instalador</TabsTrigger>
          <TabsTrigger value="tecnicos">4. Datos Técnicos</TabsTrigger>
        </TabsList>

        <TabsContent value="instalacion" className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">2.- DATOS DE LA INSTALACIÓN</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="direccionInstalacion">Dirección de la instalación</Label>
                  <Input 
                    id="direccionInstalacion" 
                    placeholder="Dirección de la instalación"
                    value={formData.direccionInstalacion}
                    onChange={(e) => handleInputChange("direccionInstalacion", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="poblacionInstalacion">Población</Label>
                  <Input 
                    id="poblacionInstalacion" 
                    placeholder="Población"
                    value={formData.poblacionInstalacion}
                    onChange={(e) => handleInputChange("poblacionInstalacion", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cpInstalacion">C.P.</Label>
                  <Input 
                    id="cpInstalacion" 
                    placeholder="Código postal"
                    value={formData.cpInstalacion}
                    onChange={(e) => handleInputChange("cpInstalacion", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="provinciaInstalacion">Provincia</Label>
                  <Input 
                    id="provinciaInstalacion" 
                    placeholder="Provincia"
                    value={formData.provinciaInstalacion}
                    onChange={(e) => handleInputChange("provinciaInstalacion", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefonoInstalacion">Teléfono</Label>
                  <Input 
                    id="telefonoInstalacion" 
                    placeholder="Teléfono"
                    value={formData.telefonoInstalacion}
                    onChange={(e) => handleInputChange("telefonoInstalacion", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="num_inscripcion">Número de inscripción</Label>
                  <Input 
                    id="num_inscripcion" 
                    placeholder="Número de inscripción"
                    value={formData.num_inscripcion}
                    onChange={(e) => handleInputChange("num_inscripcion", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fecha_inscripcion">Fecha de inscripción</Label>
                  <Input 
                    id="fecha_inscripcion" 
                    placeholder="Fecha de inscripción"
                    type="date"
                    value={formData.fecha_inscripcion}
                    onChange={(e) => handleInputChange("fecha_inscripcion", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>

          <ExcelCalculationsForm />
          
          <NormativaSection
            aplicaGasesFluorados={formData.gasFluorado}
            codigoPostal={formData.cpInstalacion}
            onNormativaChange={onNormativaChange}
          />
        </TabsContent>

        <TabsContent value="instalador" className="space-y-6">
          <DatosInstaladorSection onChange={handleInstaladorChange} />
          <ClasificacionSection
            sistemaData={sistemaData}
            onSelectChange={handleSelectChange}
          />
        </TabsContent>

        <TabsContent value="tecnicos" className="space-y-6">
          <DatosTecnicosSection
            sistemaData={sistemaData}
            onSelectChange={handleSelectChange}
            onInputChange={handleRefrigeranteInputChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatosInstalacionSection;
