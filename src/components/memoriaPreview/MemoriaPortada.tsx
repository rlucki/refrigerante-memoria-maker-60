
import React from "react";

interface MemoriaPortadaProps {
  data: {
    titular?: string;
    direccion?: string;
    poblacion?: string;
    cp?: string;
    provincia?: string;
    direccionInstalacion?: string;
    poblacionInstalacion?: string;
    cpInstalacion?: string;
    provinciaInstalacion?: string;
    instalador?: string;
  };
}

const MemoriaPortada: React.FC<MemoriaPortadaProps> = ({ data }) => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Título central */}
        <div className="text-center mb-28 mt-32">
          <h1 className="text-3xl font-bold mb-6">MEMORIA TÉCNICA</h1>
          <h2 className="text-2xl">INSTALACIÓN FRIGORÍFICA</h2>
        </div>
        
        {/* Datos del establecimiento */}
        <div className="mb-20">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">ESTABLECIMIENTO</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Titular:</span> {data.titular || "DINOSOL SUPERMERCADOS S.L."}</p>
            <p><span className="font-medium">Dirección:</span> {data.direccion || "CTRA. DEL RINCÓN, S/N, 4ª PLANTA Edif. Anexo C.C. Las Arenas"}</p>
            <p><span className="font-medium">Población:</span> {data.poblacion || "LAS PALMAS DE GRAN CANARIA"}</p>
            <p><span className="font-medium">Código Postal:</span> {data.cp || "35010"}</p>
            <p><span className="font-medium">Provincia:</span> {data.provincia || "LAS PALMAS"}</p>
          </div>
        </div>
        
        {/* Datos de la instalación */}
        <div className="mb-20">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">EMPLAZAMIENTO INSTALACIÓN</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Dirección:</span> {data.direccionInstalacion || "AVDA. BLAS PÉREZ GONZÁLEZ, 4"}</p>
            <p><span className="font-medium">Población:</span> {data.poblacionInstalacion || "PUERTO DE LA CRUZ"}</p>
            <p><span className="font-medium">Código Postal:</span> {data.cpInstalacion || "35610"}</p>
            <p><span className="font-medium">Provincia:</span> {data.provinciaInstalacion || "SANTA CRUZ DE TENERIFE"}</p>
          </div>
        </div>
        
        {/* Datos del instalador */}
        <div className="mb-20">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">EMPRESA INSTALADORA</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Nombre:</span> {data.instalador || "GESTÉCNICA INTEGRAL 10. S.L."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaPortada;
