
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

interface DatosTecnicosSectionProps {
  onChange?: (field: string, value: any) => void;
}

const DatosTecnicosSection = ({ onChange }: DatosTecnicosSectionProps) => {
  const [refrigerante, setRefrigerante] = useState("R-434A");
  const [camarasFrescos, setCamarasFrescos] = useState("2");
  const [camarasCongelados, setCamarasCongelados] = useState("2");
  const [inflamabilidad, setInflamabilidad] = useState("Grupo 1");
  const [toxicidad, setToxicidad] = useState("Grupo A");
  const [grupoSeguridad, setGrupoSeguridad] = useState("A1");
  
  // Definimos las propiedades de los refrigerantes más comunes
  const refrigerantesPropiedades = {
    "R-434A": {
      composicion: "(63,2% R-125 / 18% R-143a / 16% R-134a / 2,8% R-600a)",
      inflamabilidad: "Grupo 1",
      toxicidad: "Grupo A",
      grupoSeguridad: "A1",
      directivaEquipos: "2",
      pca: "3245",
      agotamientoOzono: "0",
      limitePractico: "0.32 kg/m³",
      atelOdl: "0.32 kg/m³",
      limiteInflamabilidad: "NF",
      temperaturaAutoignicion: "ND",
      gasFluorado: "SI"
    },
    "R-404A": {
      composicion: "(44% R-125 / 4% R-134a / 52% R-143a)",
      inflamabilidad: "Grupo 1",
      toxicidad: "Grupo A",
      grupoSeguridad: "A1",
      directivaEquipos: "2",
      pca: "3922",
      agotamientoOzono: "0",
      limitePractico: "0.52 kg/m³",
      atelOdl: "0.52 kg/m³",
      limiteInflamabilidad: "NF",
      temperaturaAutoignicion: "728°C",
      gasFluorado: "SI"
    },
    "R-448A": {
      composicion: "(26% R-32 / 26% R-125 / 21% R-134a / 7% R-1234ze(E) / 20% R-1234yf)",
      inflamabilidad: "Grupo 1",
      toxicidad: "Grupo A",
      grupoSeguridad: "A1",
      directivaEquipos: "2",
      pca: "1387",
      agotamientoOzono: "0",
      limitePractico: "0.39 kg/m³",
      atelOdl: "0.39 kg/m³",
      limiteInflamabilidad: "NF",
      temperaturaAutoignicion: "ND",
      gasFluorado: "SI"
    }
  };
  
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
  
  // Manejador para el cambio de refrigerante
  const handleRefrigeranteChange = (value: string) => {
    setRefrigerante(value);
    
    // Notificar el cambio del refrigerante
    if (onChange) {
      onChange("refrigerante", value);
      
      // Si tenemos propiedades predefinidas para este refrigerante, notificar todos los valores
      if (value in refrigerantesPropiedades) {
        const props = refrigerantesPropiedades[value as keyof typeof refrigerantesPropiedades];
        
        // Actualizar estados locales
        setInflamabilidad(props.inflamabilidad);
        setToxicidad(props.toxicidad);
        setGrupoSeguridad(props.grupoSeguridad);
        
        // Notificar todos los cambios
        onChange("composicionRefrigerante", props.composicion);
        onChange("inflamabilidad", props.inflamabilidad);
        onChange("toxicidad", props.toxicidad);
        onChange("grupoSeguridad", props.grupoSeguridad);
        onChange("directivaEquipos", props.directivaEquipos);
        onChange("pca", props.pca);
        onChange("agotamientoOzono", props.agotamientoOzono);
        onChange("limitePractico", props.limitePractico);
        onChange("atelOdl", props.atelOdl);
        onChange("limiteInflamabilidad", props.limiteInflamabilidad);
        onChange("temperaturaAutoignicion", props.temperaturaAutoignicion);
        onChange("gasFluorado", props.gasFluorado);
      }
    }
  };
  
  // Manejador para otros campos
  const handleInputChange = (field: string, value: string) => {
    if (onChange) {
      onChange(field, value);
    }
  };
  
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
              onChange={(e) => handleInputChange("entidad_control", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="entidad_nif">NIF</Label>
            <Input 
              id="entidad_nif" 
              placeholder="NIF" 
              onChange={(e) => handleInputChange("entidad_nif", e.target.value)}
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
                onChange={(e) => handleInputChange("fecha_puesta_servicio", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="camaras_frescos">Nº de cámaras de conservación de frescos</Label>
              <Input 
                id="camaras_frescos" 
                placeholder="Número" 
                value={camarasFrescos}
                onChange={(e) => {
                  setCamarasFrescos(e.target.value);
                  handleInputChange("camaras_frescos", e.target.value);
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="volumen_frescos">Volumen (m³)</Label>
              <Input 
                id="volumen_frescos" 
                placeholder="Volumen" 
                defaultValue="45.3"
                onChange={(e) => handleInputChange("volumen_frescos", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="camaras_congelados">Nº de cámaras de conservación de congelados</Label>
              <Input 
                id="camaras_congelados" 
                placeholder="Número" 
                value={camarasCongelados}
                onChange={(e) => {
                  setCamarasCongelados(e.target.value);
                  handleInputChange("camaras_congelados", e.target.value);
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="volumen_congelados">Volumen (m³)</Label>
              <Input 
                id="volumen_congelados" 
                placeholder="Volumen" 
                defaultValue="43.4"
                onChange={(e) => handleInputChange("volumen_congelados", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacidad_frigorifica">Capacidad frigorífica total (kW)</Label>
              <Input 
                id="capacidad_frigorifica" 
                placeholder="Capacidad" 
                defaultValue="56.07"
                onChange={(e) => handleInputChange("capacidad_frigorifica", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacidad_congelacion">Capacidad de congelación (kg/h)</Label>
              <Input 
                id="capacidad_congelacion" 
                placeholder="Capacidad" 
                defaultValue="-"
                onChange={(e) => handleInputChange("capacidad_congelacion", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacidad_hielo">Capacidad de producción de hielo (kg/h)</Label>
              <Input 
                id="capacidad_hielo" 
                placeholder="Capacidad" 
                defaultValue="-"
                onChange={(e) => handleInputChange("capacidad_hielo", e.target.value)}
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
                onChange={(e) => handleInputChange("potencia_total", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="potencia_maxima">Potencia máxima absorbida por el compresor (kW)</Label>
              <Input 
                id="potencia_maxima" 
                placeholder="Potencia" 
                defaultValue="9.37"
                onChange={(e) => handleInputChange("potencia_maxima", e.target.value)}
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
                onChange={(e) => handleInputChange("grupo_refrigerante", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grupo_refrigerante_secundario">Grupo de refrigerante (Secundario o Cascada)</Label>
              <Input 
                id="grupo_refrigerante_secundario" 
                placeholder="Grupo" 
                defaultValue="-"
                onChange={(e) => handleInputChange("grupo_refrigerante_secundario", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="refrigerante_select">Identificación del refrigerante</Label>
              <Select 
                id="refrigerante_select" 
                value={refrigerante}
                onValueChange={handleRefrigeranteChange}
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
                onValueChange={(value) => handleInputChange("refrigerante_secundario", value)}
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
                onChange={(e) => handleInputChange("carga_total", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carga_total_secundario">Carga total (kg) (Secundario)</Label>
              <Input 
                id="carga_total_secundario" 
                placeholder="Carga" 
                defaultValue="-"
                onChange={(e) => handleInputChange("carga_total_secundario", e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">CLASIFICACIÓN DE SEGURIDAD DEL REFRIGERANTE</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="inflamabilidad_select">Inflamabilidad</Label>
              <Select 
                id="inflamabilidad_select" 
                value={inflamabilidad}
                onValueChange={(value) => {
                  setInflamabilidad(value);
                  handleInputChange("inflamabilidad", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar inflamabilidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grupo 1">Grupo 1</SelectItem>
                  <SelectItem value="Grupo 2L">Grupo 2L</SelectItem>
                  <SelectItem value="Grupo 2">Grupo 2</SelectItem>
                  <SelectItem value="Grupo 3">Grupo 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="toxicidad_select">Toxicidad</Label>
              <Select 
                id="toxicidad_select" 
                value={toxicidad}
                onValueChange={(value) => {
                  setToxicidad(value);
                  handleInputChange("toxicidad", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar toxicidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grupo A">Grupo A</SelectItem>
                  <SelectItem value="Grupo B">Grupo B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grupo_seguridad_select">Grupo de seguridad</Label>
              <Select 
                id="grupo_seguridad_select" 
                value={grupoSeguridad}
                onValueChange={(value) => {
                  setGrupoSeguridad(value);
                  handleInputChange("grupoSeguridad", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar grupo de seguridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A1">A1</SelectItem>
                  <SelectItem value="A2L">A2L</SelectItem>
                  <SelectItem value="A2">A2</SelectItem>
                  <SelectItem value="A3">A3</SelectItem>
                  <SelectItem value="B1">B1</SelectItem>
                  <SelectItem value="B2L">B2L</SelectItem>
                  <SelectItem value="B2">B2</SelectItem>
                  <SelectItem value="B3">B3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="composicion_refrigerante">Composición del refrigerante</Label>
              <Input 
                id="composicion_refrigerante" 
                placeholder="Composición" 
                defaultValue={(refrigerantesPropiedades as any)[refrigerante]?.composicion || ""}
                onChange={(e) => handleInputChange("composicionRefrigerante", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pca">Potencial de Calentamiento Atmosférico (PCA)</Label>
              <Input 
                id="pca" 
                placeholder="PCA" 
                defaultValue={(refrigerantesPropiedades as any)[refrigerante]?.pca || ""}
                onChange={(e) => handleInputChange("pca", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pao">Potencial de Agotamiento de la capa de Ozono (PAO)</Label>
              <Input 
                id="pao" 
                placeholder="PAO" 
                defaultValue={(refrigerantesPropiedades as any)[refrigerante]?.agotamientoOzono || "0"}
                onChange={(e) => handleInputChange("agotamientoOzono", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="limite_practico">Límite Práctico (kg/m³)</Label>
              <Input 
                id="limite_practico" 
                placeholder="Límite práctico" 
                defaultValue={(refrigerantesPropiedades as any)[refrigerante]?.limitePractico || ""}
                onChange={(e) => handleInputChange("limitePractico", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="atel_odl">ATEL/ODL (kg/m³)</Label>
              <Input 
                id="atel_odl" 
                placeholder="ATEL/ODL" 
                defaultValue={(refrigerantesPropiedades as any)[refrigerante]?.atelOdl || ""}
                onChange={(e) => handleInputChange("atelOdl", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="limite_inflamabilidad">Límite Inferior de Inflamabilidad</Label>
              <Input 
                id="limite_inflamabilidad" 
                placeholder="Límite de inflamabilidad" 
                defaultValue={(refrigerantesPropiedades as any)[refrigerante]?.limiteInflamabilidad || ""}
                onChange={(e) => handleInputChange("limiteInflamabilidad", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="temperatura_autoignicion">Temperatura de autoignición</Label>
              <Input 
                id="temperatura_autoignicion" 
                placeholder="Temperatura" 
                defaultValue={(refrigerantesPropiedades as any)[refrigerante]?.temperaturaAutoignicion || ""}
                onChange={(e) => handleInputChange("temperaturaAutoignicion", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gas_fluorado">Gas Fluorado</Label>
              <Select 
                id="gas_fluorado" 
                defaultValue={(refrigerantesPropiedades as any)[refrigerante]?.gasFluorado || "SI"}
                onValueChange={(value) => handleInputChange("gasFluorado", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SI">SI</SelectItem>
                  <SelectItem value="NO">NO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="directiva_equipos">Clasificación según Reglamento Equipos a Presión</Label>
              <Input 
                id="directiva_equipos" 
                placeholder="Clasificación" 
                defaultValue={(refrigerantesPropiedades as any)[refrigerante]?.directivaEquipos || ""}
                onChange={(e) => handleInputChange("directivaEquipos", e.target.value)}
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
