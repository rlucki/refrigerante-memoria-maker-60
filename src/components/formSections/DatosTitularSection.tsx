
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DatosInstalacionSection from "./DatosInstalacionSection";
import DatosInstaladorSection from "./DatosInstaladorSection";
import ClasificacionSection from "./ClasificacionSection";
import DatosTecnicosSection from "./DatosTecnicosSection";
import ExcelUploader from "../ExcelUploader";
import WordDocumentTemplate from "../WordDocumentTemplate";

interface DatosTitularSectionProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { id: string; value: string }) => void;
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
  const [gasFluorado, setGasFluorado] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [activeTab, setActiveTab] = useState("titular");
  
  // Handler for receiving changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { id: string; value: string }) => {
    if (onChange) {
      onChange(e);
    }
  };
  
  // Special handler for postal code changes
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement> | { id: string; value: string }) => {
    const id = 'target' in e ? e.target.id : e.id;
    const value = 'target' in e ? e.target.value : e.value;
    
    if (id === "cpInstalacion") {
      setCodigoPostal(value);
      console.log("Postal code changed:", value);
    }
    
    // Also call the original onChange
    handleChange(e);
  };

  // Handler for gas fluorado changes
  const handleGasFluoradoChange = (field: string, value: string) => {
    if (onGasFluoradoChange) {
      onGasFluoradoChange(field, value);
    }
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Memoria Técnica Descriptiva</h1>
        <p className="text-gray-600">Complete los datos para generar la memoria técnica</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="titular">Datos Titular</TabsTrigger>
          <TabsTrigger value="instalacion">Datos Instalación</TabsTrigger>
          <TabsTrigger value="proyecto">Datos Proyecto</TabsTrigger>
        </TabsList>
        
        <TabsContent value="titular" className="space-y-6">
          <h3 className="text-lg font-medium mb-4">1.- DATOS TITULAR</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="titular">Titular</Label>
              <Input 
                id="titular" 
                placeholder="Nombre del titular" 
                defaultValue="DINOSOL SUPERMERCADOS S.L."
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nif">NIF</Label>
              <Input 
                id="nif" 
                placeholder="NIF del titular" 
                defaultValue="B61742565"
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="direccion">Dirección fiscal</Label>
              <Input 
                id="direccion" 
                placeholder="Dirección fiscal" 
                defaultValue="CTRA. DEL RINCÓN, S/N, 4ª PLANTA Edif. Anexo C.C. Las Arenas"
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="poblacion">Población</Label>
              <Input 
                id="poblacion" 
                placeholder="Población" 
                defaultValue="LAS PALMAS DE GRAN CANARIA"
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provincia">Provincia</Label>
              <Input 
                id="provincia" 
                placeholder="Provincia" 
                defaultValue="LAS PALMAS"
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cp">C.P.</Label>
              <Input 
                id="cp" 
                placeholder="Código postal" 
                defaultValue="35010"
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input 
                id="telefono" 
                placeholder="Teléfono" 
                defaultValue="928303600"
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                placeholder="Email" 
                type="email"
                defaultValue="info.supermercado@dinosol.es"
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="poblacionNotif">Población</Label>
              <Input 
                id="poblacionNotif" 
                placeholder="Población" 
                defaultValue="LAS PALMAS DE GRAN CANARIA"
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provinciaNotif">Provincia</Label>
              <Input 
                id="provinciaNotif" 
                placeholder="Provincia" 
                defaultValue="LAS PALMAS"
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cpNotif">C.P.</Label>
              <Input 
                id="cpNotif" 
                placeholder="Código postal" 
                defaultValue="35013"
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefonoNotif">Teléfono</Label>
              <Input 
                id="telefonoNotif" 
                placeholder="Teléfono" 
                defaultValue="928303600"
                onChange={handleChange}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="instalacion" className="space-y-6">
          <DatosInstalacionSection 
            onChange={handlePostalCodeChange}
            onCalculationsChange={onCalculationsChange}
            onExcelUpload={onExcelUpload}
            gasFluorado={gasFluorado}
            codigoPostal={codigoPostal}
          />
          <div className="mt-6">
            <ClasificacionSection 
              onChange={onChange} 
              onGasFluoradoChange={handleGasFluoradoChange}  
            />
          </div>
        </TabsContent>
        
        <TabsContent value="proyecto" className="space-y-6">
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
