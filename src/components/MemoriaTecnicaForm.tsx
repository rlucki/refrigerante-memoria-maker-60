
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatosTitularSection from "./formSections/DatosTitularSection";
import DatosInstaladorSection from "./formSections/DatosInstaladorSection";
import DatosInstalacionSection from "./formSections/DatosInstalacionSection";
import DatosTecnicosSection from "./formSections/DatosTecnicosSection";
import ClasificacionSection from "./formSections/ClasificacionSection";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import ExcelUploader from "./ExcelUploader";

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
    onSubmit();
  };

  // Adapter function for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => {
    if (onChange) {
      if ('target' in e) {
        onChange(e.target.id, e.target.value);
      } else {
        onChange(e.id, e.value);
      }
    }
  };
  
  // Adapter function for ClasificacionSection
  const handleClasificacionChange = (e: React.ChangeEvent<HTMLInputElement> | { id: string, value: string }) => {
    if (onChange) {
      if ('target' in e) {
        onChange(e.target.id, e.target.value);
      } else {
        onChange(e.id, e.value);
      }
    }
  };

  // Adapter function for NormativaSection
  const handleNormativaChange = (field: string, value: any) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  // Adapter function for textarea elements
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
  };

  // Adapter function for select elements
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
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="titular">Datos Titular</TabsTrigger>
          <TabsTrigger value="instalacion">Datos Instalación</TabsTrigger>
          <TabsTrigger value="datos_proyecto">Datos Proyecto</TabsTrigger>
        </TabsList>
        
        <TabsContent value="titular" className="mt-6">
          <DatosTitularSection onChange={handleInputChange} />
        </TabsContent>
        
        <TabsContent value="instalacion" className="mt-6">
          <DatosInstalacionSection 
            onChange={handleNormativaChange} 
            onCalculationsChange={handleCalcChange}
            onExcelUpload={onExcelUpload}
          />
          <div className="mt-6">
            <ClasificacionSection onChange={handleClasificacionChange} />
          </div>
        </TabsContent>
        
        <TabsContent value="datos_proyecto" className="mt-6">
          <Card className="p-6 mb-6">
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
          
          <DatosInstaladorSection onChange={handleInputChange} />
          
          <div className="mt-6">
            <ExcelUploader onDataLoaded={onExcelUpload || (() => {})} />
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
              "instalacion": "titular",
              "datos_proyecto": "instalacion",
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
              "titular": "instalacion",
              "instalacion": "datos_proyecto",
              "datos_proyecto": "datos_proyecto",
            }[currentTab];
            updateTab(nextTab);
          }}
          disabled={currentTab === "datos_proyecto"}
        >
          Siguiente
        </Button>
      </div>
    </form>
  );
};

export default MemoriaTecnicaForm;

