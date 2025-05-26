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
/*  DESCRIPTORES DE CADA BLOQUE DE NORMATIVA                                 */
/* ------------------------------------------------------------------------- */
// — Se mantienen tal cual estaban.                                            
//   Los he reducido al mínimo para aligerar, pero conserva tu contenido real. 
/* eslint‑disable max‑lines */
const reglamentosRSIF = {
  "RD 552/2019":
    "Real Decreto 552/2019, de 27 de septiembre, por el que se aprueban …", // recorta para ejemplo
  "RD 138/2011":
    "Real Decreto 138/2011, de 4 de febrero, por el que se aprueban …",
  "RD 3099/1977":
    "Real Decreto 3099/1977, de 8 de septiembre, por el que se aprueban …",
  "Decreto 3214/1971":
    "Decreto 3214/1971, de 28 de octubre, por el que se aprueba …",
};

const additionalRSIFText = {
  RD_552_2019_antiguo:
    "Real Decreto 552/2019, de 27 de septiembre … (disposiciones transitorias)",
};

const reglamentosAutonomicos = {
  "Decret 192/2023": "Decret 192/2023, de 7 de noviembre …",
  "Decreto-Ley 4/2023": "Decreto‑Ley 4/2023, de 6 de febrero …",
  "Orden EEI/1036/2021": "Orden EEI/1036/2021, de 6 de septiembre …",
};

const normativasSiempreAplican = {
  "RD 709/2015": "Real Decreto 709/2015, de 24 de julio …",
  "RD 842/2002": "Real Decreto 842/2002, de 2 de agosto …",
};

const normativasGasesFluorados = {
  "RD 115/2017": "Real Decreto 115/2017, de 17 de febrero …",
  "Reglamento (UE) 2024/573": "Reglamento (UE) 2024/573 del Parlamento Europeo …",
};

const normativaEdificacion = {
  "RD 314/2006": "Real Decreto 314/2006, de 17 de marzo …",
  "RD 1371/2007": "Real Decreto 1371/2007, de 19 de octubre …",
  "RD 732/2019": "Real Decreto 732/2019, de 20 de diciembre …",
};

const normativaLegionela = {
  "RD 487/2022": "Real Decreto 487/2022, de 21 de junio …",
  "RD 614/2024": "Real Decreto 614/2024, de 2 de julio …",
};

const normativaSeguridadSalud = {
  "Ley 31/1995": "Ley 31/1995 de 8 de noviembre …",
  "RD 485/1997": "Real Decreto 485/1997, de 14 de abril …",
  "RD 1627/1997": "Real Decreto 1627/1997, de 24 de octubre …",
};

/* ------------------------------------------------------------------------- */
/*  TIPOS                                                                    */
/* ------------------------------------------------------------------------- */
interface NormativaSectionProps {
  /** Valor automático proveniente del formulario (“SI” / “NO”). */
  gasFluorado: string;
  /** Para autocompletar comunidad según C.P. */
  codigoPostal?: string;
  /** Avisar al padre con la normativa completa serializada. */
  onNormativaChange?: (field: string, value: any) => void;
}

/* ------------------------------------------------------------------------- */
/*  COMPONENTE                                                               */
/* ------------------------------------------------------------------------- */
const NormativaSection: React.FC<NormativaSectionProps> = ({
  gasFluorado,
  codigoPostal,
  onNormativaChange,
}) => {
  /* --------------------------- estado interno --------------------------- */
  const [comunidadAutonoma, setComunidadAutonoma] = useState("CATALUNYA");
  const [instalacionNueva, setInstalacionNueva] = useState("SI");
  const [periodoInstalacion, setPeriodoInstalacion] = useState("nueva");
  const [aplicaLegionela, setAplicaLegionela] = useState("SI");

  /* ------------------------- tablas auxiliares -------------------------- */
  const comunidadesAutonomas = [
    { id: "ANDALUCIA", nombre: "ANDALUCÍA", normativa: "Decreto-Ley 4/2023", aplicaSiempre: true },
    { id: "CATALUNYA", nombre: "CATALUNYA", normativa: "Decret 192/2023", aplicaSiempre: true },
    /* … resto … */
  ];

  const periodos = [
    { id: "entre_1971_1977", nombre: "Entre 1971 y 1977", rsif: "Decreto 3214/1971" },
    { id: "entre_1978_2011", nombre: "Entre 1978 y 2011", rsif: "RD 3099/1977" },
    { id: "entre_2012_2019", nombre: "Entre 2012 y 2019", rsif: "RD 138/2011" },
    { id: "desde_2020", nombre: "A partir de 2020", rsif: "RD 552/2019" },
    { id: "nueva", nombre: "Nueva", rsif: "RD 552/2019" },
  ];

  /* --------------------------------------------------------------------- */
  /*  AUTODETECCIÓN DE C.A. SEGÚN CÓDIGO POSTAL                            */
  /* --------------------------------------------------------------------- */
  useEffect(() => {
    if (!codigoPostal) return;
    const ca = postalCodeToCommunity(codigoPostal);
    setComunidadAutonoma(ca);
  }, [codigoPostal]);

  /* --------------------------------------------------------------------- */
  /*  RSIF APLICABLE SEGÚN PERIODO / INSTALACIÓN NUEVA                     */
  /* --------------------------------------------------------------------- */
  const rsifAplicable = useMemo(() => {
    if (instalacionNueva === "NO") {
      return periodos.find((p) => p.id === periodoInstalacion)?.rsif ?? "RD 552/2019";
    }
    return "RD 552/2019";
  }, [instalacionNueva, periodoInstalacion]);

  /* --------------------------------------------------------------------- */
  /*  REGLAMENTOS CALCULADOS                                               */
  /* --------------------------------------------------------------------- */
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
      out.reglamentoRSIF.regulations.push({
        name: rsifAplicable,
        description: reglamentosRSIF[rsifAplicable as keyof typeof reglamentosRSIF],
      });
      out.reglamentoRSIF.regulations.push({
        name: "RD 552/2019",
        description: additionalRSIFText.RD_552_2019_antiguo,
      });
    } else {
      out.reglamentoRSIF.regulations.push({
        name: "RD 552/2019",
        description: reglamentosRSIF["RD 552/2019"],
      });
    }

    /* Autonómica */
    const ca = comunidadesAutonomas.find((c) => c.id === comunidadAutonoma);
    if (ca && (ca.aplicaSiempre || instalacionNueva === "NO")) {
      out.reglamentoAutonomico.regulations.push({
        name: ca.normativa,
        description: reglamentosAutonomicos[ca.normativa as keyof typeof reglamentosAutonomicos],
      });
    }

    /* Siempre aplica */
    Object.entries(normativasSiempreAplican).forEach(([name, description]) =>
      out.normativasSiempreAplican.regulations.push({ name, description })
    );

    /* Gases fluorados */
    const esFluorado = (gasFluorado || "").trim().toUpperCase() === "SI";
    if (esFluorado) {
      Object.entries(normativasGasesFluorados).forEach(([name, description]) =>
        out.gasesFluorados.regulations.push({ name, description })
      );
    }

    /* Edificación */
    Object.entries(n normativaEdificacion).forEach(([name, description]) =>
      out.edificacion.regulations.push({ name, description })
    );

    /* Legionela */
    if (aplicaLegionela === "SI") {
      Object.entries(n normativaLegionela).forEach(([name, description]) =>
        out.legionela.regulations.push({ name, description })
      );
    }

    /* Seguridad y salud */
    Object.entries(n normativaSeguridadSalud).forEach(([name, description]) =>
      out.seguridadSalud.regulations.push({ name, description })
    );

    return out;
  }, [comunidadAutonoma, instalacionNueva, periodoInstalacion, aplicaLegionela, gasFluorado, rsifAplicable]);

  /* Avisamos al padre */
  useEffect(() => {
    onNormativaChange?.("normativaCompleta", normativaCompleta);
  }, [normativaCompleta, onNormativaChange]);

  /* --------------------------------------------------------------------- */
  /*  HELPERS DE RENDER                                                    */
  /* --------------------------------------------------------------------- */
  const renderRegulations = (regs: any[]) =>
    regs.map((r, i) => (
      <p key={i} className="text-sm text-gray-500">
        {r.name} – {r.description}
      </p>
    ));

  /* --------------------------------------------------------------------- */
  /*  JSX                                                                  */
  /* --------------------------------------------------------------------- */
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">NORMATIVA APLICABLE</h3>

      {/* Comunidad autónoma (auto) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Comunidad Autónoma (auto C.P.)</Label>
          <Input readOnly className="bg-gray-50" value={comunidadesAutonomas.find((c) => c.id === comunidadAutonoma)?.nombre || ""} />
        </div>
        <div className="space-y-2">
          <Label>Normativa autonómica</Label>
          <Input readOnly className="bg-gray-50" value={normativaCompleta.reglamentoAutonomico.regulations[0]?.name ?? "No aplica"} />
        </div>
      </div>

      {/* Instalación nueva / año */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>Instalación nueva</Label>
          <Select value={instalacionNueva} onValueChange={setInstalacionNueva}>
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
          <Label>Año instalación</Label>
          <Select
            value={periodoInstalacion}
            onValueChange={setPeriodoInstalacion}
            disabled={instalacionNueva === "SI"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {periodos
                .filter((p) => (instalacionNueva === "SI" ? p.id === "nueva" : p.id !== "nueva"))
                .map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.nombre}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>RSIF aplicable</Label>
          <Input readOnly value={rsifAplicable} />
        </div>
      </div>

      {/* ---------- BLOQUE DE GASES FLUORADOS (read‑only, sincronizado) ------- */}
      <div className="mt-8 space-y-2">
        <Label className="font-semibold">NORMATIVA GASES FLUORADOS</Label>
        <Input
          readOnly
          className="bg-gray-50"
          value={
            (gasFluorado || "").trim().toUpperCase() === "SI"
              ? "SI (automático según refrigerante)"
              : "NO (automático según refrigerante)"
          }
        />
        {(gasFluorado || "").trim().toUpperCase() === "SI" && (
          <div className="space-y-1">{renderRegulations(normativaCompleta.gasesFluorados.regulations)}</div>
        )}
        {(gasFluorado || "").trim().toUpperCase() === "NO" && (
          <p className="text-sm text-gray-500">No aplica – refrigerante no es gas fluorado</p>
        )}
      </div>

      {/* --- RESTO DE BLOQUES (edificación, legionela, etc.) --- */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Izquierda */}
        <div className="space-y-6">
          <div>
            <Label className="font-semibold">REGLAMENTOS DE INSTALACIONES FRIGORÍFICAS</Label>
            {renderRegulations(normativaCompleta.reglamentoRSIF.regulations)}
          </div>
          <div>
            <Label className="font-semibold">NORMATIVA QUE SIEMPRE APLICA</Label>
            {renderRegulations(normativaCompleta.normativasSiempreAplican.regulations)}
          </div>
        </div>

        {/* Derecha */}
        <div className="space-y-6">
          <div>
            <Label className="font-semibold">NORMATIVA LEGIONELOSIS</Label>
            <Select value={aplicaLegionela} onValueChange={setAplicaLegionela}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SI">SI</SelectItem>
                <SelectItem value="NO">NO</SelectItem>
              </SelectContent>
            </Select>
            {aplicaLegionela === "SI" && renderRegulations(normativaCompleta.legionela.regulations)}
            {aplicaLegionela === "NO" && (
              <p className="text-sm text-gray-500 mt-2">No aplica</p>
            )}
          </div>
          <div>
            <Label className="font-semibold">NORMATIVA SEGURIDAD Y SALUD</Label>
            {renderRegulations(normativaCompleta.seguridadSalud.regulations)}
          </div>
        </div>
      </div>

      {/* Hidden field to enviar estructura completa si envías al backend */}
      <input type="hidden" name="normativa_completa" value={JSON.stringify(normativaCompleta)} />
    </Card>
  );
};

export default NormativaSection;
