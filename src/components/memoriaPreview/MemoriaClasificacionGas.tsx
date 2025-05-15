
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

const MemoriaClasificacionGas: React.FC<MemoriaClasificacionGasProps> = ({ data }) => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Sección 11.3 - CLASIFICACIÓN DEL GAS REFRIGERANTE */}
        <div className="mt-4 mb-6">
          <h4 className="text-base font-bold">11.3. CLASIFICACIÓN DEL GAS REFRIGERANTE</h4>
          <p className="text-sm mt-2">
            Según el apartado 4 de la IF-02 del RSIF, los refrigerantes se clasifican según el grado de seguridad
            en función de su inflamabilidad y toxicidad, dentro de los siguientes grupos:
          </p>
          
          <div className="mt-3 text-sm">
            <p className="font-medium">INFLAMABILIDAD</p>
            <p className="mt-1">
              Los refrigerantes deberán incluirse dentro de una de las tres categorías, 1, 2 y 3 basándose en lo siguiente:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <span className="font-medium">Categoría 1:</span> Refrigerantes que no muestran propagación de llama cuando se ensayan a +60ºC y 101,3 kPa
              </li>
              <li>
                <span className="font-medium">Categoría 2:</span> Refrigerantes que cumplan las tres condiciones siguientes: Muestran propagación de llama cuando se ensayan a +60 °C y 101,3 kPa; tienen un límite inferior de inflamabilidad, cuando forman una mezcla con el aire, igual o superior al 3,5% en volumen (V/V); y tienen un calor de combustión menor de 19.000 kJ/kg.
                <p className="mt-1">
                  Dentro de este grupo la norma ISO 817 ha introducido el criterio de la disminución de riesgo a causa de la baja velocidad de propagación de la llama de ciertas sustancias, estableciendo la Categoría 2L, el cual además de satisfacer las tres condiciones anteriores presenta una velocidad de propagación de la llama inferior a 10 cm/s.
                </p>
              </li>
              <li>
                <span className="font-medium">Categoría 3:</span> Refrigerantes que cumplan las tres condiciones siguientes: Muestran propagación de llama cuando se ensayan a +60 °C y 101,3 kPa; tienen un límite inferior de inflamabilidad, cuando forman una mezcla con el aire, Inferior al 3,5% en volumen (V/V); y tienen un calor de combustión mayor o igual a 19.000 kJ/kg.
              </li>
            </ul>
          </div>
          
          <div className="mt-4 text-sm">
            <p className="font-medium">TOXICIDAD</p>
            <p className="mt-1">
              Los refrigerantes deberán incluirse dentro de una de las categorías A y B basándose en su toxicidad:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <span className="font-medium">Categoría A:</span> Refrigerantes cuya concentración media en el tiempo no tiene efectos adversos para la mayoría de los trabajadores que pueden estar expuestos al refrigerante durante una jornada laboral de 8 horas diarias y 40 horas semanales y cuyo valor es igual o superior a una concentración media de 400 ml/m³ [400 ppm. (V/V)].
              </li>
              <li>
                <span className="font-medium">Categoría B:</span> Refrigerantes cuya concentración media en el tiempo no tiene efectos adversos para la mayoría de los trabajadores que puedan estar expuestos al refrigerante durante una jornada laboral de 8 horas diarias y 40 horas semanales y cuyo valor es inferior a una concentración media de 400 ml/m³ [400 ppm. (V/V)].
              </li>
            </ul>
          </div>
          
          <div className="mt-6 text-sm border-t pt-4">
            <p className="font-medium">En esta instalación, los datos del refrigerante utilizado son:</p>
            <div className="mt-3 space-y-2">
              <p><span className="font-medium">Refrigerante:</span> {data.refrigerante || "R-434A"}</p>
              <p><span className="font-medium">Composición:</span> {data.composicionRefrigerante || "(63,2% R-125 / 18% R-143a / 16% R-134a / 2,8% R-600a)"}</p>
              <p><span className="font-medium">Clasificación en función de su inflamabilidad:</span> {data.inflamabilidad || "Grupo 1"}</p>
              <p><span className="font-medium">Clasificación en función de su toxicidad:</span> {data.toxicidad || "Grupo A"}</p>
              <p><span className="font-medium">Grupo de seguridad:</span> {data.grupoSeguridad || "A1"}</p>
              <p><span className="font-medium">Clasificación según Reglamento Equipos a Presión:</span> {data.directivaEquipos || "2"}</p>
              <p><span className="font-medium">Potencial de Calentamiento Atmosférico (PCA):</span> {data.pca || "3245"}</p>
              <p><span className="font-medium">Potencial de Agotamiento de la capa de Ozono (PAO):</span> {data.agotamientoOzono || "0"}</p>
              <p><span className="font-medium">Límite Práctico (kg/m³):</span> {data.limitePractico || "0.32 kg/m³"}</p>
              <p><span className="font-medium">ATEL/ODL (kg/m³):</span> {data.atelOdl || "0.32 kg/m³"}</p>
              <p><span className="font-medium">Límite Inferior de Inflamabilidad:</span> {data.limiteInflamabilidad || "NF"}</p>
              <p><span className="font-medium">Temperatura de autoignición:</span> {data.temperaturaAutoignicion || "ND"}</p>
              <p><span className="font-medium">Gas Fluorado:</span> {data.gasFluorado || "SI"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaClasificacionGas;
