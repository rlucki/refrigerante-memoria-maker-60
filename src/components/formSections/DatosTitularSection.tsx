import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import ExcelUploader from "../ExcelUploader";
import ClasificacionSection from "./ClasificacionSection";
import DatosInstalacionSection from "./DatosInstalacionSection";
import DatosInstaladorSection from "./DatosInstaladorSection";
import NormativaSection from "./NormativaSection";
import DatosTecnicosSection from "./DatosTecnicosSection";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import GasFluoradoQuestion from "./shared/GasFluoradoQuestion";

interface DatosTitularSectionProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNormativaChange?: (field: string, value: any) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
  onGasFluoradoChange?: (field: string, value: string) => void;
}

const DatosTitularSection = ({ 
  onChange, 
  onNormativaChange,
  onCalculationsChange,
  onExcelUpload,
  onGasFluoradoChange
}: DatosTitularSectionProps) => {
  const [activeTab, setActiveTab] = useState("titular");
  const [manualGasFluorado, setManualGasFluorado] = useState("NO");

  // Handle manual gas fluorado change
  const handleManualGasFluoradoChange = (value: string) => {
    setManualGasFluorado(value);
    if (onGasFluoradoChange) {
      onGasFluoradoChange("gasFluorado", value);
    }
    // Create a proper fake event object that matches ChangeEvent<HTMLInputElement>
    if (onChange) {
      const fakeEvent = {
        target: {
          id: "gasFluorado",
          value: value
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(fakeEvent);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="titular">Datos Titular</TabsTrigger>
          <TabsTrigger value="instalacion">Datos Instalación</TabsTrigger>
          <TabsTrigger value="proyecto">Datos Proyecto</TabsTrigger>
          <TabsTrigger value="normativa">Normativa</TabsTrigger>
          <TabsTrigger value="clasificacion">Clasificación</TabsTrigger>
          <TabsTrigger value="tecnicos">Técnicos</TabsTrigger>
          <TabsTrigger value="item10">Otras Consideraciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="titular" className="mt-6">
          <h3 className="text-lg font-medium mb-4">1.- DATOS TITULAR</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="titular">Titular</Label>
              <Input 
                id="titular" 
                placeholder="Nombre del titular" 
                defaultValue="DINOSOL SUPERMERCADOS S.L."
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nif">NIF</Label>
              <Input 
                id="nif" 
                placeholder="NIF del titular" 
                defaultValue="B61742565"
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="direccion">Dirección fiscal</Label>
              <Input 
                id="direccion" 
                placeholder="Dirección fiscal" 
                defaultValue="CTRA. DEL RINCÓN, S/N, 4ª PLANTA Edif. Anexo C.C. Las Arenas"
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="poblacion">Población</Label>
              <Input 
                id="poblacion" 
                placeholder="Población" 
                defaultValue="LAS PALMAS DE GRAN CANARIA"
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provincia">Provincia</Label>
              <Input 
                id="provincia" 
                placeholder="Provincia" 
                defaultValue="LAS PALMAS"
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cp">C.P.</Label>
              <Input 
                id="cp" 
                placeholder="Código postal" 
                defaultValue="35010"
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input 
                id="telefono" 
                placeholder="Teléfono" 
                defaultValue="928303600"
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                placeholder="Email" 
                type="email"
                defaultValue="info.supermercado@dinosol.es"
                onChange={onChange}
              />
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <h3 className="text-lg font-medium mb-4">5. DOMICILIO A EFECTOS DE NOTIFICACIONES</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="direccionNotif">Dirección</Label>
              <Input 
                id="direccionNotif" 
                placeholder="Dirección para notificaciones" 
                defaultValue="C/ Luis Correa Medina, 9"
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="poblacionNotif">Población</Label>
              <Input 
                id="poblacionNotif" 
                placeholder="Población" 
                defaultValue="LAS PALMAS DE GRAN CANARIA"
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provinciaNotif">Provincia</Label>
              <Input 
                id="provinciaNotif" 
                placeholder="Provincia" 
                defaultValue="LAS PALMAS"
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cpNotif">C.P.</Label>
              <Input 
                id="cpNotif" 
                placeholder="Código postal" 
                defaultValue="35013"
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefonoNotif">Teléfono</Label>
              <Input 
                id="telefonoNotif" 
                placeholder="Teléfono" 
                defaultValue="928303600"
                onChange={onChange}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="instalacion" className="mt-6">
          <DatosInstalacionSection
            onChange={onNormativaChange}
            onCalculationsChange={onCalculationsChange}
            onExcelUpload={onExcelUpload}
          />
          <div className="mt-6">
            <ClasificacionSection 
              onChange={onChange} 
              onGasFluoradoChange={onGasFluoradoChange}  
            />
          </div>
        </TabsContent>
        
        <TabsContent value="proyecto" className="mt-6">
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
                    onChange={onChange}
                    defaultValue="Supermercado"
                  />
                </div>
                <div>
                  <Label htmlFor="nombreProyecto">Nombre del proyecto</Label>
                  <Input 
                    id="nombreProyecto"
                    className="mt-2"
                    placeholder="Ej: Costa del Silencio (Arona)"
                    onChange={onChange}
                    defaultValue="Costa del Silencio (Arona)"
                  />
                </div>
              </div>
            </div>
          </Card>
          
          <DatosInstaladorSection onChange={onChange} />
          
          <div className="mt-6">
            <ExcelUploader onDataLoaded={onExcelUpload || (() => {})} />
          </div>
        </TabsContent>
        
        <TabsContent value="normativa" className="space-y-6">
          <NormativaSection 
            onChange={onNormativaChange} 
            gasFluoradoValue={manualGasFluorado}
          />
        </TabsContent>
        
        <TabsContent value="clasificacion" className="space-y-6">
          <ClasificacionSection 
            onChange={onChange}
            onGasFluoradoChange={onGasFluoradoChange}
          />
        </TabsContent>
        
        <TabsContent value="tecnicos" className="space-y-6">
          <DatosTecnicosSection 
            onChange={onChange}
            onGasFluoradoChange={onGasFluoradoChange}
          />
        </TabsContent>
        
        <TabsContent value="item10" className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">10.- OTRAS CONSIDERACIONES</h3>
              
              <div className="space-y-6">
                <GasFluoradoQuestion
                  value={manualGasFluorado}
                  onChange={handleManualGasFluoradoChange}
                  label="¿Es un gas fluorado?"
                />
                
                {manualGasFluorado === "SI" && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Las normas de gases fluorados se aplicarán automáticamente en la sección de normativa.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between gap-4 mt-8">
        <button 
          type="button" 
          className="px-4 py-2 border rounded hover:bg-gray-100"
          onClick={() => {
            const prevTab = {
              "titular": "titular",
              "instalacion": "titular",
              "proyecto": "instalacion",
            }[activeTab];
            setActiveTab(prevTab);
          }}
          disabled={activeTab === "titular"}
        >
          Anterior
        </button>
        
        <button 
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => {
            const nextTab = {
              "titular": "instalacion",
              "instalacion": "proyecto",
              "proyecto": "proyecto",
            }[activeTab];
            setActiveTab(nextTab);
          }}
          disabled={activeTab === "proyecto"}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DatosTitularSection;
