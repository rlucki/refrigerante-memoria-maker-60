import React from "react";

const MemoriaSoportaciones: React.FC = () => {
  return (
    <div className="mb-8 mx-auto p-6">
      {/* Sección 17.3 - Soportaciones */}
      <div className="pb-20">
        <h3
          className="text-lg font-bold mb-4"
          data-heading="&&17.3. SUPORTACIONES"
        >
          17.3. SUPORTACIONES
        </h3>

        <div className="space-y-4 text-sm text-justify">
          <p>
            La soportación se ejecuta mediante abrazaderas isofónicas con
            aislamiento de poliuretano en el caso de todas las tuberías que deban
            estar aisladas (todas excepto las de alta presión), cuyos diámetros
            estarán en función del diámetro de la tubería, sobre carrilería
            metálica atirantada a pared o techo mediante varillas roscadas de 8
            mm.
          </p>

          <p>
            Las distancias entre soportes estarán en función de los diámetros,
            debiendo tomar atención en cambios de dirección y previo a conexiones
            de electroválvulas o válvulas de expansión electrónica, con una
            separación máxima entre soportes según la tabla siguiente:
          </p>

          {/* Tabla de soportaciones 3 columnas */}
          <div className="mt-4 mb-6 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">
                    Diámetro exterior (mm)
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Diámetro exterior (&ldquo;&rdquo;)
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Separación máxima (m)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">3 a 15 recocido</td>
                  <td className="border border-gray-300 p-2">
                    De 1/4&quot; a 5/8&quot;
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    1,2
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">15 a 22 recocido</td>
                  <td className="border border-gray-300 p-2">
                    De 5/8&quot; a 7/8&quot;
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    2
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">22 a &lt; 54 recocido</td>
                  <td className="border border-gray-300 p-2">
                    De 7/8&quot; a 2 1/8&quot;
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    3
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">54 a 56 recocido</td>
                  <td className="border border-gray-300 p-2">
                    De 2 1/8&quot; a 3 1/8&quot;
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    4
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Los pasos de tuberías a través de paredes y paneles deberán protegerse
            mediante lámina de polietileno o material equivalente, para evitar el
            desgaste del aislamiento contra las chapas de los paneles frigoríficos
            de las cámaras. Así mismo, estos pasos deberán quedar perfectamente
            sellados mediante inyección de poliuretano para evitar pérdidas no
            deseables por transmisión.
          </p>

          <p>
            Todo el trazado de tuberías se ha diseñado siguiendo los criterios técnicos
            que minimicen las pérdidas de carga y por lo tanto el consumo eléctrico,
            garantizando a la vez el retorno de aceite al compresor, con especial cuidado
            en los tramos verticales generales, en los que se han diseñado dobles montantes
            para garantizar velocidades mínimas a cargas parciales.
          </p>

          {/* Nueva tabla de velocidades y pérdidas */}
          <div className="mt-4 mb-6 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Tipo</th>
                  <th className="border border-gray-300 p-2 text-center">Velocidad (m/s)</th>
                  <th className="border border-gray-300 p-2 text-center">
                    Pérdida de carga máxima (K)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">Aspiración</td>
                  <td className="border border-gray-300 p-2 text-center">5 – 10</td>
                  <td className="border border-gray-300 p-2 text-center">1,5</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">Líquido</td>
                  <td className="border border-gray-300 p-2 text-center">0,5 – 1,0</td>
                  <td className="border border-gray-300 p-2 text-center">0,5</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Caída Líquido</td>
                  <td className="border border-gray-300 p-2 text-center">0,2 – 0,4</td>
                  <td className="border border-gray-300 p-2 text-center">0,2</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">Descarga</td>
                  <td className="border border-gray-300 p-2 text-center">5 – 10</td>
                  <td className="border border-gray-300 p-2 text-center">1,0</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Sección AISLAMIENTO */}
          <h4 className="text-base font-bold mt-8 mb-2">AISLAMIENTO</h4>
          <div className="space-y-4 text-sm text-justify">
            <p>
              El aislamiento térmico de los circuitos de baja temperatura en una
              instalación frigorífica juega un papel muy importante en cuanto al
              rendimiento (consumo energético), hermeticidad, funcionamiento y
              conservación del sistema. A tal efecto los recipientes, intercambiadores
              o tuberías y accesorios que trabajen a temperaturas relativamente bajas
              (t &lt; 15ºC) deberán estar protegidos mediante aislamiento térmico de
              la absorción de calor y de las condensaciones superficiales no esporádicas.
            </p>
            <p>
              La calidad del aislamiento viene dada principalmente por su coeficiente
              de conductividad térmica, su baja permeabilidad al vapor de agua, y su
              resistencia al envejecimiento y la eficacia de la barrera de vapor.
            </p>
            <p>
              El espesor del aislante se ha determinado teniendo en cuenta:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                La temperatura y humedad relativa del aire ambiente en el lugar de emplazamiento.
              </li>
              <li>
                La diferencia de temperatura entre la superficie fría a aislar y la normal del aire ambiente.
              </li>
              <li>
                La conductividad térmica del material aislante seleccionado.
              </li>
              <li>
                La forma y características del componente a aislar (pared plana o diámetro de la tubería).
              </li>
            </ul>

            <p>
              Los materiales aislantes cumplen los requisitos siguientes:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Coeficiente de conductividad térmica bajo.</li>
              <li>Factores de resistencia a la absorción y difusión del vapor de agua altos.</li>
              <li>Buena resistencia a la inflamabilidad, a la descomposición y al envejecimiento.</li>
              <li>Buena resistencia mecánica, especialmente en los puntos de soportación de tuberías.</li>
              <li>
                Mantienen sus propiedades a temperaturas entre –70 y +120ºC.
              </li>
              <li>
                Cuando el aislamiento discurra a la intemperie, estará debidamente protegido.
              </li>
            </ul>

            <p>
              Para su cálculo, es muy importante garantizar la ausencia de condensaciones
              en exterior de la tubería y minimizar las pérdidas por transmisión, de
              ahí que los espesores instalados cubren las necesidades obtenidas a partir
              de la siguiente ecuación que permite calcular la temperatura superficial:
            </p>

            {/* Bloque monoespaciado con la fórmula */}
            <pre className="bg-gray-100 p-4 text-sm overflow-auto">
{`           Q = (te - ti)
               -------------------------------
           1/(2·π)·(1/(hi·ri) + 1/λ·ln(r2/r1) + 1/(he·r2))
           
           equivalente a:
           
           Q = (te - tse)
               -------------------
               1/(2·π·he·r2)
`}
            </pre>

            <p>
              En donde:
            </p>
            <table className="w-full border-collapse border border-gray-300 text-sm mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Descripción</th>
                  <th className="border border-gray-300 p-2 text-center">Unidades</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">Q (flujo de calor)</td>
                  <td className="border border-gray-300 p-2 text-center">W/m</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    λ (conductividad aislamiento)
                  </td>
                  <td className="border border-gray-300 p-2 text-center">W/m·K</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">te (temperatura exterior)</td>
                  <td className="border border-gray-300 p-2 text-center">ºC</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">ti (temperatura interior)</td>
                  <td className="border border-gray-300 p-2 text-center">ºC</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    he (coeficiente convección exterior)
                  </td>
                  <td className="border border-gray-300 p-2 text-center">W/m²·K</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    hi (coeficiente convección interior)
                  </td>
                  <td className="border border-gray-300 p-2 text-center">W/m²·K</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    r2 (radio exterior + aislante)
                  </td>
                  <td className="border border-gray-300 p-2 text-center">m</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">r1 (radio interior)</td>
                  <td className="border border-gray-300 p-2 text-center">m</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">e (espesor aislamiento)</td>
                  <td className="border border-gray-300 p-2 text-center">m</td>
                </tr>
              </tbody>
            </table>

            <p>
              Todas las tuberías de aspiración han sido aisladas mediante coquilla
              elastomérica, cuyo espesor mínimo es de 19 mm y está en función del fluido
              y de su temperatura, en aras de evitar la condensación de la humedad
              ambiental.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaSoportaciones;
