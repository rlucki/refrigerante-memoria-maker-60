
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { comunidadesAutonomas, periodoInstalacion } from "../constants/regiones";
import { getNormativaAutonomica } from "../utils/normativaUtils";

interface NormativaSelectorSectionProps {
  comunidadAutonoma: string;
  setComunidadAutonoma: (value: string) => void;
  instalacionNueva: string;
  setInstalacionNueva: (value: string) => void;
  periodoInstalacionSeleccionado: string;
  setPeriodoInstalacionSeleccionado: (value: string) => void;
  rsifAplicable: string;
  aplicaLegionela: string;
  setAplicaLegionela: (value: string) => void;
  aplicaGasesFluorados: string;
  setAplicaGasesFluorados: (value: string) => void;
  isRefrigeranteFluorado: boolean;
  isRefrigeranteNatural: boolean;
}

const NormativaSelectorSection = ({ 
  comunidadAutonoma,
  setComunidadAutonoma,
  instalacionNueva,
  setInstalacionNueva,
  periodoInstalacionSeleccionado,
  setPeriodoInstalacionSeleccionado,
  rsifAplicable,
  aplicaLegionela,
  setAplicaLegionela,
  aplicaGasesFluorados,
  setAplicaGasesFluorados,
  isRefrigeranteFluorado,
  isRefrigeranteNatural
}: NormativaSelectorSectionProps) => {

  // Handle installation nueva change
  const handleInstalacionNuevaChange = (value: string) => {
    setInstalacionNueva(value);
  };

  return (
    <>
      <h3 className="text-lg font-medium mb-4">NORMATIVA APLICABLE</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="comunidad_autonoma_select">Comunidad Autónoma (detectada por C.P.)</Label>
          <Select 
            value={comunidadAutonoma} 
            onValueChange={setComunidadAutonoma}
            id="comunidad_autonoma_select"
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar comunidad autónoma" />
            </SelectTrigger>
            <SelectContent>
              {comunidadesAutonomas.map(comunidad => (
                <SelectItem key={comunidad.id} value={comunidad.id}>
                  {comunidad.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="normativa_autonomica">Normativa Autonómica</Label>
          <Input 
            id="normativa_autonomica" 
            placeholder="Normativa" 
            value={getNormativaAutonomica(comunidadAutonoma, instalacionNueva)}
            readOnly
          />
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="instalacion_nueva_select">Instalación nueva</Label>
          <Select 
            value={instalacionNueva} 
            onValueChange={handleInstalacionNuevaChange}
            id="instalacion_nueva_select"
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
          <Label htmlFor="ano_instalacion_select">Año instalación</Label>
          <Select 
            value={periodoInstalacionSeleccionado}
            onValueChange={setPeriodoInstalacionSeleccionado}
            id="ano_instalacion_select"
            disabled={instalacionNueva === "SI"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {periodoInstalacion
                .filter(periodo => instalacionNueva === "SI" ? periodo.id === "nueva" : periodo.id !== "nueva")
                .map(periodo => (
                  <SelectItem key={periodo.id} value={periodo.id}>
                    {periodo.nombre}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rsif_aplicacion">RSIF aplicación</Label>
          <Input 
            id="rsif_aplicacion" 
            placeholder="RSIF" 
            value={rsifAplicable}
            readOnly
          />
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="font-semibold">NORMATIVA GASES FLUORADOS</Label>
          <Select 
            value={aplicaGasesFluorados} 
            onValueChange={setAplicaGasesFluorados}
            id="gases_fluorados_select"
            disabled={isRefrigeranteFluorado || isRefrigeranteNatural}
          >
            <SelectTrigger className={isRefrigeranteFluorado || isRefrigeranteNatural ? "bg-gray-100" : ""}>
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SI">SI</SelectItem>
              <SelectItem value="NO">NO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="font-semibold">NORMATIVA LEGIONELOSIS</Label>
          <Select 
            value={aplicaLegionela} 
            onValueChange={setAplicaLegionela}
            id="legionela_select"
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
      </div>
    </>
  );
};

export default NormativaSelectorSection;
