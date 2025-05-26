
import React from "react";
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
import { 
  comunidadesAutonomas, 
  periodoInstalacion, 
  useNormativaLogic 
} from "./NormativaLogic";

interface NormativaDisplayProps {
  onChange?: (field: string, value: any) => void;
  aplicaGasesFluorados?: string;
  codigoPostal?: string;
  onNormativaChange?: (field: string, value: any) => void;
}

const NormativaDisplay: React.FC<NormativaDisplayProps> = ({ 
  onChange, 
  aplicaGasesFluorados, 
  codigoPostal, 
  onNormativaChange 
}) => {
  console.log("🔍 NormativaDisplay received aplicaGasesFluorados:", aplicaGasesFluorados);
  
  const {
    comunidadAutonoma,
    instalacionNueva,
    periodoInstalacionSeleccionado,
    aplicaLegionela,
    rsifAplicable,
    handleInstalacionNuevaChange,
    getNormativaAutonomica,
    getAplicableRegulations,
    setAplicaLegionela,
    setPeriodoInstalacionSeleccionado
  } = useNormativaLogic(aplicaGasesFluorados, codigoPostal, onNormativaChange);

  // Force synchronization of gas fluorado value
  const gasesFlooradosAplica = aplicaGasesFluorados === "SI";

  // Render a normativa section with its regulations
  const renderNormativaSection = (title: string, regulations: any[]) => {
    if (regulations.length === 0) return null;
    
    return (
      <div className="space-y-2 mt-4">
        <Label className="font-semibold">{title}</Label>
        {regulations.map((reg, index) => (
          <p key={index} className="text-sm text-gray-500">{reg.name} - {reg.description}</p>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">NORMATIVA APLICABLE</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="comunidad_autonoma_display">Comunidad Autónoma (automático según C.P.)</Label>
            <Input 
              id="comunidad_autonoma_display"
              value={comunidadesAutonomas.find(c => c.id === comunidadAutonoma)?.nombre || ""}
              readOnly
              className="bg-gray-50"
            />
            {codigoPostal && (
              <p className="text-sm text-green-600">✓ Detectado automáticamente desde C.P. {codigoPostal}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="normativa_autonomica">Normativa Autonómica</Label>
            <Input 
              id="normativa_autonomica" 
              placeholder="Normativa" 
              value={getNormativaAutonomica()}
              readOnly
              className="bg-gray-50"
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
        
        {/* Dynamic preview section with detailed gases fluorados info */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* RSIF Section */}
              {getAplicableRegulations().reglamentoRSIF.regulations.length > 0 && (
                <div className="space-y-2">
                  <Label className="font-semibold">REGLAMENTOS DE INSTALACIONES FRIGORÍFICAS</Label>
                  {getAplicableRegulations().reglamentoRSIF.regulations.map((reg, index) => (
                    <p key={index} className="text-sm text-gray-500">{reg.name} - {reg.description}</p>
                  ))}
                </div>
              )}
              
              {/* Autonomic Section */}
              {getAplicableRegulations().reglamentoAutonomico.regulations.length > 0 && (
                <div className="space-y-2">
                  <Label className="font-semibold">NORMATIVA AUTONÓMICA</Label>
                  {getAplicableRegulations().reglamentoAutonomico.regulations.map((reg, index) => (
                    <p key={index} className="text-sm text-gray-500">{reg.name} - {reg.description}</p>
                  ))}
                </div>
              )}
              
              {/* Always Apply Section */}
              <div className="space-y-2">
                <Label className="font-semibold">NORMATIVA QUE SIEMPRE APLICA</Label>
                {getAplicableRegulations().normativasSiempreAplican.regulations.map((reg, index) => (
                  <p key={index} className="text-sm text-gray-500">{reg.name} - {reg.description}</p>
                ))}
              </div>
              
              {/* Gases Fluorados Section - FIXED */}
              <div className="space-y-2">
                <Label className="font-semibold">NORMATIVA GASES FLUORADOS</Label>
                <Input 
                  value={gasesFlooradosAplica ? "SI (Automático según refrigerante)" : "NO (Automático según refrigerante)"}
                  readOnly
                  className="bg-gray-50"
                />
                {!gasesFlooradosAplica && (
                  <p className="text-sm text-gray-500 mt-2">No aplica - Refrigerante no es gas fluorado</p>
                )}
                {gasesFlooradosAplica && (
                  <>
                    <p className="text-sm text-green-600 mt-2">✓ Aplica - Refrigerante es gas fluorado</p>
                    {getAplicableRegulations().gasesFluorados.regulations.map((reg, index) => (
                      <p key={index} className="text-sm text-gray-500">{reg.name} - {reg.description}</p>
                    ))}
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Edificación Section */}
              <div className="space-y-2">
                <Label className="font-semibold">NORMATIVA EDIFICACIÓN</Label>
                {getAplicableRegulations().edificacion.regulations.map((reg, index) => (
                  <p key={index} className="text-sm text-gray-500">{reg.name} - {reg.description}</p>
                ))}
              </div>
              
              {/* Legionela Section */}
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
                {aplicaLegionela === "SI" && (
                  getAplicableRegulations().legionela.regulations.map((reg, index) => (
                    <p key={index} className="text-sm text-gray-500">{reg.name} - {reg.description}</p>
                  ))
                )}
                {aplicaLegionela === "NO" && (
                  <p className="text-sm text-gray-500 mt-2">No aplica</p>
                )}
              </div>
              
              {/* Seguridad y Salud Section */}
              <div className="space-y-2">
                <Label className="font-semibold">NORMATIVA SEGURIDAD Y SALUD</Label>
                {getAplicableRegulations().seguridadSalud.regulations.map((reg, index) => (
                  <p key={index} className="text-sm text-gray-500">{reg.name} - {reg.description}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Hidden input to store the full regulation data for form submission */}
        <input 
          type="hidden" 
          id="normativa_completa" 
          name="normativa_completa" 
          value={JSON.stringify(getAplicableRegulations())} 
        />
      </div>
    </Card>
  );
};

export default NormativaDisplay;
