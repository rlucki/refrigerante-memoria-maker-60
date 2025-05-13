
import React from "react";
import { Card } from "@/components/ui/card";

interface MemoriaPreviewProps {
  data: {
    titular?: string;
    nif?: string;
    direccion?: string;
    poblacion?: string;
    provincia?: string;
    cp?: string;
    instalador?: string;
    direccionInstalacion?: string;
    titulo?: string;
    clienteLogo?: string;
  };
  currentPage?: number;
}

const MemoriaPreview: React.FC<MemoriaPreviewProps> = ({ data, currentPage = 1 }) => {
  const companyLogo = "/lovable-uploads/767f70e2-8522-4f58-aa42-2dd4244eed17.png";
  
  return (
    <div className="bg-white shadow-lg border rounded-lg overflow-hidden h-full flex flex-col">
      {/* Cabecera de la memoria */}
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Vista previa</h2>
        <span className="text-sm text-gray-500">Página {currentPage}</span>
      </div>
      
      <div className="flex-1 overflow-auto p-8">
        {/* Portada */}
        <div className="mb-12 max-w-[595px] mx-auto bg-white shadow-sm border min-h-[842px] relative p-10">
          {/* Logos en la parte superior */}
          <div className="flex justify-between mb-32">
            <img 
              src={companyLogo} 
              alt="Logo Empresa" 
              className="h-16 object-contain" 
            />
            {data.clienteLogo && (
              <img 
                src={data.clienteLogo} 
                alt="Logo Cliente" 
                className="h-16 object-contain" 
              />
            )}
          </div>
          
          {/* Título central */}
          <div className="text-center mb-28">
            <h1 className="text-3xl font-bold mb-6">MEMORIA TÉCNICA</h1>
            <h2 className="text-2xl">INSTALACIÓN FRIGORÍFICA</h2>
          </div>
          
          {/* Datos del establecimiento */}
          <div className="mb-20">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">ESTABLECIMIENTO</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Titular:</span> {data.titular || "DINOSOL SUPERMERCADOS S.L."}</p>
              <p><span className="font-medium">Dirección:</span> {data.direccionInstalacion || "AVDA. BLAS PÉREZ GONZÁLEZ, 4"}</p>
              <p><span className="font-medium">Población:</span> {data.poblacion || "PUERTO DE LA CRUZ"}</p>
              <p><span className="font-medium">Provincia:</span> {data.provincia || "SANTA CRUZ DE TENERIFE"}</p>
            </div>
          </div>
          
          {/* Datos del instalador */}
          <div className="mb-20">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">EMPRESA INSTALADORA</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Nombre:</span> {data.instalador || "GESTÉCNICA INTEGRAL 10. S.L."}</p>
            </div>
          </div>
          
          {/* Fecha al final */}
          <div className="absolute bottom-10 left-10 right-10 text-right">
            <p className="text-sm text-gray-600">
              {new Date().toLocaleDateString('es-ES', {year: 'numeric', month: 'long'})}
            </p>
          </div>
          
          {/* Numeración de página */}
          <div className="absolute bottom-5 right-5">
            <p className="text-xs text-gray-500">Pág. {currentPage}</p>
          </div>
        </div>
        
        {/* Segunda página - Índice */}
        <div className="mb-12 max-w-[595px] mx-auto bg-white shadow-sm border min-h-[842px] relative p-10">
          {/* Cabecera con logos */}
          <div className="flex justify-between mb-8">
            <img 
              src={companyLogo} 
              alt="Logo Empresa" 
              className="h-10 object-contain" 
            />
            {data.clienteLogo && (
              <img 
                src={data.clienteLogo} 
                alt="Logo Cliente" 
                className="h-10 object-contain" 
              />
            )}
          </div>
          
          {/* Título de índice */}
          <h2 className="text-2xl font-bold mb-8 text-center">ÍNDICE</h2>
          
          {/* Contenido del índice */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <p>1.- DATOS TITULAR</p>
              <p>3</p>
            </div>
            <div className="flex justify-between">
              <p>2.- DATOS INSTALADOR Y MANTENEDOR</p>
              <p>4</p>
            </div>
            <div className="flex justify-between">
              <p>3.- FRIGORISTA HABILITADO EMPRESA INSTALADORA</p>
              <p>5</p>
            </div>
            <div className="flex justify-between">
              <p>4.- DATOS INSTALACIÓN</p>
              <p>6</p>
            </div>
            <div className="flex justify-between">
              <p>5.- AUTOR DEL PROYECTO / DIRECTOR TÉCNICO</p>
              <p>7</p>
            </div>
            <div className="flex justify-between">
              <p>6.- DATOS TÉCNICOS</p>
              <p>8</p>
            </div>
            <div className="flex justify-between">
              <p>7.- NORMATIVA</p>
              <p>10</p>
            </div>
          </div>
          
          {/* Numeración de página */}
          <div className="absolute bottom-5 right-5">
            <p className="text-xs text-gray-500">Pág. {currentPage + 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaPreview;
