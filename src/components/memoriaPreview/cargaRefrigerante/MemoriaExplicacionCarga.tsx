
import React from "react";

const MemoriaExplicacionCarga: React.FC = () => {
  return (
    <div className="text-sm text-justify">
      <p className="mb-4">
        El método para la estimación de la máxima carga admisible se desarrolla en el apéndice 2 de la IF-04.
        Los límites prácticos para los refrigerantes están basados en el efecto de un escape súbito de refrigerante 
        con un tiempo de exposición breve. No se refieren a los límites de seguridad para una exposición regular diaria. 
        Los límites prácticos serán utilizados para determinar la carga máxima admisible en función de la categoría del local, 
        tal y como se refleja en las tablas A y B del apéndice 1 de la Instrucción IF-04.
      </p>
      
      <p className="mb-4">
        El procedimiento a aplicar será el siguiente:
      </p>
      
      <ol className="list-alphabetic pl-6 mb-4 space-y-2">
        <li>
          Determinar la clasificación del local en donde se empleen los sistemas, según artículo 7 del RSIF (A, B y C) 
          y el tipo de ubicación del sistema (1, 2, 3 y 4) según artículo 6.2.
        </li>
        <li>
          Determinar la categoría de toxicidad del refrigerante utilizado en el sistema de refrigeración, que será A o B, 
          correspondiendo al primer carácter reflejado en la clase de seguridad del refrigerante.
        </li>
        <li>
          Calcular la carga máxima para el sistema de refrigeración basada en la toxicidad, como la mayor de:
          <ol className="list-roman pl-6 mt-2 space-y-1">
            <li>Carga máxima a partir de la tabla A del apéndice 1 de la IF-04</li>
            <li>20 m³ multiplicados por la carga máxima para toxicidad con sistemas de refrigeración sellados herméticamente</li>
            <li>150 g para sistemas de refrigeración herméticamente sellados que utilicen refrigerantes de la clase de toxicidad A</li>
          </ol>
        </li>
      </ol>
    </div>
  );
};

export default MemoriaExplicacionCarga;
