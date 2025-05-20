/*  src/components/memoriaPreview/MemoriaClasificacionGas.tsx
    — Sección 11.3 con marca “&&” para índice automático — */

import React from "react";

interface MemoriaClasificacionGasProps {
  data: {
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
  };
}

/* ---------- constantes de título con marcador && ---------- */
const T11_3 = "&&11.3. CLASIFICACIÓN DEL GAS REFRIGERANTE&&";

/* elimina los “&&” para mostrar limpio en pantalla */
const stripMarkers = (s: string) => s.replace(/&&/g, "");

const MemoriaClasificacionGas: React.FC<MemoriaClasificacionGasProps> = ({
  data,
}) => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* ── Sección 11.3 ── */}
        <div className="mt-4 mb-6">
          {/*  data-heading conserva el texto con &&  */}
          <h4
            className="text-base font-bold"
            data-heading={T11_3}
          >
            {stripMarkers(T11_3)}
          </h4>

          <p className="text-sm mt-2">
            Según el apartado 4 de la IF-02 del RSIF, los refrigerantes se
            clasifican según el grado de seguridad en función de su
            inflamabilidad y toxicidad, dentro de los siguientes grupos:
          </p>

          {/* Inflamabilidad ------------------------------------------------ */}
          <div className="mt-3 text-sm">
            <p className="font-medium">INFLAMABILIDAD</p>
            <p className="mt-1">
              Los refrigerantes deberán incluirse dentro de una de las tres
              categorías, 1, 2 y 3 basándose en lo siguiente:
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <span className="font-medium">Categoría 1:</span> Refrigerantes
                que no muestran propagación de llama cuando se ensayan a +60 °C
                y&nbsp;101,3 kPa
              </li>
              <li>
                <span className="font-medium">Categoría 2:</span> Refrigerantes
                que cumplen las tres condiciones siguientes: muestran
                propagación de llama a +60 °C y&nbsp;101,3 kPa; límite inferior
                de inflamabilidad&nbsp;&ge;&nbsp;3,5 % V/V; calor de combustión
                &lt; 19 000 kJ/kg.&nbsp;Dentro de este grupo la norma ISO 817
                introduce la sub-categoría&nbsp;2L (velocidad de propagación de
                la llama &lt; 10 cm/s).
              </li>
              <li>
                <span className="font-medium">Categoría 3:</span> Refrigerantes
                que muestran propagación de llama a +60 °C y&nbsp;101,3 kPa;
                LII&nbsp;&lt;&nbsp;3,5 % V/V; calor de combustión &ge; 19 000 kJ/kg.
              </li>
            </ul>
          </div>

          {/* Toxicidad ----------------------------------------------------- */}
          <div className="mt-4 text-sm">
            <p className="font-medium">TOXICIDAD</p>
            <p className="mt-1">
              Los refrigerantes deberán incluirse dentro de una de las
              categorías&nbsp;A y&nbsp;B basándose en su toxicidad:
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <span className="font-medium">Categoría A:</span> Concentración
                media admisible &ge; 400 ppm (8 h día / 40 h semana).
              </li>
              <li>
                <span className="font-medium">Categoría B:</span> Concentración
                media admisible &lt; 400 ppm.
              </li>
            </ul>
          </div>

          {/* Datos concretos de la instalación ---------------------------- */}
          <div className="mt-6 text-sm border-t pt-4">
            <p className="font-medium">
              En esta instalación, los datos del refrigerante utilizado son:
            </p>

            <div className="mt-3 space-y-2">
              <p>
                <span className="font-medium">Refrigerante:</span>{" "}
                {data.refrigerante || "R-434A"}
              </p>
              <p>
                <span className="font-medium">Composición:</span>{" "}
                {data.composicionRefrigerante ||
                  "(63,2 % R-125 / 18 % R-143a / 16 % R-134a / 2,8 % R-600a)"}
              </p>
              <p>
                <span className="font-medium">
                  Clasificación en función de su inflamabilidad:
                </span>{" "}
                {data.inflamabilidad || "Grupo 1"}
              </p>
              <p>
                <span className="font-medium">
                  Clasificación en función de su toxicidad:
                </span>{" "}
                {data.toxicidad || "Grupo A"}
              </p>
              <p>
                <span className="font-medium">Grupo de seguridad:</span>{" "}
                {data.grupoSeguridad || "A1"}
              </p>
              <p>
                <span className="font-medium">
                  Clasificación según Reglamento Equipos a Presión:
                </span>{" "}
                {data.directivaEquipos || "2"}
              </p>
              <p>
                <span className="font-medium">
                  Potencial de Calentamiento Atmosférico (PCA):
                </span>{" "}
                {data.pca || "3245"}
              </p>
              <p>
                <span className="font-medium">
                  Potencial de Agotamiento de la capa de Ozono (PAO):
                </span>{" "}
                {data.agotamientoOzono || "0"}
              </p>
              <p>
                <span className="font-medium">Límite Práctico:</span>{" "}
                {data.limitePractico || "0,32 kg/m³"}
              </p>
              <p>
                <span className="font-medium">ATEL/ODL:</span>{" "}
                {data.atelOdl || "0,32 kg/m³"}
              </p>
              <p>
                <span className="font-medium">
                  Límite Inferior de Inflamabilidad:
                </span>{" "}
                {data.limiteInflamabilidad || "NF"}
              </p>
              <p>
                <span className="font-medium">
                  Temperatura de autoignición:
                </span>{" "}
                {data.temperaturaAutoignicion || "ND"}
              </p>
              <p>
                <span className="font-medium">Gas Fluorado:</span>{" "}
                {data.gasFluorado || "Sí"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaClasificacionGas;
