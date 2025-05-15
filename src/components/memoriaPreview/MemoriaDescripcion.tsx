
import React from "react";

interface MemoriaDescripcionProps {
  data: {
    descripcionInstalacion?: string;
  };
}

const MemoriaDescripcion: React.FC<MemoriaDescripcionProps> = ({ data }) => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Sección 11 - DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">11. DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA</h3>
          
          <div className="mt-4 text-sm text-justify">
            <p className="whitespace-pre-line">{data.descripcionInstalacion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaDescripcion;
