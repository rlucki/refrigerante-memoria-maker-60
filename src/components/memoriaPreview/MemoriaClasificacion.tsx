
import React from "react";

interface MemoriaClasificacionProps {
  data: {
    metodoEnfriamiento?: string;
    seguridadSistema?: string;
    categoriaLocal?: string;
    refrigerante?: string;
    composicionRefrigerante?: string;
    inflamabilidad?: string;
    toxicidad?: string;
    grupoSeguridad?: string;
    directivaEquipos?: string;
    pca?: string;
    agotamientoOzono?: string;
    limitePractico?: string;
    atelOdl?: string;
    limiteInflamabilidad?: string;
    temperaturaAutoignicion?: string;
    gasFluorado?: string;
    nivelInstalacion?: string;
  };
}

const MemClasificacion: React.FC<MemoriaClasificacionProps> = ({ data }) => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Sección 10 - CLASIFICACIÓN DE LA INSTALACIÓN */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">10. CLASIFICACIÓN DE LA INSTALACIÓN</h3>
          
          {/* Sección 10.1 - CLASIFICACIÓN DEL SISTEMA */}
          <div className="mt-4 mb-6">
            <h4 className="text-base font-bold">10.1. CLASIFICACIÓN DEL SISTEMA</h4>
            <p className="text-sm mt-2">
              Según lo especificado en el Artículo 6 del Capítulo II del Reglamento de Seguridad de Instalaciones 
              Frigoríficas (RSIF), existen dos grupos de clasificación:
            </p>
            
            <div className="mt-3 text-sm">
              <p className="font-medium">1.- Atendiendo al método de extracción de calor (enfriamiento) o cesión de calor (calentamiento) a la atmósfera o al medio a tratar:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <span className="font-medium">Sistemas directos:</span> cuando el evaporador o el condensador del sistema 
                  de refrigeración está en contacto directo con el medio que se enfría o calienta.
                </li>
                <li>
                  <span className="font-medium">Sistemas indirectos:</span> cuando el evaporador o el condensador del sistema 
                  de refrigeración, situado fuera del local en donde se extrae o cede calor al medio a tratar, enfría o 
                  calienta un fluido secundario que se hace circular por unos intercambiadores para enfriar o calentar el medio citado.
                </li>
              </ul>
            </div>
            
            <div className="mt-4 text-sm">
              <p className="font-medium">2.- Atendiendo a criterios de seguridad, los sistemas de refrigeración se clasifican en los siguientes tipos, según cuál sea su emplazamiento:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <span className="font-medium">Tipo 1:</span> Sistema de refrigeración con todas las partes que contengan 
                  refrigerante situadas en un espacio ocupado por personas.
                </li>
                <li>
                  <span className="font-medium">Tipo 2:</span> Sistema de refrigeración con los compresores, recipientes y 
                  condensadores situados en una sala de máquinas no ocupada por personas o al aire libre. Los enfriadores, 
                  las tuberías y las válvulas pueden estar situados en espacios ocupados por personas.
                </li>
                <li>
                  <span className="font-medium">Tipo 3:</span> Sistema de refrigeración con todas las partes que contienen 
                  refrigerante situado en una sala de máquinas no ocupada por personas o al aire libre.
                </li>
                <li>
                  <span className="font-medium">Tipo 4:</span> Sistema de refrigeración en el que todas las partes que contienen 
                  refrigerante están situadas en el interior de una envolvente ventilada.
                </li>
              </ul>
            </div>
            
            <div className="mt-6 text-sm border-t pt-4">
              <p className="font-medium">En esta instalación, la clasificación en función de los dos grupos es:</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <p className="font-medium">Atendiendo al método de enfriamiento:</p>
                </div>
                <div>
                  <p>{data.metodoEnfriamiento || "Sistema directo"}</p>
                </div>
                <div>
                  <p className="font-medium">Atendiendo a los criterios de seguridad del sistema:</p>
                </div>
                <div>
                  <p>{data.seguridadSistema || "Tipo 2"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaClasificacion;
