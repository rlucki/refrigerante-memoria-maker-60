
import React from "react";

const MemoriaClasificacionInstalacion: React.FC = () => {
  return (
    <div className="text-sm text-justify">
      <p className="mb-3">
        En la instalación que nos ocupa tenemos las siguientes clasificaciones:
      </p>
      
      <ul className="pl-6 mb-4 space-y-1">
        <li>- Clasificación del local:	A</li>
        <li>- Tipo de emplazamiento del local: 2</li>
        <li>- Categoría de toxicidad del refrigerante: A</li>
        <li>- Categoría de inflamabilidad del refrigerante: 1</li>
      </ul>
      
      <p className="mb-4">
        Por lo tanto, y dado que no son sistemas sellados herméticamente, la carga máxima se tomará de la tabla A, 
        y será el valor resultante de multiplicar el límite de toxicidad (límite práctico) por el volumen del local.
      </p>
    </div>
  );
};

export default MemoriaClasificacionInstalacion;
