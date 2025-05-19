
import React from "react";

interface MemoriaDescripcionProps {
  data: {
    descripcionInstalacion?: string;
    nivelInstalacion?: string;
    refrigerante?: string;
    tipoVentilador?: string;
    temperaturaDescarga?: string;
    presionDescarga?: string;
    ubicacionGascooler?: string;
    tieneIHX?: string;
    tieneDesrecalentador?: string;
    kgRefrigerante?: string;
  };
  calculationsData?: {
    compresorParalelo?: string;
  };
}

const MemoriaDescripcion: React.FC<MemoriaDescripcionProps> = ({ data, calculationsData }) => {
  // Description text for level 2 with parallel compressor not 0
  const parallelCompressorText = `Esta instalación se ha diseñado para cubrir las necesidades frigoríficas de diferentes muebles y cámaras de un hipermercado. Para ello se han instalado dos centrales frigoríficas: una de régimen positivo para los servicios que trabajan a temperaturas que oscilan entre los 0/+10 °C, y otra de régimen negativo para los servicios de congelados que trabajan con temperaturas entre -22/-25 °C.

Tanto los servicios positivos como los negativos se alimentan con refrigerante ${data.refrigerante || "R-744 (CO₂)"}. Para garantizar las condiciones mencionadas se ha instalado un grupo "booster" de compresión, dotado de dos centrales frigoríficas, trabajando una con una temperatura de evaporación de -8 °C (central positiva), y la otra a -33 °C (central negativa).  La central positiva trabaja en modo transcrítico, mientras que la central negativa lo hace en modo subcrítico, descargando sobre la aspiración de la central positiva. Ambas centrales están en la misma bancada "booster" junto a un compresor denominado "paralelo" y cuya misión es mejorar la eficiencia energética del conjunto de centrales, aspirando los gases de "flash gas" del recipiente de líquido a una temperatura superior a los +5,3 °C de la central positiva, mejorando el COP global.

Los gases de descarga generados por los compresores de la central positiva junto a los al compresor paralelo, que salen a ${data.temperaturaDescarga || "+124,8"} °C y ${data.presionDescarga || "93,7"} bar, se envían a un separador de aceite, donde este se separa del refrigerante y se redirige a un acumulador desde el que se alimentará el circuito de aceite de todos los compresores de la bancada. El aceite ingresará a cada compresor a través de un nivel electrónico, el cual está dotado de una electroválvula que gestiona su apertura o cierre.`;

  // Function to generate description text for level 2 without parallel compressor
  const generateLevel2WithoutParallelText = () => {
    const baseText = `Esta instalación se ha diseñado para cubrir las necesidades frigoríficas de diferentes muebles y cámaras de un hipermercado. Para ello se han instalado dos centrales frigoríficas: una de régimen positivo para los servicios que trabajan a temperaturas que oscilan entre los 0/+10 °C, y otra de régimen negativo para los servicios de congelados que trabajan con temperaturas entre -22/-25 °C.

Tanto los servicios positivos como los negativos se alimentan con refrigerante ${data.refrigerante || "R-744 (CO₂)"}. Para garantizar las condiciones mencionadas se ha instalado un grupo "booster" de compresión, dotado de dos centrales frigoríficas, trabajando una con una temperatura de evaporación de -8 °C (central positiva), y la otra a -33 °C (central negativa).  La central positiva trabaja en modo transcrítico, mientras que la central negativa lo hace en modo subcrítico, descargando sobre la aspiración de la central positiva. Ambas centrales están en la misma bancada "booster".

Los gases de descarga generados por los compresores de la central positiva que salen a ${data.temperaturaDescarga || "+124,8"} °C y ${data.presionDescarga || "93,7"} bar, se envían a un separador de aceite, donde este se separa del refrigerante y se redirige a un acumulador desde el que se alimentará el circuito de aceite de todos los compresores de la bancada. El aceite ingresará a cada compresor a través de un nivel electrónico, el cual está dotado de una electroválvula que gestiona su apertura o cierre.`;

    const gascoolerText = `
Los gases de descarga, ya prácticamente sin aceite y a la temperatura y presión indicada anteriormente, son conducidos a un "gas cooler" (enfriador), situado en ${data.ubicacionGascooler || "cubierta"} y dotado de ventiladores ${data.tipoVentilador || "helicoidales"}, donde ceden parte del calor sensible al aire que circula por su batería y se produce un decremento de la temperatura del fluido frigorífico hasta alcanzar +38 °C.
${data.tipoVentilador?.toUpperCase() || "HELICOIDAL"} ${data.ubicacionGascooler?.toUpperCase() || "CUBIERTA"}`;

    const desrecalentadorText = data.tieneDesrecalentador === "si" ? `
Adicionalmente, el sistema cuenta con un desrecalentador para aprovechar el calor de descarga, mejorando la eficiencia energética del conjunto.` : "";

    const ihxText = data.tieneIHX === "si" ? `
El sistema incorpora un intercambiador de calor interno (IHX) para mejorar la eficiencia del ciclo frigorífico.` : "";

    const flashGasText = `
El refrigerante, a alta presión, se expansiona hasta la presión de intermedia mediante una válvula de expansión electrónica transcrítica y se conduce al recipiente de líquido vertical de las centrales, a una temperatura superior a los +5,3 °C, donde una parte llega en fase líquida y la otra en fase gas (flash gas). Estos gases flash sobrecalentados se reconducen hasta el colector de aspiración de la central positiva, provocándoles una pequeña caída de presión mediante otra válvula de expansión electrónica, denominada válvula de flash gas bypass`;

    return baseText + gascoolerText + desrecalentadorText + ihxText + flashGasText;
  };

  // Additional sections for the description
  const regimenTrabajoPositiva = `
12.1. RÈGIMEN TRABAJO MUEBLES Y CÁMARAS TEMPERATURA POSITIVA
Compresores del tipo semi-hermético alternativo, ubicados en sala de máquinas accionados por medio de motores trifásicos con doble devanado 50%-50% lo que permitirá el arranque según sistema Part Winding, minimizando así los picos de intensidad. El primer compresor contará con un Variador de Frecuencia.

Régimen de trabajo: -8 °C`;

  const regimenTrabajoNegativa = `
12.2. RÈGIMEN TRABAJO MUEBLES Y CÁMARAS TEMPERATURA NEGATIVA
Compresores del tipo semi-hermético alternativo, ubicados en sala de máquinas accionados por medio de motores trifásicos. El primer compresor contará con un Variador de Frecuencia.

Régimen de trabajo: -33 °C`;

  const sistemaDesescarche = `
12.4. SISTEMA DE DESESCARCHE
El sistema utilizado para cada Mueble o cámara se realiza como sigue:

Obradores:           Aire
Servicios Positivos 0/+4 °C:  Aire en muebles y eléctrico en cámaras
Servicios Negativos:    Eléctrico en muebles y cámaras

La carga total de refrigerante ${data.refrigerante || "R-744 (CO₂)"} en la instalación es de ${data.kgRefrigerante || "85"} kg según el instalador.`;

  const regimenTrabajoParalelo = `
12.3. RÈGIMEN TRABAJO COMPRESION PARALELA
Compresor del tipo semi-hermético alternativo, ubicado en sala de máquinas accionado por medio de motores trifásicos con doble devanado 50%-50% lo que permitirá el arranque según sistema Part Winding, minimizando así los picos de intensidad. El compresor contará con un Variador de Frecuencia.

Régimen de trabajo: +5ºC`;

  // Determine which description to show
  const getDescription = () => {
    if (data.nivelInstalacion === "Nivel 2") {
      // For level 2, check parallel compressor value
      if (calculationsData?.compresorParalelo && calculationsData.compresorParalelo !== "0") {
        return parallelCompressorText;
      }
      // For level 2 with compresorParalelo = "0", use the generated description
      return generateLevel2WithoutParallelText();
    }
    
    // For level 1, always return the description from data
    return data.descripcionInstalacion || "";
  };

  // Check if parallel compressor exists
  const hasParallelCompressor = calculationsData?.compresorParalelo && calculationsData.compresorParalelo !== "0";

  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Sección 12 - DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">12. DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA</h3>
          
          <div className="mt-4 text-sm text-justify">
            <p className="whitespace-pre-line">{getDescription()}</p>
            
            {/* Additional sections */}
            <p className="whitespace-pre-line">{regimenTrabajoPositiva}</p>
            <p className="whitespace-pre-line">{regimenTrabajoNegativa}</p>
            
            {/* Conditionally render parallel compressor section */}
            {hasParallelCompressor && (
              <p className="whitespace-pre-line">{regimenTrabajoParalelo}</p>
            )}
            
            <p className="whitespace-pre-line">{sistemaDesescarche}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaDescripcion;
