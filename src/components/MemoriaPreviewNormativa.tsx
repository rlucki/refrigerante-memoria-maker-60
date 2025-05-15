
import React from "react";

interface RegulationItem {
  name: string;
  description: string;
}

interface RegulationCategory {
  title: string;
  regulations: RegulationItem[];
}

interface NormativaData {
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
    normativaCompleta?: NormativaData | null;
    comunidadAutonoma?: string;
    instalacionNueva?: string;
    periodoInstalacion?: string;
    aplicaLegionela?: string;
    aplicaGasesFluorados?: string;
    rsifAplicable?: string;
    encabezado?: string;
  };
  pageNumber?: number;
  companyLogo?: string;
  clienteLogo?: string;
}

const MemoriaPreviewNormativa: React.FC<MemoriaPreviewNormativaProps> = ({ 
  data,
  pageNumber = 4,
  companyLogo,
  clienteLogo
}) => {
  // Si no hay datos de normativa, mostrar un conjunto predeterminado
  const defaultNormativa = {
    reglamentoRSIF: {
      title: "REGLAMENTOS DE INSTALACIONES FRIGORÍFICAS",
      regulations: [
        {
          name: "RD 552/2019",
          description: "Real Decreto 552/2019, de 27 de septiembre, por el que se aprueban el Reglamento de seguridad para instalaciones frigoríficas y sus instrucciones técnicas complementarias. Es el Reglamento que se encuentra en vigor desde el 2 de enero de 2020."
        }
      ]
    },
    reglamentoAutonomico: {
      title: "NORMATIVA AUTONÓMICA",
      regulations: [
        {
          name: "Decret 192/2023",
          description: "Decret 192/2023, de 7 de noviembre, de la Seguretat Industrial dels Establiments, les Instal·lacions i els Productes, publicada en el Diari Oficial de la Generalitat de Catalunya (DOGC) n.º 9037 el 9 de noviembre de 2023. Este Decret deroga, entre otras, las Instruccions 1/2015, 2/2015 y 1/2019."
        }
      ]
    },
    normativasSiempreAplican: {
      title: "NORMATIVA QUE SIEMPRE APLICA",
      regulations: [
        {
          name: "RD 709/2015",
          description: "Real Decreto 709/2015, de 24 de julio, por el que se dictan las disposiciones de aplicación de la Directiva del Parlamento Europeo y del Consejo, 2014/68/UE, relativa a la armonización de las legislaciones de los Estados miembros sobre la comercialización de equipos a presión, y que deroga la Directiva 97/23/CE."
        },
        {
          name: "RD 842/2002",
          description: "Real Decreto 842/2002, de 2 de agosto, por el que se aprueba el Reglamento Electrotécnico para Baja Tensión y sus instrucciones técnicas complementarias."
        }
      ]
    },
    edificacion: {
      title: "NORMATIVA EDIFICACIÓN",
      regulations: [
        {
          name: "RD 314/2006",
          description: "Real Decreto 314/2006, de 17 de marzo, por el que se aprueba el Código Técnico de la Edificación y modificaciones posteriores."
        },
        {
          name: "RD 1371/2007",
          description: "Real Decreto 1371/2007, de 19 de octubre, por el que se aprueba el documento básico \"DB-HR Protección frente al ruido\" del Código Técnico de la Edificación y se modifica el RD 314/2006."
        },
        {
          name: "RD 732/2019",
          description: "Real Decreto 732/2019, de 20 de diciembre, por el que se modifica el Código Técnico de la Edificación, aprobado por el RD 314/2006."
        }
      ]
    },
    legionela: {
      title: "NORMATIVA LEGIONELOSIS",
      regulations: [
        {
          name: "RD 487/2022",
          description: "Real Decreto 487/2022, de 21 de junio, por el que se establecen los requisitos sanitarios para la prevención y el control de la legionelosis."
        },
        {
          name: "RD 614/2024",
          description: "Real Decreto 614/2024, de 2 de julio, por el que se modifica el Real Decreto 487/2022, de 21 de junio."
        }
      ]
    },
    seguridadSalud: {
      title: "NORMATIVA SEGURIDAD Y SALUD",
      regulations: [
        {
          name: "Ley 31/1995",
          description: "Ley 31/1995 de 8 de noviembre de Prevención de Riesgos Laborales."
        },
        {
          name: "RD 485/1997",
          description: "Real Decreto 485/1997, de 14 de abril de 1997, sobre disposiciones mínimas en materia de señalización y salud en el trabajo."
        },
        {
          name: "RD 1627/1997",
          description: "Real Decreto 1627/1997, de 24 de octubre, por el que se establecen disposiciones mínimas de seguridad y salud en las obras de construcción. Transpone la Directiva Europea 92/57/CEE, de 24 de junio."
        }
      ]
    },
    gasesFluorados: {
      title: "NORMATIVA GASES FLUORADOS",
      regulations: []
    }
  };
  
  const normativa = data.normativaCompleta || defaultNormativa;
  
  // Función para renderizar categorías de regulaciones con su título
  const renderRegulationCategory = (category: RegulationCategory) => {
    if (!category.regulations || category.regulations.length === 0) return null;
    
    return (
      <div className="mb-4 avoid-break">
        <h4 className="font-semibold text-base mb-2 page-break-after">{category.title}</h4>
        <ul className="list-none pl-0 space-y-3">
          {category.regulations.map((reg, index) => (
            <li key={index} className="flex flex-col avoid-break">
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
    <div className="mb-8 max-w-[595px] mx-auto bg-white min-h-[842px] relative memory-preview-page">
      {/* Header */}
      <div className="header-content">
        {data.encabezado && (
          <div className="text-center mb-6">
            {data.encabezado.split('\n').map((line, i) => (
              <p key={i} className="font-bold">{line}</p>
            ))}
          </div>
        )}
      </div>
      
      {/* Content container with padding to prevent overlap with header/footer */}
      <div className="content-container text-content">
        {/* Sección 8 - NORMATIVA DE APLICACIÓN */}
        <div className="mb-6">
          <h3 className="text-lg font-bold page-break-after">8. NORMATIVA DE APLICACIÓN</h3>
          <p className="text-sm mt-3 mb-4">
            Para la elaboración de este documento y para la ejecución de la instalación, se deberán tener en cuenta, 
            entre otras, las siguientes disposiciones:
          </p>

          <div className="space-y-4 text-sm">
            {renderRegulationCategory(normativa.reglamentoRSIF)}
            {renderRegulationCategory(normativa.reglamentoAutonomico)}
            {renderRegulationCategory(normativa.normativasSiempreAplican)}
            {renderRegulationCategory(normativa.gasesFluorados)}
            {renderRegulationCategory(normativa.edificacion)}
            {renderRegulationCategory(normativa.legionela)}
            {renderRegulationCategory(normativa.seguridadSalud)}
          </div>
        </div>
      </div>

      {/* Footer with logos and page number */}
      <div className="footer-content">
        <div className="flex justify-between items-center">
          {companyLogo && (
            <img 
              src={companyLogo} 
              alt="Logo Empresa" 
              className="h-8 object-contain" 
            />
          )}
          {clienteLogo && (
            <img 
              src={clienteLogo} 
              alt="Logo Cliente" 
              className="h-8 object-contain" 
            />
          )}
        </div>
        <div className="text-right mt-2">
          <p className="text-xs text-gray-500">Página {pageNumber} de 64</p>
        </div>
      </div>
    </div>
  );
};

export default MemoriaPreviewNormativa;
