import React from "react";

// -----------------------------------------------------------------------------
//  Tipos auxiliares
// -----------------------------------------------------------------------------
interface RegulationItem {
  name: string;
  description: string;
}

interface RegulationCategory {
  title: string;
  regulations: RegulationItem[];
}

export interface NormativaData {
  reglamentoRSIF: RegulationCategory;
  reglamentoAutonomico: RegulationCategory;
  normativasSiempreAplican: RegulationCategory;
  gasesFluorados: RegulationCategory;
  edificacion: RegulationCategory;
  legionela: RegulationCategory;
  seguridadSalud: RegulationCategory;
}

interface MemoriaPreviewNormativaProps {
  data: {
    /** Normativa ya procesada */
    normativaCompleta?: NormativaData | null;
    /** Valor "SI" / "NO" calculado */
    gasFluorado?: string;
    /** Flag explícito para normativa de gases */
    aplicaGasesFluorados?: string;
    /** Metadatos variados */
    comunidadAutonoma?: string;
    instalacionNueva?: string;
    periodoInstalacion?: string;
    aplicaLegionela?: string;
    rsifAplicable?: string;
    encabezado?: string;
  };
}

// ----------------------------------------------------------------------------
//  Default con TODAS las normativas
// ----------------------------------------------------------------------------
const defaultNormativa: NormativaData = {
  reglamentoRSIF: {
    title: "REGLAMENTOS DE INSTALACIONES FRIGORÍFICAS",
    regulations: [
      {
        name: "RD 552/2019",
        description:
          "Real Decreto 552/2019, de 27 de septiembre... Vigente desde el 2 de enero de 2020.",
      },
    ],
  },
  reglamentoAutonomico: {
    title: "NORMATIVA AUTONÓMICA",
    regulations: [
      {
        name: "Decret 192/2023",
        description: "Decret 192/2023, de 7 de noviembre...",
      },
    ],
  },
  normativasSiempreAplican: {
    title: "NORMATIVA QUE SIEMPRE APLICA",
    regulations: [
      { name: "RD 709/2015", description: "Real Decreto 709/2015..." },
      { name: "RD 842/2002", description: "Real Decreto 842/2002..." },
    ],
  },
  gasesFluorados: {
    title: "NORMATIVA GASES FLUORADOS",
    regulations: [
      {
        name: "RD 115/2017",
        description: "Real Decreto 115/2017...",
      },
      {
        name: "Reglamento (UE) 517/2014",
        description: "Reglamento (UE) n.º 517/2014...",
      },
    ],
  },
  edificacion: {
    title: "NORMATIVA EDIFICACIÓN",
    regulations: [
      { name: "RD 314/2006", description: "Real Decreto 314/2006..." },
      { name: "RD 1371/2007", description: "Real Decreto 1371/2007..." },
      { name: "RD 732/2019", description: "Real Decreto 732/2019..." },
    ],
  },
  legionela: {
    title: "NORMATIVA LEGIONELOSIS",
    regulations: [
      { name: "RD 487/2022", description: "Real Decreto 487/2022..." },
      { name: "RD 614/2024", description: "Real Decreto 614/2024..." },
    ],
  },
  seguridadSalud: {
    title: "NORMATIVA SEGURIDAD Y SALUD",
    regulations: [
      { name: "Ley 31/1995", description: "Ley 31/1995..." },
      { name: "RD 485/1997", description: "Real Decreto 485/1997..." },
      { name: "RD 1627/1997", description: "Real Decreto 1627/1997..." },
    ],
  },
};

// ----------------------------------------------------------------------------
//  Componente principal
// ----------------------------------------------------------------------------
const MemoriaPreviewNormativa: React.FC<MemoriaPreviewNormativaProps> = ({ data }) => {
  // Prioriza aplicaGasesFluorados, si no existe usa gasFluorado
  const aplicaFluorados =
    ((data.aplicaGasesFluorados || data.gasFluorado) || "").trim().toUpperCase() === "SI";

  console.log("🔍 Debug MemoriaPreviewNormativa:");
  console.log("  - aplicaGasesFluorados:", data.aplicaGasesFluorados);
  console.log("  - gasFluorado:", data.gasFluorado);
  console.log("  - aplicaFluorados:", aplicaFluorados);

  // Toma normativa completa o default
  const normativaBase = data.normativaCompleta || defaultNormativa;

  // Si no aplica, vacía esa categoría
  const normativa: NormativaData = !aplicaFluorados
    ? {
        ...normativaBase,
        gasesFluorados: { ...normativaBase.gasesFluorados, regulations: [] },
      }
    : normativaBase;

  const renderRegulationCategory = (category: RegulationCategory) => {
    if (!category.regulations?.length) return null;
    return (
      <div className="mb-6">
        <h4 className="font-semibold text-base mb-2" data-heading={category.title}>
          {category.title}
        </h4>
        <ul className="list-none pl-0 space-y-3">
          {category.regulations.map((reg, idx) => (
            <li key={idx} className="flex flex-col">
              <div className="flex items-start">
                <span className="text-xl mr-2">•</span>
                <div>
                  <p className="font-medium">{reg.name}</p>
                  <p className="text-justify">{reg.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="mb-8 mx-auto p-6">
      <section>
        <h3 className="text-lg font-bold mb-3" data-heading="10. REGLAMENTOS DE APLICACIÓN">
          10. REGLAMENTOS DE APLICACIÓN
        </h3>
        <p className="text-sm mb-4">
          Para la elaboración de este documento y para la ejecución de la instalación,
          se deberán tener en cuenta, entre otras, las siguientes disposiciones:
        </p>
        <div className="space-y-6 text-sm">
          {renderRegulationCategory(normativa.reglamentoRSIF)}
          {renderRegulationCategory(normativa.reglamentoAutonomico)}
          {renderRegulationCategory(normativa.normativasSiempreAplican)}
          {renderRegulationCategory(normativa.gasesFluorados)}
          {renderRegulationCategory(normativa.edificacion)}
          {renderRegulationCategory(normativa.legionela)}
          {renderRegulationCategory(normativa.seguridadSalud)}
        </div>
      </section>
    </div>
  );
};

export default MemoriaPreviewNormativa;
