import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DatosInstalacionSection from "./DatosInstalacionSection";
import DatosInstaladorSection from "./DatosInstaladorSection";
import DatosTecnicosSection from "./DatosTecnicosSection";
import ExcelUploader from "../ExcelUploader";
import WordDocumentTemplate from "../WordDocumentTemplate";

import DatosTitularForm from "./DatosTitularForm";
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
  const [gasFluorado, setGasFluorado] = useState("SI");
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

  // Handler for normativa changes - separate from postal code changes
  const handleNormativaChange = (field: string, value: any) => {
    if (onNormativaChange) {
      onNormativaChange(field, value);
    }
  };

  // Handler for gas fluorado changes
  const handleGasFluoradoChange = (field: string, value: string) => {
    console.log("🔄 Gas fluorado change in DatosTitularSection:", field, value);
    setGasFluorado(value);
    
    if (onGasFluoradoChange) {
      onGasFluoradoChange(field, value);
    }
    
    // Also update via onChange
    if (onChange) {
      onChange({ id: "gasFluorado", value });
      onChange({ id: "aplicaGasesFluorados", value });
    }
  };

  // Adapter function to convert from field/value format to event format for postal code tracking
  const handleInstalacionChange = (field: string, value: any) => {
    // Convert to the format expected by handlePostalCodeChange
    const syntheticEvent = { id: field, value: value };
    handlePostalCodeChange(syntheticEvent);
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
        
        <DatosTitularForm handleChange={handleChange} />
        
        <TabsContent value="instalacion" className="space-y-6">
          <DatosInstalacionSection 
            onChange={handleInstalacionChange}
            onCalculationsChange={onCalculationsChange}
            onExcelUpload={onExcelUpload}
            gasFluorado={gasFluorado}
            codigoPostal={codigoPostal}
            onNormativaChange={handleNormativaChange}
          />
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
