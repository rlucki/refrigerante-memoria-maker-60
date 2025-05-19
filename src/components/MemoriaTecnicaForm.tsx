
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
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import WordDocumentTemplate from "./WordDocumentTemplate";

interface MemoriaTecnicaFormProps {
  onSubmit: () => void;
  onChange?: (field: string, value: any) => void;
  onWordTemplateUploaded?: (file: File) => void;
  onGenerateWordDocument?: () => void;
  hasWordTemplate?: boolean;
}

const defaultDescripcionText = `La instalación está compuesta por varios muebles frigoríficos tipo mural y dos armarios de congelados, así como tres cámaras de conservación, un obrador y dos cámaras de congelados. Los servicios positivos se alimentan desde una central compacta positiva, mientras que los servicios negativos se alimentan desde una central compacta negativa.

Las centrales compactas frigoríficas se encuentran ubicadas dentro de una sala de máquinas no específica. Los compresores utilizados son de tipo scroll de la marca COPELAND. Dichos compresores van provistos de todos los elementos de seguridad necesarios para garantizar el funcionamiento correcto de los mismos y un mantenimiento mínimo. 

Las centrales compactas frigoríficas incorporan el condensador de aire dentro de su propio carrozado. Los ventiladores de los condensadores son radiales de conmutación electrónica (EC) y medio nivel sonoro.

El refrigerante condensado se almacena en su correspondiente recipiente de líquido individual incorporado dentro de las propias máquinas descritas.  
Se ha instalado un evaporador en cada cámara, correctamente dimensionado a sus necesidades. El desescarche de los evaporadores se realiza por resistencias eléctricas.
El gas utilizado en la instalación es R-448A. La carga de refrigerante para la central compacta positiva es de 50 kg, mientras que la carga de refrigerante para la central compacta negativa es de 35 kg. Por lo que la instalación cuenta con una carga total de 85 kg de refrigerante R-448A repartida en dos sistemas diferentes.`;

const MemoriaTecnicaForm = ({ 
  onSubmit, 
  onChange, 
  onWordTemplateUploaded, 
  onGenerateWordDocument,
  hasWordTemplate = false
}: MemoriaTecnicaFormProps) => {
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
  
  // Función para manejar cambios en elementos textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="titular" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-8 w-full">
          <TabsTrigger value="titular">Datos Titular</TabsTrigger>
          <TabsTrigger value="instalador">Datos Instalador</TabsTrigger>
          <TabsTrigger value="instalacion">Datos Instalación</TabsTrigger>
          <TabsTrigger value="datos_proyecto">Datos Proyecto</TabsTrigger>
          <TabsTrigger value="clasificacion">Clasificación</TabsTrigger>
          <TabsTrigger value="normativa">Normativa</TabsTrigger>
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="word">Documento</TabsTrigger>
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
        
        <TabsContent value="clasificacion" className="mt-6">
          <ClasificacionSection onChange={handleInputChange} />
        </TabsContent>
        
        <TabsContent value="normativa" className="mt-6">
          <NormativaSection onChange={handleComplexChange} />
        </TabsContent>

        <TabsContent value="descripcion" className="mt-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">10. DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="descripcionInstalacion">
                    Descripción de la instalación 
                    <span className="text-xs text-muted-foreground ml-2">
                      (Usa &&texto&& para marcar entradas para el índice)
                    </span>
                  </Label>
                  <Textarea 
                    id="descripcionInstalacion"
                    className="min-h-[300px] mt-2"
                    placeholder="Introduzca la descripción de la instalación frigorífica..."
                    onChange={handleTextareaChange}
                    defaultValue={defaultDescripcionText}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="word" className="mt-6">
          <WordDocumentTemplate 
            onTemplateUploaded={onWordTemplateUploaded || (() => {})}
            onDownloadDocument={onGenerateWordDocument || (() => {})}
            hasTemplate={hasWordTemplate}
          />
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
              "clasificacion": "datos_proyecto",
              "normativa": "clasificacion",
              "descripcion": "normativa",
              "word": "descripcion"
            }[activeTab];
            setActiveTab(prevTab);
          }}
          disabled={activeTab === "titular"}
        >
          Anterior
        </Button>
        
        {activeTab !== "word" ? (
          <Button 
            type="button"
            onClick={() => {
              const nextTab = {
                "titular": "instalador",
                "instalador": "instalacion",
                "instalacion": "datos_proyecto",
                "datos_proyecto": "clasificacion",
                "clasificacion": "normativa",
                "normativa": "descripcion",
                "descripcion": "word",
                "word": "word"
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
