import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const NormativaSection = () => {
  const [comunidadAutonoma, setComunidadAutonoma] = useState("CATALUNYA");
  const [instalacionNueva, setInstalacionNueva] = useState("SI");
  const [periodoInstalacionSeleccionado, setPeriodoInstalacionSeleccionado] = useState("nueva");
  const [aplicaLegionela, setAplicaLegionela] = useState("SI");
  const [aplicaGasesFluorados, setAplicaGasesFluorados] = useState("NO");
  const [rsifAplicable, setRsifAplicable] = useState("RD 552/2019");
  
  const comunidadesAutonomas = [
    { id: "ANDALUCIA", nombre: "ANDALUCÍA", normativa: "Decreto-Ley 4/2023" },
    { id: "ARAGON", nombre: "ARAGÓN", normativa: "No aplica" },
    { id: "ASTURIAS", nombre: "ASTURIAS", normativa: "No aplica" },
    { id: "BALEARES", nombre: "ILLES BALEARS", normativa: "No aplica" },
    { id: "CANARIAS", nombre: "CANARIAS", normativa: "No aplica" },
    { id: "CANTABRIA", nombre: "CANTABRIA", normativa: "No aplica" },
    { id: "CASTILLA_LEON", nombre: "CASTILLA Y LEÓN", normativa: "Orden EEI/1036/2021" },
    { id: "CASTILLA_MANCHA", nombre: "CASTILLA-LA MANCHA", normativa: "No aplica" },
    { id: "CATALUNYA", nombre: "CATALUNYA", normativa: "Decret 192/2023" },
    { id: "VALENCIA", nombre: "COM. VALENCIANA", normativa: "No aplica" },
    { id: "EXTREMADURA", nombre: "EXTREMADURA", normativa: "No aplica" },
    { id: "GALICIA", nombre: "GALICIA", normativa: "No aplica" },
    { id: "MADRID", nombre: "MADRID", normativa: "No aplica" },
    { id: "MURCIA", nombre: "MURCIA", normativa: "No aplica" },
    { id: "NAVARRA", nombre: "NAVARRA", normativa: "No aplica" },
    { id: "PAIS_VASCO", nombre: "PAÍS VASCO-EUSKADI", normativa: "No aplica" },
    { id: "LA_RIOJA", nombre: "LA RIOJA", normativa: "No aplica" },
    { id: "CEUTA", nombre: "CEUTA", normativa: "No aplica" },
    { id: "MELILLA", nombre: "MELILLA", normativa: "No aplica" },
  ];
  
  const periodoInstalacion = [
    { id: "entre_1971_1977", nombre: "Entre 1971 y 1977", rsif: "Decreto 3214/1971" },
    { id: "entre_1978_2011", nombre: "Entre 1978 y 2011", rsif: "RD 3099/1977" },
    { id: "entre_2012_2019", nombre: "Entre 2012 y 2019", rsif: "RD 138/2011" },
    { id: "desde_2020", nombre: "A partir de 2020", rsif: "RD 552/2019" },
    { id: "nueva", nombre: "Nueva", rsif: "RD 552/2019" },
  ];
  
  // Update RSIF when the installation period or new installation status changes
  useEffect(() => {
    // If it's a new installation, always use the latest RSIF
    if (instalacionNueva === "SI") {
      setRsifAplicable("RD 552/2019");
      setPeriodoInstalacionSeleccionado("nueva");
    } else {
      // Otherwise, set the RSIF based on the selected period
      const periodo = periodoInstalacion.find(p => p.id === periodoInstalacionSeleccionado);
      if (periodo) {
        setRsifAplicable(periodo.rsif);
      }
    }
  }, [instalacionNueva, periodoInstalacionSeleccionado]);
  
  const getNormativaAutonomica = () => {
    const comunidad = comunidadesAutonomas.find(c => c.id === comunidadAutonoma);
    return comunidad ? comunidad.normativa : "No aplica";
  };
  
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">NORMATIVA APLICABLE</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="comunidad_autonoma_select">Comunidad Autónoma</Label>
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
              value={getNormativaAutonomica()}
              readOnly
            />
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="instalacion_nueva_select">Instalación nueva</Label>
            <Select 
              value={instalacionNueva} 
              onValueChange={setInstalacionNueva}
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
                {periodoInstalacion.map(periodo => (
                  <SelectItem key={periodo.id} value={periodo.id}>
                    {periodo.nombre}
                  </SelectItem>
                ))}
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
        
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="siempre_aplica" checked={true} />
                <label
                  htmlFor="siempre_aplica"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Siempre aplica
                </label>
              </div>
              
              <div className="space-y-2">
                <Label>RD 709/2015</Label>
                <p className="text-sm text-gray-500">Real Decreto 709/2015, de 24 de julio, por el que se dictan las disposiciones de aplicación de la Directiva del Parlamento Europeo y del Consejo, 2014/68/UE, relativa a la armonización de las legislaciones de los Estados miembros.</p>
              </div>
              
              <div className="space-y-2">
                <Label>RD 842/2002</Label>
                <p className="text-sm text-gray-500">Real Decreto 842/2002, de 2 de agosto, por el que se aprueba el Reglamento Electrotécnico para Baja Tensión y sus instrucciones técnicas complementarias.</p>
              </div>
              
              <div className="space-y-2">
                <Label className="font-medium">Gases fluorados</Label>
                <Select 
                  value={aplicaGasesFluorados} 
                  onValueChange={setAplicaGasesFluorados}
                  id="gases_fluorados_select"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SI">SI</SelectItem>
                    <SelectItem value="NO">NO</SelectItem>
                  </SelectContent>
                </Select>
                {aplicaGasesFluorados === "NO" && (
                  <p className="text-sm text-gray-500 mt-2">No aplica</p>
                )}
                {aplicaGasesFluorados === "SI" && (
                  <div className="space-y-2 mt-2">
                    <p className="text-sm text-gray-500">Reglamento (UE) 2024/573</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="font-medium">Edificación</Label>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">RD 314/2006</p>
                  <p className="text-sm text-gray-500">RD1371/2007</p>
                  <p className="text-sm text-gray-500">RD732/2019</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="font-medium">Legionela</Label>
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
                {aplicaLegionela === "SI" && (
                  <div className="space-y-2 mt-2">
                    <p className="text-sm text-gray-500">RD 487/2022</p>
                    <p className="text-sm text-gray-500">RD 614/2024</p>
                  </div>
                )}
                {aplicaLegionela === "NO" && (
                  <p className="text-sm text-gray-500 mt-2">No aplica</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="font-medium">Seguridad y Salud</Label>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Ley 31/1995</p>
                  <p className="text-sm text-gray-500">RD 485/1997</p>
                  <p className="text-sm text-gray-500">RD 1627/1997</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NormativaSection;
