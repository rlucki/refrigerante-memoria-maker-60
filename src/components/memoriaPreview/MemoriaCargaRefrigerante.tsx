
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MemoriaCargaRefrigerante: React.FC = () => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6 overflow-visible">
      <div className="pb-20">
        {/* Section 23 - CARGA MÁXIMA ADMISIBLE DE REFRIGERANTE */}
        <div className="mb-6">
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
            
            {/* Tabla A añadida según la imagen proporcionada */}
            <div className="my-6">
              <p className="font-bold mb-2 text-center">Tabla A. Requisitos de límite de carga para refrigerantes basados en su toxicidad</p>
              <div className="overflow-x-auto">
                <Table className="w-full border-collapse border border-gray-300">
                  <TableHeader>
                    <TableRow>
                      <TableHead rowSpan={2} className="border border-gray-300 p-2 text-center align-middle text-xs font-bold">
                        CATEGORÍA DE TOXICIDAD
                      </TableHead>
                      <TableHead rowSpan={2} className="border border-gray-300 p-2 text-center align-middle text-xs font-bold">
                        CATEGORÍA DEL LOCAL POR ACCESIBILIDAD
                      </TableHead>
                      <TableHead colSpan={4} className="border border-gray-300 p-2 text-center text-xs font-bold">
                        TIPO DE UBICACIÓN DE LOS SISTEMAS
                      </TableHead>
                    </TableRow>
                    <TableRow>
                      <TableHead className="border border-gray-300 p-2 text-center text-xs font-bold">1</TableHead>
                      <TableHead className="border border-gray-300 p-2 text-center text-xs font-bold">2</TableHead>
                      <TableHead className="border border-gray-300 p-2 text-center text-xs font-bold">3</TableHead>
                      <TableHead className="border border-gray-300 p-2 text-center text-xs font-bold">4</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {/* Categoría A */}
                    <TableRow>
                      <TableCell rowSpan={7} className="border border-gray-300 p-2 text-center font-semibold align-middle">
                        A
                      </TableCell>
                      <TableCell rowSpan={1} className="border border-gray-300 p-2 text-center">
                        A
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Límite toxicidad x volumen del local o apéndice 4
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Sin límites de carga (a)
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Sin límites de carga (a)
                      </TableCell>
                      <TableCell rowSpan={7} className="border border-gray-300 p-2 align-middle">
                        Los requisitos de carga por toxicidad tendrán que evaluarse según las categorías de los locales por ubicación de los sistemas 1,2 o 3 dependiendo de la ubicación de la envolvente ventilada
                      </TableCell>
                    </TableRow>
                    
                    {/* Subcategoría B */}
                    <TableRow>
                      <TableCell rowSpan={2} className="border border-gray-300 p-2 text-center">
                        B
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Plantas superiores sin salidas de emergencia o sótanos
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Límite toxicidad x volumen del local o apéndice 4
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Sin límites de carga (a)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300 p-2">
                        Otros
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Sin límites de carga (a)
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2"></TableCell>
                    </TableRow>
                    
                    {/* Subcategoría C */}
                    <TableRow>
                      <TableCell rowSpan={2} className="border border-gray-300 p-2 text-center">
                        C
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Plantas superiores sin salidas de emergencia o sótanos
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Límite toxicidad x volumen del local o apéndice 4
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2"></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300 p-2">
                        Otros
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Sin límites de carga (a)
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2"></TableCell>
                    </TableRow>
                    
                    {/* Categoría B */}
                    <TableRow>
                      <TableCell rowSpan={8} className="border border-gray-300 p-2 text-center font-semibold align-middle">
                        B
                      </TableCell>
                      <TableCell rowSpan={1} className="border border-gray-300 p-2 text-center">
                        A
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Para sistemas de absorción o adsorción sellados: límite de toxicidad x volumen del local y no más de 2,5 kg. Resto de sistemas: límite de toxicidad x volumen del local
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Sin límites de carga (a)
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2"></TableCell>
                    </TableRow>
                    
                    {/* Subcategoría B para toxicidad B */}
                    <TableRow>
                      <TableCell rowSpan={3} className="border border-gray-300 p-2 text-center">
                        B
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Plantas superiores sin salidas de emergencia o sótanos
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Límite de toxicidad x volumen del local
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Carga máx. 25 kg (a)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300 p-2">
                        Densidad de personal inferior a 1 persona por 10m²
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Carga máx. 10 kg
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Sin límites de carga (a)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300 p-2">
                        Otros
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2"></TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Carga máx. 25 kg (a)
                      </TableCell>
                    </TableRow>
                    
                    {/* Subcategoría C para toxicidad B */}
                    <TableRow>
                      <TableCell rowSpan={2} className="border border-gray-300 p-2 text-center">
                        C
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Densidad de personal inferior a 1 persona por 10m²
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Carga no mayor de 50 kg (a) y salidas de emergencia existentes.
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Sin límites de carga (a)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300 p-2">
                        Otros
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Carga máx. 10 kg (a)
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        Carga máx. 25 kg (a)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="mt-1 text-xs italic">
                (a) Para aire exterior aplicar límite de toxicidad por volumen del local punto 3.3.2 de IF-04 y para salas de máquinas IF-07
              </p>
            </div>
            
            {/* Texto adicional solicitado */}
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
        </div>
      </div>
    </div>
  );
};

export default MemoriaCargaRefrigerante;
