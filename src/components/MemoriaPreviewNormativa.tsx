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
    /** Permite inyectar toda la normativa ya procesada si se desea */
    normativaCompleta?: NormativaData | null;
    /** Valor "SI" / "NO" calculado en el formulario a partir del refrigerante */
    gasFluorado?: string;
    /** Otros posibles metadatos (se mantienen por compatibilidad) */
    comunidadAutonoma?: string;
    instalacionNueva?: string;
    periodoInstalacion?: string;
    aplicaLegionela?: string;
    rsifAplicable?: string;
    encabezado?: string;
  };
}

// -----------------------------------------------------------------------------
//  Base por defecto con TODAS las normativas. Si el proyecto no es gas fluorado
//  vaciamos el array correspondiente durante el render para que no se muestre.
// -----------------------------------------------------------------------------
const defaultNormativa: NormativaData = {
  reglamentoRSIF: {
    title: "REGLAMENTOS DE INSTALACIONES FRIGORÍFICAS",
    regulations: [
      {
        name: "RD 552/2019",
        description:
          "Real Decreto 552/2019, de 27 de septiembre, por el que se aprueban el Reglamento de seguridad para instalaciones frigoríficas y sus instrucciones técnicas complementarias. Vigente desde el 2 de enero de 2020.",
      },
    ],
  },
  reglamentoAutonomico: {
    title: "NORMATIVA AUTONÓMICA",
    regulations: [
      {
        name: "Decret 192/2023",
        description:
          "Decret 192/2023, de 7 de noviembre, de la Seguretat Industrial dels Establiments, les Instal·lacions i els Productes (DOGC 9037 - 09/11/2023). Deroga las Instruccions 1/2015, 2/2015 y 1/2019, entre otras.",
      },
    ],
  },
  normativasSiempreAplican: {
    title: "NORMATIVA QUE SIEMPRE APLICA",
    regulations: [
      {
        name: "RD 709/2015",
        description:
          "Real Decreto 709/2015, de 24 de julio, aplicación de la Directiva 2014/68/UE sobre la comercialización de equipos a presión (deroga la 97/23/CE).",
      },
      {
        name: "RD 842/2002",
        description:
          "Real Decreto 842/2002, de 2 de agosto, Reglamento Electrotécnico para Baja Tensión y sus ITC.",
      },
    ],
  },
  gasesFluorados: {
    title: "NORMATIVA GASES FLUORADOS",
    regulations: [
      {
        name: "RD 115/2017",
        description:
          "Real Decreto 115/2017, de 17 de febrero, sobre la comercialización y manipulación de gases fluorados de efecto invernadero y equipos que los contienen.",
      },
      {
        name: "Reglamento (UE) 517/2014",
        description:
          "Reglamento (UE) n.º 517/2014 del Parlamento Europeo y del Consejo, de 16 de abril de 2014, sobre gases fluorados de efecto invernadero.",
      },
    ],
  },
  edificacion: {
    title: "NORMATIVA EDIFICACIÓN",
    regulations: [
      {
        name: "RD 314/2006",
        description:
          "Real Decreto 314/2006, de 17 de marzo, Código Técnico de la Edificación (y posteriores modificaciones).",
      },
      {
        name: "RD 1371/2007",
        description:
          "Real Decreto 1371/2007, de 19 de octubre, documento básico DB‑HR Protección frente al Ruido (modifica RD 314/2006).",
      },
      {
        name: "RD 732/2019",
        description:
          "Real Decreto 732/2019, de 20 de diciembre, que modifica el Código Técnico de la Edificación.",
      },
    ],
  },
  legionela: {
    title: "NORMATIVA LEGIONELOSIS",
    regulations: [
      {
        name: "RD 487/2022",
        description:
          "Real Decreto 487/2022, de 21 de junio, requisitos sanitarios para la prevención y control de la legionelosis.",
      },
      {
        name: "RD 614/2024",
        description:
          "Real Decreto 614/2024, de 2 de julio, que modifica el RD 487/2022.",
      },
    ],
  },
  seguridadSalud: {
    title: "NORMATIVA SEGURIDAD Y SALUD",
    regulations: [
      {
        name: "Ley 31/1995",
        description: "Ley 31/1995, de Prevención de Riesgos Laborales.",
      },
      {
        name: "RD 485/1997",
        description:
          "Real Decreto 485/1997, disposiciones mínimas en materia de señalización de seguridad y salud en el trabajo.",
      },
      {
        name: "RD 1627/1997",
        description:
          "Real Decreto 1627/1997, de 24 de octubre, disposiciones mínimas de seguridad y salud en las obras de construcción.",
      },
    ],
  },
};

// -----------------------------------------------------------------------------
//  Componente principal
// -----------------------------------------------------------------------------
const MemoriaPreviewNormativa: React.FC<MemoriaPreviewNormativaProps> = ({ data }) => {
  // ¿Aplica normativa de gases fluorados?
  const aplicaFluorados =
  (data.gasFluorado || "").trim().toUpperCase() === "SI";

  // Normativa base (prop o por defecto)
  const normativaBase = data.normativaCompleta || defaultNormativa;

  // Si no aplica gases fluorados vaciamos esa categoría para que no se pinte
  const normativa: NormativaData = !aplicaFluorados
    ? {
        ...normativaBase,
        gasesFluorados: { ...normativaBase.gasesFluorados, regulations: [] },
      }
    : normativaBase;

  // ---------------------------------------------------------------------------
  //  Utilidad para pintar cada categoría
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  //  Render JSX
  // ---------------------------------------------------------------------------
  return (
    <div className="mb-8 mx-auto p-6">
      {/* Sección 10 – Reglamentos */}
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
