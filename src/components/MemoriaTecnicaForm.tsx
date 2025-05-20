
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
import ExcelUploader from "./ExcelUploader";
import {
  RadioGroup,
  RadioGroupItem,
} from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Fan, Thermometer, Gauge, AirVent, Weight } from "lucide-react";

interface MemoriaTecnicaFormProps {
  onSubmit: () => void;
  onChange?: (field: string, value: any) => void;
  onWordTemplateUploaded?: (file: File) => void;
  onGenerateWordDocument?: () => void;
  hasWordTemplate?: boolean;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
}

const MemoriaTecnicaForm = ({ 
  onSubmit, 
  onChange, 
  activeTab = "titular",
  setActiveTab,
  onCalculationsChange,
  onExcelUpload
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

  // Create an adapter function to match the expected signature for NormativaSection
  const handleNormativaChange = (field: string, value: any) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  // Create an adapter function for textarea elements
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
  
  // Handle calculations changes
  const handleCalcChange = (field: string, value: string) => {
    if (onCalculationsChange) {
      onCalculationsChange(field, value);
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
            {/* Nueva sección de Normativa agregada aquí */}
            <NormativaSection onChange={handleNormativaChange} />
            
            {/* Calculadora */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Configuración de Compresores y Equipos</h3>
              <div className="space-y-6">
                {/* Compresor MT */}
                <div className="grid gap-2">
                  <Label htmlFor="compresorMT">Compresor MT</Label>
                  <Select 
                    onValueChange={(value) => handleCalcChange("compresorMT", value)}
                    defaultValue="0"
                  >
                    <SelectTrigger id="compresorMT" className="w-full">
                      <SelectValue placeholder="Seleccionar número" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Compresor BT */}
                <div className="grid gap-2">
                  <Label htmlFor="compresorBT">Compresor BT</Label>
                  <Select 
                    onValueChange={(value) => handleCalcChange("compresorBT", value)}
                    defaultValue="0"
                  >
                    <SelectTrigger id="compresorBT" className="w-full">
                      <SelectValue placeholder="Seleccionar número" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Compresor Paralelo */}
                <div className="grid gap-2">
                  <Label htmlFor="compresorParalelo">Compresor Paralelo</Label>
                  <Select 
                    onValueChange={(value) => handleCalcChange("compresorParalelo", value)}
                    defaultValue="0"
                  >
                    <SelectTrigger id="compresorParalelo" className="w-full">
                      <SelectValue placeholder="Seleccionar número" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Uploader de Excel con visualizador */}
            {onExcelUpload && (
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Cargar archivo Excel</h3>
                <ExcelUploader onDataLoaded={onExcelUpload} />
              </Card>
            )}

            <Separator className="my-6" />

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
                <div className="flex items-center gap-2">
                  <Fan size={18} />
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
                <div className="flex items-center gap-2">
                  <Thermometer size={18} />
                  <Label htmlFor="temperaturaDescarga">Temperatura de descarga (ºC)</Label>
                  <Input 
                    id="temperaturaDescarga"
                    type="number"
                    className="mt-2"
                    placeholder="Ej: 124.8"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Gauge size={18} />
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
                <div className="flex items-center gap-2">
                  <AirVent size={18} />
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
                  <RadioGroup 
                    onValueChange={(value) => {
                      handleSelectChange("tieneIHX", value);
                      if (onCalculationsChange) onCalculationsChange("tieneIHX", value);
                    }}
                    defaultValue="no"
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="tieneIHX-si" />
                      <Label htmlFor="tieneIHX-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="tieneIHX-no" />
                      <Label htmlFor="tieneIHX-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="tieneDesrecalentador">Desrecalentador</Label>
                  <RadioGroup 
                    onValueChange={(value) => {
                      handleSelectChange("tieneDesrecalentador", value);
                      if (onCalculationsChange) onCalculationsChange("tieneDesrecalentador", value);
                    }}
                    defaultValue="no"
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="tieneDesrecalentador-si" />
                      <Label htmlFor="tieneDesrecalentador-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="tieneDesrecalentador-no" />
                      <Label htmlFor="tieneDesrecalentador-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center gap-2">
                  <Weight size={18} />
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
