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

/* ------------------------------------------------------------------------- */
/*  DESCRIPTORES DE NORMATIVA  (recortados para el ejemplo)                  */
/* ------------------------------------------------------------------------- */
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

/* ------------------------------------------------------------------------- */
interface NormativaSectionProps {
  gasFluorado: string;            // "SI" | "NO"
  codigoPostal?: string;          // para auto‑detección de C.A.
  onNormativaChange?: (field: string, value: any) => void;
}

/* ------------------------------------------------------------------------- */
const NormativaSection: React.FC<NormativaSectionProps> = ({
  gasFluorado,
  codigoPostal,
  onNormativaChange,
}) => {
  /* Estado interno mínimo */
  const [comunidadAutonoma, setComunidadAutonoma] = useState("CATALUNYA");
  const [instalacionNueva, setInstalacionNueva] = useState("SI");
  const [periodoInstalacion, setPeriodoInstalacion] = useState("nueva");
  const [aplicaLegionela, setAplicaLegionela] = useState("SI");

  /* Tablas auxiliares resumidas */
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

  /* Detectar comunidad desde C.P. */
  useEffect(() => {
    if (codigoPostal) {
      setComunidadAutonoma(postalCodeToCommunity(codigoPostal));
    }
  }, [codigoPostal]);

  /* RSIF según periodo */
  const rsifAplicable = useMemo(() => {
    if (instalacionNueva === "NO") return periodos.find(p => p.id === periodoInstalacion)?.rsif || "RD 552/2019";
    return "RD 552/2019";
  }, [instalacionNueva, periodoInstalacion]);

  /* ------------ compilar normativa completa (useMemo) ------------------ */
  const normativaCompleta = useMemo(() => {
    const out = {
      reglamentoRSIF: { title: "REGLAMENTOS DE INSTALACIONES FRIGORÍFICAS", regulations: [] as any[] },
      reglamentoAutonomico: { title: "NORMATIVA AUTONÓMICA", regulations: [] as any[] },
      normativasSiempreAplican: { title: "NORMATIVA QUE SIEMPRE APLICA", regulations: [] as any[] },
      gasesFluorados: { title: "NORMATIVA GASES FLUORADOS", regulations: [] as any[] },
      edificacion: { title: "NORMATIVA EDIFICACIÓN", regulations: [] as any[] },
      legionela: { title: "NORMATIVA LEGIONELOSIS", regulations: [] as any[] },
      seguridadSalud: { title: "NORMATIVA SEGURIDAD Y SALUD", regulations: [] as any[] },
    };

    /* RSIF */
    if (instalacionNueva === "NO" && rsifAplicable !== "RD 552/2019") {
      out.reglamentoRSIF.regulations.push({ name: rsifAplicable, description: reglamentosRSIF[rsifAplicable] });
      out.reglamentoRSIF.regulations.push({ name: "RD 552/2019", description: additionalRSIFText.RD_552_2019_antiguo });
    } else {
      out.reglamentoRSIF.regulations.push({ name: "RD 552/2019", description: reglamentosRSIF["RD 552/2019"] });
    }

    /* Autonómica */
    const ca = comunidadesAutonomas.find(c => c.id === comunidadAutonoma);
    if (ca && (ca.aplicaSiempre || instalacionNueva === "NO")) {
      out.reglamentoAutonomico.regulations.push({ name: ca.normativa, description: reglamentosAutonomicos[ca.normativa] });
    }

    /* Siempre aplica */
    Object.entries(normativasSiempreAplican).forEach(([n, d]) => out.normativasSiempreAplican.regulations.push({ name: n, description: d }));

    /* Gases fluorados */
    if ((gasFluorado || "").trim().toUpperCase() === "SI") {
      Object.entries(normativasGasesFluorados).forEach(([n, d]) => out.gasesFluorados.regulations.push({ name: n, description: d }));
    }

    /* Edificación */
    Object.entries(normativaEdificacion).forEach(([n, d]) => out.edificacion.regulations.push({ name: n, description: d }));

    /* Legionela */
    if (aplicaLegionela === "SI") {
      Object.entries(normativaLegionela).forEach(([n, d]) => out.legionela.regulations.push({ name: n, description: d }));
    }

    /* Seguridad y salud */
    Object.entries(normativaSeguridadSalud).forEach(([n, d]) => out.seguridadSalud.regulations.push({ name: n, description: d }));

    return out;
  }, [comunidadAutonoma, instalacionNueva, periodoInstalacion, aplicaLegionela, gasFluorado, rsifAplicable]);

  /* Informar al padre */
  useEffect(() => {
    onNormativaChange?.("normativaCompleta", normativaCompleta);
  }, [normativaCompleta, onNormativaChange]);

  const renderRegs = (arr: any[]) => arr.map((r, i) => <p key={i} className="text-sm text-gray-500">{r.name} – {r.description}</p>);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">NORMATIVA APLICABLE</h3>

      {/* Comunidad Autónoma / Normativa autonómica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Comunidad Autónoma (auto C.P.)</Label>
          <Input readOnly className="bg-gray-50" value={comunidadesAutonomas.find(c => c.id === comunidadAutonoma)?.nombre || ""} />
        </div>
        <div className="space-y-2">
          <Label>Normativa autonómica</Label>
          <Input readOnly className="bg-gray
