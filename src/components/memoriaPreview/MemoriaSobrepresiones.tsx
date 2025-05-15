
import React from "react";

const MemoriaSobrepresiones: React.FC = () => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Sección 22 - PROTECCIÓN CONTRA SOBREPRESIONES */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">22. PROTECCIÓN CONTRA SOBREPRESIONES</h3>
          
          {/* Subsección 22.4 - VÁLVULAS DE SEGURIDAD */}
          <div className="mt-4 mb-6">
            <h4 className="text-base font-bold">22.4. VÁLVULAS DE SEGURIDAD</h4>
            <div className="mt-3 text-sm text-justify">
              <p className="mb-3">
                Los recipientes que puedan contener refrigerante líquido en condiciones normales de funcionamiento y puedan ser 
                independizados de otras partes del sistema de refrigeración, excepto aquellos cuyo diámetro interior sea inferior a 152 mm, 
                deberán estar protegidos mediante un dispositivo de alivio (por ejemplo, válvula de seguridad).
              </p>
              
              <p className="font-medium mb-3">Equipos con Volumen bruto &lt; 100 dm³</p>
              
              <p className="mb-3">
                Los equipos a presión con un volumen interior bruto inferior a 100 dm³ deberán tener, como mínimo, 
                un dispositivo de alivio, bien descargando al sector de baja (véase el apartado 3.4.1.4. del RSIF), 
                o a un recipiente receptor independiente o a la atmósfera.
              </p>
              
              <p className="mb-3">
                La capacidad mínima de descarga del dispositivo de alivio requerida por un depósito a presión deberá 
                ser determinada por la ecuación:
              </p>
              
              {/* Fórmula matemática como imagen */}
              <div className="flex justify-center my-4">
                <img 
                  src="/lovable-uploads/22f1b9d5-b37c-412e-89b4-8f2570bc2372.png" 
                  alt="Fórmula para calcular la capacidad mínima de descarga"
                  className="bg-gray-100 px-6 py-3 rounded-md shadow-sm max-h-20 object-contain"
                />
              </div>
              
              <p className="mb-2">En dónde:</p>
              <div className="space-y-2 pl-6">
                <p>
                  <span className="font-medium">Q<sub>m</sub></span>: capacidad mínima de descarga requerida del dispositivo de alivio en kilogramos de refrigerante por hora
                </p>
                <p>
                  <span className="font-medium">ϕ</span>: densidad de flujo térmico establecido en 10 kW/m²
                </p>
                <p>
                  <span className="font-medium">A</span>: superficie exterior del recipiente en metros cuadrados
                </p>
                <p>
                  <span className="font-medium">h<sub>vap</sub></span>: calor latente específico de evaporación del refrigerante, en kilojulios por kilogramo, 
                  calculado a una presión de 1,1 veces la presión de tarado del dispositivo
                </p>
              </div>
              
              <p className="mt-4 mb-3">
                El cálculo para dimensionar los dispositivos de alivio de presión y sus tuberías de conexión se realizará 
                conforme a la Norma UNE-EN 13136:2014+A1:2019 "Sistemas de refrigeración y bombas de calor. Dispositivos de alivio 
                de presión y sus tuberías de conexión. Métodos de Cálculo".
              </p>
              
              <div className="mt-6 mb-4">
                <h5 className="font-bold mb-3">Recipiente de Líquido Central Positiva</h5>
                <table className="border-collapse border border-gray-300 w-full">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Refrigerante:</td>
                      <td className="border border-gray-300 p-2">R-448A</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Longitud recipiente:</td>
                      <td className="border border-gray-300 p-2">1,588 m</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Diámetro recipiente:</td>
                      <td className="border border-gray-300 p-2">0,159 m</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Volumen interno:</td>
                      <td className="border border-gray-300 p-2">29 dm³</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Superficie exterior calculada:</td>
                      <td className="border border-gray-300 p-2">0,83 m²</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Presión tarado válvula seguridad:</td>
                      <td className="border border-gray-300 p-2">27,5 bar</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Calor latente a P = 1,1 x 27,5 + 1= 31,25 bar:</td>
                      <td className="border border-gray-300 p-2">110,22 kJ/kg</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Capacidad mínima descarga unitaria:</td>
                      <td className="border border-gray-300 p-2">271,1 kg/h</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">N.º de válvulas sencillas instaladas:</td>
                      <td className="border border-gray-300 p-2">1</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Válvula de seguridad:</td>
                      <td className="border border-gray-300 p-2">FAVRE VSR-11</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Capacidad descarga válvula seleccionada:</td>
                      <td className="border border-gray-300 p-2">725 kg/h &gt; Capacidad mínima</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Capacidad descarga ajustada:</td>
                      <td className="border border-gray-300 p-2">580 kg/h</td>
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

export default MemoriaSobrepresiones;
