
import React from "react";
import SoportacionesIntro from "./soportaciones/SoportacionesIntro";
import SoportacionesTablas from "./soportaciones/SoportacionesTablas";
import AislamientoSeccion from "./soportaciones/AislamientoSeccion";

const MemoriaSoportaciones: React.FC = () => {
  return (
    <div className="mb-8 mx-auto p-6">
      <div className="pb-20">
        <h3
          className="text-lg font-bold mb-4"
          data-heading="&&17.3. SUPORTACIONES"
        >
          17.3. SUPORTACIONES
        </h3>

        {/* Secciones de Soportaciones */}
        <SoportacionesIntro />
        <SoportacionesTablas />
        <AislamientoSeccion />
      </div>
    </div>
  );
};

export default MemoriaSoportaciones;
