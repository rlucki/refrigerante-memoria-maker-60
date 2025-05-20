
import React from "react";
import CargasTermicasSection from "./sections/CargasTermicasSection";
import MaquinariaSection from "./sections/MaquinariaSection";
import CentralPositivaSection from "./sections/CentralPositivaSection";
import CompresoresParalelosSection from "./sections/CompresoresParalelosSection";
import CentralNegativaSection from "./sections/CentralNegativaSection";

interface MemoriaCargaTermicaProps {
  excelData?: any;
}

const MemoriaCargaTermica: React.FC<MemoriaCargaTermicaProps> = ({ excelData }) => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Section 13 - CARGAS TÉRMICAS MUEBLES FRIGORÍFICOS Y CÁMARAS */}
        <CargasTermicasSection excelData={excelData} />
        
        {/* Section 14 - MAQUINARIA INSTALADA */}
        <MaquinariaSection excelData={excelData} />
        
        <div className="mt-4 text-sm text-justify">
          {/* Section 14.1 - CENTRAL POSITIVA */}
          <CentralPositivaSection excelData={excelData} />
          
          {/* Section 14.2 - COMPRESORES PARALELOS */}
          <CompresoresParalelosSection excelData={excelData} />
          
          {/* Section 14.3 - CENTRAL NEGATIVA */}
          <CentralNegativaSection excelData={excelData} />
        </div>
      </div>
    </div>
  );
};

export default MemoriaCargaTermica;
