import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { postalCodeToCommunity } from "@/data/postalCodeMapping";

// Descriptors (replace with full text)
const reglamentosRSIF = {
  "RD 552/2019": "Real Decreto 552/2019...",
  "RD 138/2011": "Real Decreto 138/2011...",
  "RD 3099/1977": "Real Decreto 3099/1977...",
  "Decreto 3214/1971": "Decreto 3214/1971...",
};
const additionalRSIFText = {
  RD_552_2019_antiguo: "Real Decreto 552/2019 (disposiciones transitorias)...",
};
const reglamentosAutonomicos = {
  "Decret 192/2023": "Decret 192/2023...",
  "Decreto-Ley 4/2023": "Decreto-Ley 4/2023...",
  "Orden EEI/1036/2021": "Orden EEI/1036/2021...",
};
const normativasSiempreAplican = {
  "RD 709/2015": "Real Decreto 709/2015...",
  "RD 842/2002": "Real Decreto 842/2002...",
};
const normativasGasesFluorados = {
  "RD 115/2017": "Real Decreto 115/2017...",
  "Reglamento (UE) 2024/573": "Reglamento (UE) 2024/573...",
};
const normativaEdificacion = {
  "RD 314/2006": "Real Decreto 314/2006...",
  "RD 1371/2007": "Real Decreto 1371/2007...",
  "RD 732/2019": "Real Decreto 732/2019...",
};
const normativaLegionela = {
  "RD 487/2022": "Real Decreto 487/2022...",
  "RD 614/2024": "Real Decreto 614/2024...",
};
const normativaSeguridadSalud = {
  "Ley 31/1995": "Ley 31/1995...",
  "RD 485/1997": "Real Decreto 485/1997...",
  "RD 1627/1997": "Real Decreto 1627/1997...",
};

interface NormativaSectionProps {
  gasFluorado: string; // "SI" or "NO"
  codigoPostal?: string;
  onNormativaChange?: (field: string, value: any) => void;
}

const NormativaSection: React.FC<NormativaSectionProps> = ({ gasFluorado, codigoPostal, onNormativaChange }) => {
  // State
  const [comunidad, setComunidad] = useState("CATALUNYA");
  const [instalacionNueva, setInstalacionNueva] = useState("SI");
  const [periodoInstalacion, setPeriodoInstalacion] = useState("nueva");
  const [aplicaLegionela, setAplicaLegionela] = useState("SI");

  // Lookup tables
  const comunidadesAutonomicas = useMemo(() => [
    { id: "ANDALUCIA", nombre: "ANDALUCÍA", normativa: "Decreto-Ley 4/2023", aplicaSiempre: true },
    { id: "CATALUNYA", nombre: "CATALUNYA", normativa: "Decret 192/2023", aplicaSiempre: true },
    // ... add others
  ], []);

  const periodos = useMemo(() => [
    { id: "entre_1971_1977", nombre: "Entre 1971 y 1977", rsif: "Decreto 3214/1971" },
    { id: "entre_1978_2011", nombre: "Entre 1978 y 2011", rsif: "RD 3099/1977" },
    { id: "entre_2012_2019", nombre: "Entre 2012 y 2019", rsif: "RD 138/2011" },
    { id: "desde_2020", nombre: "A partir de 2020", rsif: "RD 552/2019" },
    { id: "nueva", nombre: "Nueva", rsif: "RD 552/2019" },
  ], []);

  // Auto-detect community
  useEffect(() => {
    if (codigoPostal) {
      setComunidad(postalCodeToCommunity(codigoPostal));
    }
  }, [codigoPostal]);

  // Determine applicable RSIF
  const rsifAplicable = useMemo(() => {
    if (instalacionNueva === "NO") {
      return periodos.find(p => p.id === periodoInstalacion)?.rsif || "RD 552/2019";
    }
    return "RD 552/2019";
  }, [instalacionNueva, periodoInstalacion, periodos]);

  // Compile full regulations
  const normativaCompleta = useMemo(() => {
    const result: any = {
      reglamentoRSIF: { title: "REGLAMENTOS DE INSTALACIONES FRIGORÍFICAS", regulations: [] },
      reglamentoAutonomico: { title: "NORMATIVA AUTONÓMICA", regulations: [] },
      normativasSiempreAplican: { title: "NORMATIVA QUE SIEMPRE APLICA", regulations: [] },
      gasesFluorados: { title: "NORMATIVA GASES FLUORADOS", regulations: [] },
      edificacion: { title: "NORMATIVA EDIFICACIÓN", regulations: [] },
      legionela: { title: "NORMATIVA LEGIONELOSIS", regulations: [] },
      seguridadSalud: { title: "NORMATIVA SEGURIDAD Y SALUD", regulations: [] },
    };

    // RSIF rules
    if (instalacionNueva === "NO" && rsifAplicable !== "RD 552/2019") {
      result.reglamentoRSIF.regulations.push({ name: rsifAplicable, description: reglamentosRSIF[rsifAplicable] });
      result.reglamentoRSIF.regulations.push({ name: "RD 552/2019", description: additionalRSIFText.RD_552_2019_antiguo });
    } else {
      result.reglamentoRSIF.regulations.push({ name: "RD 552/2019", description: reglamentosRSIF["RD 552/2019"] });
    }

    // Autonomic
    const caObj = comunidadesAutonomicas.find(c => c.id === comunidad);
    if (caObj && (caObj.aplicaSiempre || instalacionNueva === "NO")) {
      result.reglamentoAutonomico.regulations.push({ name: caObj.normativa, description: reglamentosAutonomicos[caObj.normativa] });
    }

    // Always apply
    Object.entries(normativasSiempreAplican).forEach(([name, desc]) => {
      result.normativasSiempreAplican.regulations.push({ name, description: desc });
    });

    // Fluorinated gases
    if (gasFluorado.trim().toUpperCase() === "SI") {
      Object.entries(normativasGasesFluorados).forEach(([name, desc]) => {
        result.gasesFluorados.regulations.push({ name, description: desc });
      });
    }

    // Edificacion
    Object.entries(normativaEdificacion).forEach(([name, desc]) => {
      result.edificacion.regulations.push({ name, description: desc });
    });

    // Legionela
    if (aplicaLegionela === "SI") {
      Object.entries(normativaLegionela).forEach(([name, desc]) => {
        result.legionela.regulations.push({ name, description: desc });
      });
    }

    // Safety and health
    Object.entries(normativaSeguridadSalud).forEach(([name, desc]) => {
      result.seguridadSalud.regulations.push({ name, description: desc });
    });

    return result;
  }, [comunidad, instalacionNueva, periodoInstalacion, aplicaLegionela, gasFluorado, rsifAplicable, comunidadesAutonomicas]);

  // Notify parent
  useEffect(() => {
    onNormativaChange?.("normativaCompleta", normativaCompleta);
  }, [normativaCompleta, onNormativaChange]);

  const renderRegs = (regs: any[]) => regs.map((r, i) => <p key={i} className="text-sm text-gray-500">{r.name} – {r.description}</p>);

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-lg font-semibold">NORMATIVA APLICABLE</h3>

      {/* Community & Autonomic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Comunidad Autónoma</Label>
          <Input readOnly className="bg-gray-50" value={comunidadesAutonomicas.find(c => c.id === comunidad)?.nombre || ""} />
        </div>
        <div className="space-y-2">
          <Label>Normativa autonómica</Label>
          <Input readOnly className="bg-gray-50" value={normativaCompleta.reglamentoAutonomico.regulations[0]?.name || "No aplica"} />
        </div>
      </div>

      {/* Installation new & period */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>Instalación nueva</Label>
          <Select value={instalacionNueva} onValueChange={setInstalacionNueva}>
            <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="SI">SI</SelectItem>
              <SelectItem value="NO">NO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Año instalación</Label>
          <Select value={periodoInstalacion} onValueChange={setPeriodoInstalacion} disabled={instalacionNueva === "SI"}>
            <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
            <SelectContent>
              {periodos.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>RSIF aplicable</Label>
          <Input readOnly value={rsifAplicable} />
        </div>
      </div>

      {/* Fluorinated Gases Section */}
      <div className="space-y-2">
        <Label className="font-semibold">NORMATIVA GASES FLUORADOS</Label>
        <Input readOnly className="bg-gray-50" value={gasFluorado.trim().toUpperCase() === "SI" ? "SI (automático)" : "NO (automático)"} />
        {gasFluorado.trim().toUpperCase() === "SI" && <div className="mt-2">{renderRegs(normativaCompleta.gasesFluorados.regulations)}</div>}
        {gasFluorado.trim().toUpperCase() === "NO" && <p className="text-sm text-gray-500 mt-2">No aplica – refrigerante no es gas fluorado</p>}
      </div>

      {/* Other blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div><Label className="font-semibold">REGLAMENTOS DE INSTALACIONES FRIGORÍFICAS</Label>{renderRegs(normativaCompleta.reglamentoRSIF.regulations)}</div>
          <div><Label className="font-semibold">NORMATIVA QUE SIEMPRE APLICA</Label>{renderRegs(normativaCompleta.normativasSiempreAplican.regulations)}</div>
        </div>
        <div className="space-y-6">
          <div>
            <Label className="font-semibold">NORMATIVA LEGIONELOSIS</Label>
            <Select value={aplicaLegionela} onValueChange={setAplicaLegionela}>
              <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SI">SI</SelectItem>
                <SelectItem value="NO">NO</SelectItem>
              </SelectContent>
            </Select>
            {aplicaLegionela === "SI" ? renderRegs(normativaCompleta.legionela.regulations) : <p className="text-sm text-gray-500 mt-2">No aplica</p>}
          </div>
          <div><Label className="font-semibold">NORMATIVA SEGURIDAD Y SALUD</Label>{renderRegs(normativaCompleta.seguridadSalud.regulations)}</div>
        </div>
      </div>

      {/* Hidden input with JSON */}
      <input type="hidden" name="normativa_completa" value={JSON.stringify(normativaCompleta)} />
    </Card>
  );
};

export default NormativaSection;