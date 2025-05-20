import React from "react";

const MemoriaSoportaciones: React.FC = () => {
  return (
    <div className="mb-8 mx-auto p-6">
      {/* Sección 17.3 - Soportaciones */}
      <div className="pb-20">
        <h3 className="text-lg font-bold mb-4" data-heading="&&17.3. SUPORTACIONES">
          17.3. SUPORTACIONES
        </h3>
        <div className="space-y-4 text-sm text-justify">
          <p>
            La soportación se ejecuta mediante abrazaderas isofónicas con aislamiento de poliuretano
            en el caso de todas las tuberías que deban estar aisladas (todas excepto las de alta presión),
            cuyos diámetros estarán en función del diámetro de la tubería, sobre carrilería metálica atirantada
            a pared o techo mediante varillas roscadas de 8 mm.
          </p>
          <p>
            Las distancias entre soportes estarán en función de los diámetros, debiendo tomar atención en
            cambios de dirección y previo a conexiones de electroválvulas o válvulas de expansión electrónica,
            con una separación máxima entre soportes según la tabla siguiente:
          </p>

          {/* Nueva tabla de 3 columnas */}
          <div className="mt-4 mb-4 overflow-x-auto">
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
                <tr className="">
                  <td className="border border-gray-300 p-2">3 a 15 recocido</td>
                  <td className="border border-gray-300 p-2">De 1/4&quot; a 5/8&quot;</td>
                  <td className="border border-gray-300 p-2 text-center">1,2</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">15 a 22 recocido</td>
                  <td className="border border-gray-300 p-2">De 5/8&quot; a 7/8&quot;</td>
                  <td className="border border-gray-300 p-2 text-center">2</td>
                </tr>
                <tr className="">
                  <td className="border border-gray-300 p-2">22 a &lt; 54 recocido</td>
                  <td className="border border-gray-300 p-2">De 7/8&quot; a 2 1/8&quot;</td>
                  <td className="border border-gray-300 p-2 text-center">3</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2">54 a 56 recocido</td>
                  <td className="border border-gray-300 p-2">De 2 1/8&quot; a 3 1/8&quot;</td>
                  <td className="border border-gray-300 p-2 text-center">4</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            El espacio libre alrededor de la tubería es el suficiente para permitir los trabajos rutinarios
            de mantenimiento de los componentes, verificación de uniones de las tuberías y reparación de fugas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoriaSoportaciones;
