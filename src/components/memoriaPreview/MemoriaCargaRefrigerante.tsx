
import React from "react";
import MemoriaIntroduccionCarga from "./cargaRefrigerante/MemoriaIntroduccionCarga";
import MemoriaTablaLimitesCarga from "./cargaRefrigerante/MemoriaTablaLimitesCarga";
import MemoriaExplicacionCarga from "./cargaRefrigerante/MemoriaExplicacionCarga";
import MemoriaClasificacionInstalacion from "./cargaRefrigerante/MemoriaClasificacionInstalacion";

const MemoriaCargaRefrigerante: React.FC = () => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6 overflow-visible">
      <div className="pb-20">
        {/* Section 23 - CARGA MÁXIMA ADMISIBLE DE REFRIGERANTE */}
        <div className="mb-6">
          <MemoriaIntroduccionCarga />
          <MemoriaTablaLimitesCarga />
          <MemoriaExplicacionCarga />
          <MemoriaClasificacionInstalacion />
        </div>
      </div>
    </div>
  );
};

export default MemoriaCargaRefrigerante;
