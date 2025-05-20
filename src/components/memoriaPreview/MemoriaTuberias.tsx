
import React from "react";

const MemoriaTuberias: React.FC = () => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Sección 17 - TUBERÍAS Y AISLAMIENTO */}
        <div className="mb-6">
          <h3 className="text-lg font-bold" data-heading="&&17. TUBERÍAS Y AISLAMIENTO">17. TUBERÍAS Y AISLAMIENTO</h3>
          
          {/* Subsección 17.1 - TUBERÍAS */}
          <div className="mt-4 mb-6">
            <h4 className="text-base font-bold" data-heading="&&17.1. TUBERÍAS">17.1. TUBERÍAS</h4>
            <div className="mt-3 text-sm text-justify">
              <p className="mb-3">
                Se ha instalado la tubería de interconexión necesaria entre las centrales y los demás componentes de la instalación. 
                El material utilizado ha sido cobre deshidratado, de calidad frigorífica, cumpliendo siempre la normativa vigente, en especial las normas UNE-EN 12735-1 y UNE-EN 14276-2.
              </p>
              
              <p className="mb-3">
                Toda la red de tuberías está clasificada como artículo 4.3 según la Directiva de Equipos a Presión (2014/68/UE), y ha sido realizada siguiendo las "buenas prácticas de Ingeniería".
              </p>
              
              <p className="mb-4">
                Todo el trazado de tuberías se ha diseñado siguiendo los criterios técnicos que minimicen las pérdidas de carga y, por lo tanto, el consumo eléctrico, 
                garantizando a la vez el retorno de aceite al compresor, con especial cuidado en los tramos verticales generales, en los que se han diseñado dobles montantes 
                para garantizar velocidades mínimas a cargas parciales.
              </p>
              
              <div className="mt-4 mb-4">
                <table className="border-collapse border border-gray-300 w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Tipo</th>
                      <th className="border border-gray-300 p-2">Velocidad</th>
                      <th className="border border-gray-300 p-2">Pérdida de Carga máxima</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">Aspiración</td>
                      <td className="border border-gray-300 p-2">5 - 10 m/s</td>
                      <td className="border border-gray-300 p-2">1,5 K</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Líquido</td>
                      <td className="border border-gray-300 p-2">0,5 – 1,0 m/s</td>
                      <td className="border border-gray-300 p-2">0,5 K</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Caída Líquido</td>
                      <td className="border border-gray-300 p-2">0,2 – 0,4 m/s</td>
                      <td className="border border-gray-300 p-2">0,2 K</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Descarga</td>
                      <td className="border border-gray-300 p-2">5 - 10 m/s</td>
                      <td className="border border-gray-300 p-2">1,0 K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaTuberias;
