
import React from "react";

interface MemoriaInstalacionProps {
  data: {
    nivelInstalacion?: string;
    descripcionInstalacion?: string;
  };
}

const MemoriaInstalacion: React.FC<MemoriaInstalacionProps> = ({ data }) => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Sección 11.4 - CLASIFICACIÓN DE LA INSTALACIÓN + 10.5 - SALA DE MÁQUINAS + 10.6 - RESUMEN */}
        <div className="mt-4 mb-6">
          <h4 className="text-base font-bold">11.4. CLASIFICACIÓN DE LA INSTALACIÓN</h4>
          <p className="text-sm mt-2">
            Según lo especificado en el Artículo 8 del Capítulo II del Reglamento de Seguridad de Instalaciones Frigoríficas (RSIF), las instalaciones frigoríficas se clasifican en función del riesgo potencial en las categorías siguientes:
          </p>
          
          <div className="mt-3 text-sm">
            <p className="font-medium">Nivel 1.</p>
            <p className="mt-1 text-justify">
              Instalaciones formadas por uno o varios sistemas frigoríficos independientes entre sí con una potencia eléctrica instalada en los compresores por cada sistema inferior o igual a 30 kW siempre que la suma total de las potencias eléctricas instaladas en los compresores frigoríficos, de todos los sistemas, no exceda de 100 kW, o por equipos o sistemas compactos de cualquier potencia, con condensador incorporado (no remoto), siempre que se trate de unidades enfriadoras de agua, de fluidos secundarios, bombas de calor, o que formen parte de las mismas y que en ambos casos utilicen refrigerantes de alta seguridad (L1), y que no refrigeren cámaras de atmósfera artificial de cualquier volumen, o conjuntos de las mismas.
            </p>
          </div>
          
          <div className="mt-3 text-sm">
            <p className="font-medium">Nivel 2.</p>
            <p className="mt-1 text-justify">
              Instalaciones formadas por uno o varios sistemas frigoríficos independientes entre sí con una potencia eléctrica instalada en los compresores superior a 30 kW en alguno de los sistemas, o que la suma total de las potencias eléctricas instaladas en los compresores frigoríficos exceda de 100 kW, o que enfríen cámaras de atmósfera artificial, o que utilicen refrigerantes de media y baja seguridad (L2 y L3).
            </p>
          </div>
          
          <div className="mt-3 text-sm">
            <p className="mt-1 text-justify">
              Diferentes sistemas de refrigeración configuran la misma instalación frigorífica cuando tienen en común alguno de los siguientes elementos o componentes:
            </p>
            <ul className="list-[lower-latin] pl-8 mt-2 space-y-1">
              <li>Equipos ubicados en una misma sala de máquinas o que atienden a un mismo espacio, como cámaras frigoríficas, salas de proceso, etc.</li>
              <li>Circuito de condensación</li>
            </ul>
          </div>
        </div>
        
        {/* Sección 11.5 - SALA DE MÁQUINAS */}
        <div className="mt-4 mb-6">
          <h4 className="text-base font-bold">11.5. SALA DE MÁQUINAS</h4>
          <p className="text-sm mt-2">
            Atendiendo la definición que da el Reglamento de Seguridad de Instalaciones Frigoríficas (RSIF), en el apartado 3.2 de su instrucción IF-01, (terminología):
          </p>
          
          <div className="mt-3 text-sm">
            <p className="font-medium">Sala de Máquinas</p>
            <p className="mt-1 text-justify">
              Espacio o recinto cerrado, ventilado por ventilación mecánica, sellado y aislado respecto a las zonas públicas y no accesible al público, destinado a la instalación de componentes del sistema de refrigeración o del sistema completo. Pueden instalarse otros equipos si son compatibles con los requisitos de seguridad del sistema de refrigeración. No tendrá consideración de espacio, local o recinto habitado a los efectos de establecer la carga máxima de refrigerante en la instalación frigorífica.
            </p>
          </div>
          
          <div className="mt-3 text-sm">
            <p className="font-medium">Sala de Máquinas Específica</p>
            <p className="mt-1 text-justify">
              Sala de máquinas prevista exclusivamente para la instalación de componentes, consumibles y herramientas necesarias para partes de los sistemas de refrigeración o de los sistemas completos. Es accesible solamente a personal autorizado para necesidades de mantenimiento y reparación.
            </p>
          </div>
          
          <div className="mt-3 text-sm">
            <p className="mt-1 text-justify">
              Ambas centrales frigoríficas se encuentran ubicadas en una sala de máquinas no específica. Por lo tanto, la presente instalación dispone de sala de máquinas.
            </p>
          </div>
        </div>
        
        {/* Sección 11.6 - RESUMEN */}
        <div className="mt-4 mb-6">
          <h4 className="text-base font-bold">11.6. RESUMEN</h4>
          <div className="mt-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Clasificación sistema:</p>
              <p>Sistema directo</p>
              <p className="font-medium">Tipo:</p>
              <p>Tipo 2</p>
              <p className="font-medium">Clasificación del local:</p>
              <p>Categoría A</p>
              <p className="font-medium">Clasificación Refrigerante:</p>
              <p>A1</p>
              <p className="font-medium">Clasificación Instalación:</p>
              <p>{data.nivelInstalacion || "Nivel 1"}</p>
              <p className="font-medium">Sala de Máquinas:</p>
              <p>Específica</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaInstalacion;
