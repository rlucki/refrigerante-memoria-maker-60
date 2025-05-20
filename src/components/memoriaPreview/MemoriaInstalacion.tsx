import React from "react";

interface MemoriaInstalacionProps {
  data: {
    metodoEnfriamiento?: string;    // “Sistema directo” / “Sistema indirecto”
    seguridadSistema?: string;      // “Tipo 1” / “Tipo 2”
    categoriaLocal?: string;        // “Categoría A” / …
    grupoSeguridad?: string;        // “A1” / “B2” / …
    nivelInstalacion?: string;      // “Nivel 1” / “Nivel 2”
    // opcional: si quieres permitir cambiar sala de máquinas:
    salaMaquinas?: string;          // “Específica” / “No específica”
  };
}

const MemoriaInstalacion: React.FC<MemoriaInstalacionProps> = ({ data }) => {
  return (
    <div className="mb-8 mx-auto p-6">
      {/* 11.4 Clasificación de la instalación */}
      <section className="mb-6">
        <h4 className="text-base font-bold mb-2">11.4. CLASIFICACIÓN DE LA INSTALACIÓN</h4>
        <p className="text-sm mb-4 text-justify">
          Según lo especificado en el Artículo 8 del Capítulo II del Reglamento de Seguridad de Instalaciones Frigoríficas (RSIF),
          las instalaciones frigoríficas se clasifican en función del riesgo potencial en las categorías siguientes:
        </p>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium">Nivel 1.</p>
            <p className="mt-1 text-justify">
              Instalaciones formadas por uno o varios sistemas frigoríficos independientes entre sí con una potencia eléctrica instalada
              en los compresores por cada sistema inferior o igual a 30 kW … (texto completo)
            </p>
          </div>
          <div>
            <p className="font-medium">Nivel 2.</p>
            <p className="mt-1 text-justify">
              Instalaciones formadas por uno o varios sistemas frigoríficos independientes entre sí con una potencia eléctrica instalada
              en los compresores superior a 30 kW … (texto completo)
            </p>
          </div>
          <div>
            <p className="mt-1 text-justify">
              Diferentes sistemas de refrigeración configuran la misma instalación frigorífica cuando tienen en común alguno de los siguientes:
            </p>
            <ul className="list-[lower-latin] pl-6 mt-2 space-y-1 text-sm">
              <li>Equipos ubicados en una misma sala de máquinas o que atienden a un mismo espacio,…</li>
              <li>Circuito de condensación</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 11.5 Sala de máquinas */}
      <section className="mb-6">
        <h4 className="text-base font-bold mb-2">11.5. SALA DE MÁQUINAS</h4>
        <div className="text-sm space-y-4">
          <div>
            <p className="font-medium">Sala de Máquinas</p>
            <p className="mt-1 text-justify">
              Espacio o recinto cerrado, ventilado por ventilación mecánica, sellado y aislado…
            </p>
          </div>
          <div>
            <p className="font-medium">Sala de Máquinas Específica</p>
            <p className="mt-1 text-justify">
              Sala de máquinas prevista exclusivamente para la instalación de componentes, consumibles y herramientas…
            </p>
          </div>
          <div>
            <p className="mt-1 text-justify">
              Ambas centrales frigoríficas se encuentran ubicadas en una sala de máquinas 
              {data.salaMaquinas === "No específica" ? " no específica." : " específica."}
            </p>
          </div>
        </div>
      </section>

      {/* 11.6 Resumen */}
      <section>
        <h4 className="text-base font-bold mb-2">11.6. RESUMEN</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <p className="font-medium">Clasificación sistema:</p>
          <p>{data.metodoEnfriamiento || "—"}</p>

          <p className="font-medium">Tipo:</p>
          <p>{data.seguridadSistema || "—"}</p>

          <p className="font-medium">Clasificación del local:</p>
          <p>{data.categoriaLocal || "—"}</p>

          <p className="font-medium">Clasificación Refrigerante:</p>
          <p>{data.grupoSeguridad || "—"}</p>

          <p className="font-medium">Clasificación Instalación:</p>
          <p>{data.nivelInstalacion || "—"}</p>

          <p className="font-medium">Sala de Máquinas:</p>
          <p>{data.salaMaquinas || "Específica"}</p>
        </div>
      </section>
    </div>
  );
};

export default MemoriaInstalacion;
