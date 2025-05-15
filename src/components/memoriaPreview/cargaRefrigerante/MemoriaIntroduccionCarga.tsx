
import React from "react";

const MemoriaIntroduccionCarga: React.FC = () => {
  return (
    <>
      <h3 className="text-lg font-bold">23. CARGA MÁXIMA ADMISIBLE DE REFRIGERANTE</h3>
      <div className="mt-3 text-sm text-justify">
        <p className="mb-4">
          Para determinar las limitaciones de carga de refrigerante en un sistema dado, se tendrá que clasificar el mismo según cuatro aspectos:
        </p>
        
        <ol className="list-alphabetic pl-6 mb-4 space-y-2">
          <li>Categoría de toxicidad del refrigerante</li>
          <li>Categoría de inflamabilidad</li>
          <li>Clasificación del local según su accesibilidad, de acuerdo con artículo 7 del RSIF</li>
          <li>Tipo de emplazamiento según el artículo 6.2 del RSIF</li>
        </ol>
        
        <p className="mb-4">
          Las tablas A y B del apéndice 1 de la IF-04 muestran las combinaciones permitidas y no permitidas. La tabla A hace 
          referencia al límite de carga para refrigerantes basados en su toxicidad, mientras que la tabla B hace referencia 
          al límite basados en su inflamabilidad.
        </p>
        
        <p className="mb-4">
          Para refrigerantes cuya categoría de inflamabilidad es 1 no existe límite de carga basada en su inflamabilidad, 
          con lo que no aplica la tabla B.
        </p>
      </div>
    </>
  );
};

export default MemoriaIntroduccionCarga;
