
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
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
  
  // Adapter function for ClasificacionSection - this resolves the type mismatch
  const handleClasificacionChange = (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => {
    if (onChange) {
      if ('target' in e) {
        onChange(e.target.id, e.target.value);
      } else {
        onChange(e.id, e.value);
      }
    }
  };

  // Create an adapter function to match the expected signature
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
  };

  // Create an adapter function for select elements
  const handleSelectChange = (id: string, value: string) => {
    if (onChange) {
      onChange(id, value);
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
                  <Textarea
                    id="descripcionInstalacion"
                    className="w-full h-48 mt-2"
                    placeholder="Introduzca la descripción de la instalación frigorífica"
                    onChange={handleTextareaChange}
                  />
                </div>
                <div>
                  <Label htmlFor="nivelInstalacion">Nivel de instalación</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("nivelInstalacion", value)}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Seleccionar nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nivel 1">Nivel 1</SelectItem>
                      <SelectItem value="Nivel 2">Nivel 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tipoVentilador">Tipo de ventilador</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("tipoVentilador", value)}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Seleccionar tipo de ventilador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Helicoidal">Helicoidal</SelectItem>
                      <SelectItem value="Axial">Axial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="temperaturaDescarga">Temperatura de descarga (ºC)</Label>
                  <Input 
                    id="temperaturaDescarga"
                    type="number"
                    className="mt-2"
                    placeholder="Ej: 124.8"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="presionDescarga">Presión de descarga (bar)</Label>
                  <Input 
                    id="presionDescarga"
                    type="number"
                    className="mt-2"
                    step="0.1"
                    placeholder="Ej: 93.7"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="ubicacionGascooler">Ubicación gascooler</Label>
                  <Input 
                    id="ubicacionGascooler"
                    className="mt-2"
                    placeholder="Indique la ubicación del gascooler"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="tieneIHX">Intercambiador IHX</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("tieneIHX", value)}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="¿Tiene intercambiador IHX?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SI">SI</SelectItem>
                      <SelectItem value="NO">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tieneDesrecalentador">Desrecalentador</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("tieneDesrecalentador", value)}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="¿Tiene desrecalentador?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SI">SI</SelectItem>
                      <SelectItem value="NO">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="kilosRefrigerante">Kilos de refrigerante según instalador (kg)</Label>
                  <Input 
                    id="kilosRefrigerante"
                    type="number"
                    step="0.1"
                    className="mt-2"
                    placeholder="Indique la cantidad en kg"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </Card>

            {/* Clasificación */}
            <ClasificacionSection onChange={handleClasificacionChange} />
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
