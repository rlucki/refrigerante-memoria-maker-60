
import React from "react";

interface MemoriaDescripcionProps {
  data: {
    descripcionInstalacion?: string;
    nivelInstalacion?: string;
  };
  calculationsData?: {
    compresorParalelo?: string;
  };
}

const MemoriaDescripcion: React.FC<MemoriaDescripcionProps> = ({ data, calculationsData }) => {
  // Description text for level 2 with parallel compressor not 0
  const parallelCompressorText = `Esta instalación se ha diseñado para cubrir las necesidades frigoríficas de diferentes muebles y cámaras de un hipermercado. Para ello se han instalado dos centrales frigoríficas: una de régimen positivo para los servicios que trabajan a temperaturas que oscilan entre los 0/+10 °C, y otra de régimen negativo para los servicios de congelados que trabajan con temperaturas entre -22/-25 °C.

Tanto los servicios positivos como los negativos se alimentan con refrigerante R-744 (CO₂). Para garantizar las condiciones mencionadas se ha instalado un grupo "booster" de compresión, dotado de dos centrales frigoríficas, trabajando una con una temperatura de evaporación de -8 °C (central positiva), y la otra a -33 °C (central negativa).  La central positiva trabaja en modo transcrítico, mientras que la central negativa lo hace en modo subcrítico, descargando sobre la aspiración de la central positiva. Ambas centrales están en la misma bancada "booster" junto a un compresor denominado "paralelo" y cuya misión es mejorar la eficiencia energética del conjunto de centrales, aspirando los gases de "flash gas" del recipiente de líquido a una temperatura superior a los +5,3 °C de la central positiva, mejorando el COP global.

Los gases de descarga generados por los compresores de la central positiva junto a los al compresor paralelo, que salen a +124,8 °C y 93,7 bar, se envían a un separador de aceite, donde este se separa del refrigerante y se redirige a un acumulador desde el que se alimentará el circuito de aceite de todos los compresores de la bancada. El aceite ingresará a cada compresor a través de un nivel electrónico, el cual está dotado de una electroválvula que gestiona su apertura o cierre.`;

  // Text for level 2 with parallel compressor = 0 (using the default value from descripcionInstalacion)
  
  // Determine which description to show
  const getDescription = () => {
    if (data.nivelInstalacion === "Nivel 2") {
      // For level 2, check parallel compressor value
      if (calculationsData?.compresorParalelo && calculationsData.compresorParalelo !== "0") {
        return parallelCompressorText;
      }
      // For level 2 with compresorParalelo = "0", use the description from data.descripcionInstalacion
      return data.descripcionInstalacion || "";
    }
    
    // For level 1, return empty string (only show the title)
    return "";
  };

  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Sección 12 - DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">12. DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA</h3>
          
          <div className="mt-4 text-sm text-justify">
            <p className="whitespace-pre-line">{getDescription()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaDescripcion;
