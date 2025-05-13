import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DatosTecnicosSection = () => {
  const [refrigerante, setRefrigerante] = useState("R-448A");
  const [camarasFrescos, setCamarasFrescos] = useState("2");
  const [camarasCongelados, setCamarasCongelados] = useState("2");
  
  const refrigerantes = [
    "R-1234yf",
    "R-1234ze",
    "R-134a",
    "R-170",
    "R-22",
    "R-290",
    "R-32",
    "R-404A",
    "R-407F",
    "R-410A",
    "R-424A",
    "R-427A",
    "R-434A",
    "R-442A",
    "R-448A",
    "R-449A",
    "R-450A",
    "R-452A",
    "R-453A",
    "R-454C",
    "R-455A",
    "R-507A",
    "R-513A",
    "R-600",
    "R-600a",
    "R-717",
    "R-744"
  ];
  
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">6.- ENTIDAD DE CONTROL</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="entidad_control">Nombre/Razón social</Label>
            <Input 
              id="entidad_control" 
              placeholder="Entidad de control" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="entidad_nif">NIF</Label>
            <Input 
              id="entidad_nif" 
              placeholder="NIF" 
            />
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <h3 className="text-lg font-medium mb-4">7.- DATOS TÉCNICOS</h3>
        
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">CÁMARAS</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fecha_puesta_servicio">Fecha primera puesta en servicio</Label>
              <Input 
                id="fecha_puesta_servicio" 
                placeholder="Fecha" 
                type="date"
                defaultValue="2024-09-23"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="camaras_frescos">Nº de cámaras de conservación de frescos</Label>
              <Input 
                id="camaras_frescos" 
                placeholder="Número" 
                value={camarasFrescos}
                onChange={(e) => setCamarasFrescos(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="volumen_frescos">Volumen (m³)</Label>
              <Input 
                id="volumen_frescos" 
                placeholder="Volumen" 
                defaultValue="45.3"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="camaras_congelados">Nº de cámaras de conservación de congelados</Label>
              <Input 
                id="camaras_congelados" 
                placeholder="Número" 
                value={camarasCongelados}
                onChange={(e) => setCamarasCongelados(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="volumen_congelados">Volumen (m³)</Label>
              <Input 
                id="volumen_congelados" 
                placeholder="Volumen" 
                defaultValue="43.4"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacidad_frigorifica">Capacidad frigorífica total (kW)</Label>
              <Input 
                id="capacidad_frigorifica" 
                placeholder="Capacidad" 
                defaultValue="56.07"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacidad_congelacion">Capacidad de congelación (kg/h)</Label>
              <Input 
                id="capacidad_congelacion" 
                placeholder="Capacidad" 
                defaultValue="-"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacidad_hielo">Capacidad de producción de hielo (kg/h)</Label>
              <Input 
                id="capacidad_hielo" 
                placeholder="Capacidad" 
                defaultValue="-"
              />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">COMPRESORES</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="potencia_total">Potencia total de accionamiento (kW)</Label>
              <Input 
                id="potencia_total" 
                placeholder="Potencia" 
                defaultValue="52.50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="potencia_maxima">Potencia máxima absorbida por el compresor (kW)</Label>
              <Input 
                id="potencia_maxima" 
                placeholder="Potencia" 
                defaultValue="9.37"
              />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">REFRIGERANTE</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grupo_refrigerante">Grupo de refrigerante (Primario)</Label>
              <Input 
                id="grupo_refrigerante" 
                placeholder="Grupo" 
                defaultValue="L1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grupo_refrigerante_secundario">Grupo de refrigerante (Secundario o Cascada)</Label>
              <Input 
                id="grupo_refrigerante_secundario" 
                placeholder="Grupo" 
                defaultValue="-"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="refrigerante_select">Identificación del refrigerante</Label>
              <Select 
                id="refrigerante_select" 
                value={refrigerante}
                onValueChange={setRefrigerante}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar refrigerante" />
                </SelectTrigger>
                <SelectContent>
                  {refrigerantes.map((ref) => (
                    <SelectItem key={ref} value={ref}>
                      {ref}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="refrigerante_secundario_select">Identificación del refrigerante (Secundario)</Label>
              <Select 
                id="refrigerante_secundario_select" 
                defaultValue="-"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar refrigerante" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-">-</SelectItem>
                  {refrigerantes.map((ref) => (
                    <SelectItem key={`sec-${ref}`} value={ref}>
                      {ref}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carga_total">Carga total (kg)</Label>
              <Input 
                id="carga_total" 
                placeholder="Carga" 
                defaultValue="50/35"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carga_total_secundario">Carga total (kg) (Secundario)</Label>
              <Input 
                id="carga_total_secundario" 
                placeholder="Carga" 
                defaultValue="-"
              />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">PRESIONES DE PROYECTO</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <h5 className="font-medium mb-2 text-center">SECTOR DE ALTA PRESIÓN</h5>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="presion_servicio_alta">Presión de servicio nominal (bar)</Label>
                  <Input 
                    id="presion_servicio_alta" 
                    placeholder="Presión" 
                    defaultValue="20.2"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="presion_maxima_alta">Presión de servicio máxima (PS) (bar)</Label>
                  <Input 
                    id="presion_maxima_alta" 
                    placeholder="Presión" 
                    defaultValue="28.0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="presion_tarado_alta">Presión de tarado válv. seguridad (bar)</Label>
                  <Input 
                    id="presion_tarado_alta" 
                    placeholder="Presión" 
                    defaultValue="28.0"
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h5 className="font-medium mb-2 text-center">SECTOR DE BAJA PRESIÓN</h5>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="presion_servicio_baja">Presión de servicio nominal (bar)</Label>
                  <Input 
                    id="presion_servicio_baja" 
                    placeholder="Presión" 
                    defaultValue="0.7"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="presion_maxima_baja">Presión de servicio máxima (PS) (bar)</Label>
                  <Input 
                    id="presion_maxima_baja" 
                    placeholder="Presión" 
                    defaultValue="15.0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="presion_tarado_baja">Presión de tarado válv. seguridad (bar)</Label>
                  <Input 
                    id="presion_tarado_baja" 
                    placeholder="Presión" 
                    defaultValue="-"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">SALA DE MÁQUINAS</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="volumen_sala">Volumen sala de máquinas (m³)</Label>
              <Input 
                id="volumen_sala" 
                placeholder="Volumen" 
                defaultValue="180.79"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="superficie_sala">Superficie sala de máquinas (m²)</Label>
              <Input 
                id="superficie_sala" 
                placeholder="Superficie" 
                defaultValue="47.58"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="refrigerante_sala_select">Refrigerante</Label>
              <Select 
                id="refrigerante_sala_select" 
                value={refrigerante}
                onValueChange={setRefrigerante}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar refrigerante" />
                </SelectTrigger>
                <SelectContent>
                  {refrigerantes.map((ref) => (
                    <SelectItem key={`sala-${ref}`} value={ref}>
                      {ref}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">DETECTOR DE FUGAS</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="modelo_detector">Modelo</Label>
              <Input 
                id="modelo_detector" 
                placeholder="Modelo" 
                defaultValue="DANFOSS DGS-SC HCF GRP.2"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contrastar_detector">Contrastar cada (años)</Label>
              <Input 
                id="contrastar_detector" 
                placeholder="Años" 
                defaultValue="5"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nivel_alarma_inferior">Nivel de alarma inferior (ppm)</Label>
              <Input 
                id="nivel_alarma_inferior" 
                placeholder="Nivel" 
                defaultValue="500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nivel_alarma_superior">Nivel de alarma superior (ppm)</Label>
              <Input 
                id="nivel_alarma_superior" 
                placeholder="Nivel" 
                defaultValue="1,000"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DatosTecnicosSection;
