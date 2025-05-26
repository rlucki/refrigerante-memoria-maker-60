import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postalCodeToCommunity } from "@/data/postalCodeMapping";

/* -----------------------------------------------------------
   DESCRIPTORES (version reducida; reemplaza con tus textos)  
----------------------------------------------------------- */
const reglamentosRSIF = {
  "RD 552/2019": "Real Decreto 552/2019 …",
  "RD 138/2011": "Real Decreto 138/2011 …",
  "RD 3099/1977": "Real Decreto 3099/1977 …",
  "Decreto 3214/1971": "Decreto 3214/1971 …",
};
const additionalRSIFText = {
  RD_552_2019_antiguo: "RD 552/2019 (disposiciones transitorias)…",
};
const reglamentosAutonomicos = {
  "Decret 192/2023": "Decret 192/2023 …",
  "Decreto-Ley 4/2023": "Decreto-Ley 4/2023 …",
  "Orden EEI/1036/2021": "Orden EEI/1036/2021 …",
};
const normativasSiempreAplican = {
  "RD 709/2015": "Real Decreto 709/2015 …",
  "RD 842/2002": "Real Decreto 842/2002 …",
};
const normativasGasesFluorados = {
  "RD 115/2017": "Real Decreto 115/2017 …",
  "Reglamento (UE) 2024/573": "Reglamento (UE) 2024/573 …",
};
const normativaEdificacion = {
  "RD 314/2006": "Real Decreto 314/2006 …",
  "RD 1371/2007": "Real Decreto 1371/2007 …",
  "RD 732/2019": "Real Decreto 732/2019 …",
};
const normativaLegionela = {
  "RD 487/2022": "Real Decreto 487/2022 …",
  "RD 614/2024": "Real Decreto 614/2024 …",
};
const normativaSeguridadSalud = {
  "Ley 31/1995": "Ley 31/1995 …",
  "RD 485/1997": "Real Decreto 485/1997 …",
  "RD 1627/1997": "Real Decreto 1627/1997 …",
};

/* -----------------------------------------------------------
   PROPS
----------------------------------------------------------- */
interface NormativaSectionProps {
  gasFluorado: string; // "SI" | "NO"
  codigoPostal?: string;
  onNormativaChange?: (field: string, value: any) => void;
}

/* -----------------------------------------------------------
   COMPONENTE
----------------------------------------------------------- */
const NormativaSection: React.FC<NormativaSectionProps> = ({
  gasFluorado,
  codigoPostal,
  onNormativaChange,
}) => {
  // estado principal
  const [ca, setCa] = useState("CATALUNYA");
  const [instNueva, setInstNueva] = useState("SI");
  const [periodo, setPeriodo] = useState("nueva");
  const [legionela, setLegionela] = useState("SI");

  /* tablas auxiliares */
  const comunidadesAutonomas = [
    { id: "ANDALUCIA", nombre: "ANDALUCÍA", normativa: "Decreto-Ley 4/2023", aplicaSiempre: true },
    { id: "CATALUNYA", nombre: "CATALUNYA", normativa: "Decret 192/2023", aplicaSiempre: true },
  ];
  const periodos = [
    { id: "entre_1971_1977", nombre: "Entre 1971 y 1977", rsif: "Decreto 3214/1971" },
    { id: "entre_1978_2011", nombre: "Entre 1978 y 2011", rsif: "RD 3099/1977" },
    { id: "entre_2012_2019", nombre: "Entre 2012 y 2019", rsif: "RD 138/2011" },
    { id: "desde_2020", nombre: "A partir de 2020", rsif: "RD 552/2019" },
    { id: "nueva", nombre: "Nueva", rsif: "RD 552/2019" },
  ];

  /* autocompletar comunidad */
  useEffect(() => {
    if (codigoPostal) setCa(postalCodeToCommunity(codigoPostal));
  }, [codigoPostal]);

  /* RSIF aplicable */
  const rsif = useMemo(() => {
    return instNueva === "NO" ? periodos.find(p => p.id === periodo)?.rsif || "RD 552/2019" : "RD 552/2019";
  }, [instNueva, periodo]);

  /* compilar normativa */
  const normativaCompleta = useMemo(() => {
    const o: any = {
      reglamentoRSIF: { title: "REGLAMENTOS DE INSTALACIONES FRIGORÍFICAS", regulations: [] },
      reglamentoAutonomico: { title: "NORMATIVA AUTONÓMICA", regulations: [] },
      normativasSiempreAplican: { title: "NORMATIVA QUE SIEMPRE APLICA", regulations: [] },
      gasesFluorados: { title: "NORMATIVA GASES FLUORADOS", regulations: [] },
      edificacion: { title: "NORMATIVA EDIFICACIÓN", regulations: [] },
      legionela: { title: "NORMATIVA LEGIONELOSIS", regulations: [] },
      seguridadSalud: { title: "NORMATIVA SEGURIDAD Y SALUD", regulations: [] },
    };

    // RSIF
    if (instNueva === "NO" && rsif !== "RD 552/2019") {
      o.reglamentoRSIF.regulations.push({ name: rsif, description: reglamentosRSIF[rsif] });
      o.reglamentoRSIF.regulations.push({ name: "RD 552/2019", description: additionalRSIFText.RD_552_2019_antiguo });
    } else {
      o.reglamentoRSIF.regulations.push({ name: "RD 552/2019", description: reglamentosRSIF["RD 552/2019"] });
    }

    // autonómica
    const caObj = comunidadesAutonomas.find(c => c.id === ca);
    if (caObj && (caObj.aplicaSiempre || instNueva === "NO")) {
      o.reglamentoAutonomico.regulations.push({ name: caObj.normativa, description: reglamentosAutonomicos[caObj.normativa] });
    }

    // siempre aplica
    Object.entries(normativasSiempreAplican).forEach(([n, d]) => o.normativasSiempreAplican.regulations.push({ name: n, description: d }));

    // gases fluorados
    if (gasFluorado.trim().toUpperCase() === "SI") Object.entries(normativasGasesFluorados).forEach(([n, d]) => o.gasesFluorados.regulations.push({ name: n, description: d }));

    // edificación
    Object.entries(normativaEdificacion).forEach(([n, d]) => o.edificacion.regulations.push({ name: n, description: d }));

    // legionela
    if (legionela === "SI") Object.entries(normativaLegionela).forEach(([n, d]) => o.legionela.regulations.push({ name: n, description: d }));

    // seguridad y salud
    Object.entries(normativaSeguridadSalud).forEach(([n, d]) => o.seguridadSalud.regulations.push({ name: n, description: d }));

    return o;
  }, [ca, instNueva, periodo, legionela, gasFluorado, rsif]);

  // notificar al padre
  useEffect(() => { onNormativaChange?.("normativaCompleta", normativaCompleta); }, [normativaCompleta, onNormativaChange]);

  const R = (arr: any[]) => arr.map((r, i) => (
    <p key={i} className="text-sm text-gray-500">
      {r.name} – {r.description}
    </p>
  ));

  /* JSX */
  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-lg font-semibold">NORMATIVA APLICABLE</h3>

      {/* Comunidad autonoma y normativa autonómica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Comunidad Autónoma</Label>
          <Input readOnly className="bg-gray-50" value={comunidadesAutonomas.find(c => c.id === ca)?.nombre || ""} />
        </div>
        <div className="space-y-2">
          <Label>Normativa autonómica</Label>
          <Input readOnly className="bg-gray-50" value={normativaCompleta.reglamentoAutonomico.regulations[0]?.name || "No aplica"} />
        </
