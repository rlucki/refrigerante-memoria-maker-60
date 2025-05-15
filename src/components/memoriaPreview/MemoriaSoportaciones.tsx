
import React from "react";

const MemoriaSoportaciones: React.FC = () => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Sección 16.2 - SUPORTACIONES */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">16.2. SUPORTACIONES</h3>
          
          <div className="mt-4 text-sm text-justify space-y-4">
            <p>
              La suportación se ejecuta mediante abrazaderas isofónicas con aislamiento de poliuretano en el caso de todas las tuberías 
              que deban estar aisladas (todas excepto las de alta presión), cuyos diámetros estarán en función del diámetro de la tubería, 
              sobre carrilería metálica atirantada a pared o techo mediante varillas roscadas de 8 mm.
            </p>
            
            <p>
              Las distancias entre soportes estarán en función de los diámetros, pero como norma general no deberán superar los 1,20 m. 
              de distancia entre ellos, debiendo tomar especial atención en los cambios de dirección y previo a conexiones de electroválvulas 
              o válvulas de expansión electrónica.
            </p>
            
            {/* Imágenes en fila */}
            <div className="flex flex-wrap gap-6 my-6 justify-center">
              <div className="flex flex-col items-center">
                <div className="flex gap-2">
                  <img 
                    src="/lovable-uploads/bd0b74cf-e6fa-4123-8859-2e040a1ccbda.png" 
                    alt="Soporte Armafix FX" 
                    className="h-28 object-contain" 
                  />
                  <img 
                    src="/lovable-uploads/7ffbf5d1-4c03-4acd-b3e6-6723757afd6a.png" 
                    alt="Abrazadera" 
                    className="h-28 object-contain" 
                  />
                </div>
                <p className="text-xs text-center mt-2">Soportes Armafix FX + Abrazadera</p>
              </div>
              
              <div className="flex flex-col items-center">
                <img 
                  src="/lovable-uploads/0611d646-3b17-47f2-b823-4f90dd7b7e72.png" 
                  alt="Antivibradores metálicos" 
                  className="h-28 object-contain" 
                />
                <p className="text-xs text-center mt-2">Ejemplo antivibradores metálicos</p>
              </div>
            </div>
            
            {/* Imagen del croquis */}
            <div className="flex flex-col items-center my-6">
              <img 
                src="/lovable-uploads/c9b531ec-42e4-48b7-aa8e-a48641c85444.png" 
                alt="Croquis suportación techo" 
                className="max-w-full h-auto object-contain" 
              />
              <p className="text-xs text-center mt-2">Croquis suportación techo</p>
            </div>
            
            <p>
              Los pasos de tuberías a través de paredes y paneles deberán protegerse mediante lámina de polietileno o material equivalente, 
              para evitar el desgaste del aislamiento contra las chapas de los paneles frigoríficos de las cámaras. 
              Así mismo, estos pasos deberán quedar perfectamente sellados mediante inyección de poliuretano para evitar pérdidas no deseables por transmisión.
            </p>
            
            <p>
              Las tuberías se soportan adecuadamente de acuerdo con su tamaño y peso en servicio, con una separación máxima entre soportes según se muestra en la siguiente tabla:
            </p>
            
            {/* Tabla de diámetros y separaciones */}
            <div className="mt-4 mb-4">
              <table className="border-collapse border border-gray-300 w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Diámetro exterior mm (nota)</th>
                    <th className="border border-gray-300 p-2">Separación (m)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">15 a 22 recocido</td>
                    <td className="border border-gray-300 p-2 text-center">2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">22 a &lt; 54 semiendurecido</td>
                    <td className="border border-gray-300 p-2 text-center">3</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">54 a 56 semiendurecido</td>
                    <td className="border border-gray-300 p-2 text-center">4</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p>
              El espacio libre alrededor de la tubería es el suficiente para permitir los trabajos rutinarios de mantenimiento de los componentes, 
              verificación de uniones de las tuberías y reparación de fugas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaSoportaciones;
