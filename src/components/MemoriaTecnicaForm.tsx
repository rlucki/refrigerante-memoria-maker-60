
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
import { FileUpload } from "./FileUpload";

interface MemoriaTecnicaFormProps {
  onSubmit: () => void;
  onChange?: (field: string, value: any) => void;
  onLogoUpload?: (file: File) => void;
}

const MemoriaTecnicaForm = ({ onSubmit, onChange, onLogoUpload }: MemoriaTecnicaFormProps) => {
  const [activeTab, setActiveTab] = useState("titular");
  
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
      <Card className="mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-base font-medium text-gray-900">Logo del Cliente</h3>
          <p className="text-sm text-gray-500 mt-1">Subir el logo que aparecerá en la memoria técnica</p>
          
          <div className="mt-4">
            <FileUpload 
              accept="image/png, image/jpeg"
              onChange={(file) => {
                console.log("Logo subido:", file);
                if (onLogoUpload && file) {
                  onLogoUpload(file);
                }
              }}
            />
          </div>
        </div>
      </Card>
      
      <Tabs defaultValue="titular" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="titular">Datos Titular</TabsTrigger>
          <TabsTrigger value="instalador">Datos Instalador</TabsTrigger>
          <TabsTrigger value="instalacion">Datos Instalación</TabsTrigger>
          <TabsTrigger value="tecnicos">Datos Técnicos</TabsTrigger>
          <TabsTrigger value="clasificacion">Clasificación</TabsTrigger>
          <TabsTrigger value="normativa">Normativa</TabsTrigger>
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
        
        <TabsContent value="tecnicos" className="mt-6">
          <DatosTecnicosSection />
        </TabsContent>
        
        <TabsContent value="clasificacion" className="mt-6">
          <ClasificacionSection onChange={handleInputChange} />
        </TabsContent>
        
        <TabsContent value="normativa" className="mt-6">
          <NormativaSection onChange={handleComplexChange} />
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
              "tecnicos": "instalacion",
              "clasificacion": "tecnicos",
              "normativa": "clasificacion"
            }[activeTab];
            setActiveTab(prevTab);
          }}
          disabled={activeTab === "titular"}
        >
          Anterior
        </Button>
        
        {activeTab !== "normativa" ? (
          <Button 
            type="button"
            onClick={() => {
              const nextTab = {
                "titular": "instalador",
                "instalador": "instalacion",
                "instalacion": "tecnicos",
                "tecnicos": "clasificacion",
                "clasificacion": "normativa",
                "normativa": "normativa"
              }[activeTab];
              setActiveTab(nextTab);
            }}
          >
            Siguiente
          </Button>
        ) : (
          <Button type="submit">Generar Memoria</Button>
        )}
      </div>
    </form>
  );
};

export default MemoriaTecnicaForm;
