
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatosTitularSection from "./formSections/DatosTitularSection";
import DatosInstaladorSection from "./formSections/DatosInstaladorSection";
import DatosInstalacionSection from "./formSections/DatosInstalacionSection";
import DatosTecnicosSection from "./formSections/DatosTecnicosSection";
import NormativaSection from "./formSections/NormativaSection";
import ClasificacionSection from "./formSections/ClasificacionSection";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface MemoriaTecnicaFormProps {
  onSubmit: () => void;
  onChange?: (field: string, value: any) => void;
  onWordTemplateUploaded?: (file: File) => void;
  onGenerateWordDocument?: () => void;
  hasWordTemplate?: boolean;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const MemoriaTecnicaForm = ({ 
  onSubmit, 
  onChange, 
  activeTab = "titular",
  setActiveTab
}: MemoriaTecnicaFormProps) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
  
  // Use external tab state if provided, otherwise use internal
  const currentTab = setActiveTab ? activeTab : internalActiveTab;
  const updateTab = setActiveTab || setInternalActiveTab;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para validar y procesar todos los datos del formulario
    onSubmit();
  };

  // Modificamos esta función para manejar cualquier tipo de evento de cambio
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => {
    if (onChange) {
      if ('target' in e) {
        onChange(e.target.id, e.target.value);
      } else {
        onChange(e.id, e.value);
      }
    }
  };
  
  // Función para manejar cambios en objetos complejos como la normativa
  const handleComplexChange = (field: string, value: any) => {
    if (onChange) {
      onChange(field, value);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue={currentTab} value={currentTab} onValueChange={updateTab} className="mb-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="titular">Datos Titular</TabsTrigger>
          <TabsTrigger value="instalador">Datos Instalador</TabsTrigger>
          <TabsTrigger value="instalacion">Datos Instalación</TabsTrigger>
          <TabsTrigger value="datos_proyecto">Datos Proyecto</TabsTrigger>
          <TabsTrigger value="descripcion_clasificacion">Descripción y Clasificación</TabsTrigger>
        </TabsList>
        
        <TabsContent value="titular" className="mt-6">
          <DatosTitularSection onChange={handleInputChange} />
        </TabsContent>
        
        <TabsContent value="instalador" className="mt-6">
          <DatosInstaladorSection onChange={handleInputChange} />
        </TabsContent>
        
        <TabsContent value="instalacion" className="mt-6">
          <DatosInstalacionSection onChange={handleInputChange} />
        </TabsContent>
        
        <TabsContent value="datos_proyecto" className="mt-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Datos del Proyecto</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tipoInstalacion">Tipo de instalación</Label>
                  <Input 
                    id="tipoInstalacion"
                    className="mt-2"
                    placeholder="Ej: Supermercado"
                    onChange={handleInputChange}
                    defaultValue="Supermercado"
                  />
                </div>
                <div>
                  <Label htmlFor="nombreProyecto">Nombre del proyecto</Label>
                  <Input 
                    id="nombreProyecto"
                    className="mt-2"
                    placeholder="Ej: Costa del Silencio (Arona)"
                    onChange={handleInputChange}
                    defaultValue="Costa del Silencio (Arona)"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="descripcion_clasificacion" className="mt-6">
          <div className="space-y-6">
            {/* Descripción de la instalación */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Descripción de la instalación</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="descripcionInstalacion">Descripción detallada</Label>
                  <textarea
                    id="descripcionInstalacion"
                    className="w-full h-48 p-4 border rounded-md mt-2"
                    placeholder="Introduzca la descripción de la instalación frigorífica"
                    onChange={(e) => handleComplexChange("descripcionInstalacion", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="nivelInstalacion">Nivel de instalación</Label>
                  <select
                    id="nivelInstalacion"
                    className="w-full p-2 border rounded-md mt-2"
                    onChange={(e) => handleComplexChange("nivelInstalacion", e.target.value)}
                  >
                    <option value="Nivel 1">Nivel 1</option>
                    <option value="Nivel 2">Nivel 2</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Clasificación */}
            <ClasificacionSection onChange={handleComplexChange} />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between gap-4 mt-8">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => {
            const prevTab = {
              "titular": "titular",
              "instalador": "titular",
              "instalacion": "instalador",
              "datos_proyecto": "instalacion",
              "descripcion_clasificacion": "datos_proyecto",
            }[currentTab];
            updateTab(prevTab);
          }}
          disabled={currentTab === "titular"}
        >
          Anterior
        </Button>
        
        <Button 
          type="button"
          onClick={() => {
            const nextTab = {
              "titular": "instalador",
              "instalador": "instalacion",
              "instalacion": "datos_proyecto",
              "datos_proyecto": "descripcion_clasificacion",
              "descripcion_clasificacion": "descripcion_clasificacion",
            }[currentTab];
            updateTab(nextTab);
          }}
          disabled={currentTab === "descripcion_clasificacion"}
        >
          Siguiente
        </Button>
      </div>
    </form>
  );
};

export default MemoriaTecnicaForm;
