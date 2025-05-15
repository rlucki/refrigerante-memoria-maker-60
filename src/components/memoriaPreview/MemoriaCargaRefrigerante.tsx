
import React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

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
            
            <p className="mb-6">
              Para refrigerantes cuya categoría de inflamabilidad es 1 no existe límite de carga basada en su inflamabilidad, 
              con lo que no aplica la tabla B.
            </p>
            
            {/* Tabla A - Requisitos de límite de carga para refrigerantes basados en su toxicidad */}
            <div className="mb-6">
              <h4 className="text-base font-semibold mb-3">Tabla A. Requisitos de límite de carga para refrigerantes basados en su toxicidad</h4>
              
              <div className="overflow-x-auto">
                <Table className="w-full border-collapse text-[10px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead rowSpan={2} className="border border-gray-600 bg-gray-200 p-1 text-center align-middle">CATEGORÍA DE TOXICIDAD</TableHead>
                      <TableHead rowSpan={2} className="border border-gray-600 bg-gray-200 p-1 text-center align-middle">CATEGORIA DEL LOCAL POR ACCESIBILIDAD</TableHead>
                      <TableHead colSpan={4} className="border border-gray-600 bg-gray-200 p-1 text-center align-middle">TIPO DE UBICACIÓN DE LOS SISTEMAS</TableHead>
                    </TableRow>
                    <TableRow>
                      <TableHead className="border border-gray-600 bg-gray-200 p-1 text-center align-middle">1</TableHead>
                      <TableHead className="border border-gray-600 bg-gray-200 p-1 text-center align-middle">2</TableHead>
                      <TableHead className="border border-gray-600 bg-gray-200 p-1 text-center align-middle">3</TableHead>
                      <TableHead className="border border-gray-600 bg-gray-200 p-1 text-center align-middle">4</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Categoria A */}
                    <TableRow>
                      <TableCell rowSpan={7} className="border border-gray-600 p-1 text-center align-middle">A</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">A</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Límite toxicidad x volumen del local o apéndice 4</TableCell>
                      <TableCell rowSpan={3} className="border border-gray-600 p-1 text-center align-middle"></TableCell>
                      <TableCell rowSpan={7} className="border border-gray-600 p-1 text-center align-middle">Sin límites de carga (a)</TableCell>
                      <TableCell rowSpan={11} className="border border-gray-600 p-1 text-center align-middle">Los requisitos de carga por toxicidad tendrán que evaluarse según las categorías de los locales por ubicación de los sistemas 1,2 o 3 dependiendo de la ubicación de la envolvente ventilada</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={3} className="border border-gray-600 p-1 text-center align-middle">B</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Plantas superiores sin salidas de emergencia o sótanos</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Límite toxicidad x volumen del local o apéndice 4</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Otros</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Sin límites de carga (a)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={3} className="border border-gray-600 p-1 text-center align-middle">C</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Plantas superiores sin salidas de emergencia o sótanos</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Límite toxicidad x volumen del local o apéndice 4</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle"></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Otros</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Sin límites de carga (a)</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle"></TableCell>
                    </TableRow>
                    {/* Categoria B */}
                    <TableRow>
                      <TableCell rowSpan={11} className="border border-gray-600 p-1 text-center align-middle">B</TableCell>
                      <TableCell rowSpan={1} className="border border-gray-600 p-1 text-center align-middle">A</TableCell>
                      <TableCell rowSpan={1} className="border border-gray-600 p-1 text-center align-middle">Para sistemas de absorción o adsorción sellados: límite de toxicidad x volumen del local y no más de 2,5 kg. Resto de sistemas: límite de toxicidad x volumen del local</TableCell>
                      <TableCell rowSpan={1} className="border border-gray-600 p-1 text-center align-middle"></TableCell>
                      <TableCell rowSpan={1} className="border border-gray-600 p-1 text-center align-middle">Sin límites de carga (a)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={5} className="border border-gray-600 p-1 text-center align-middle">B</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Plantas superiores sin salidas de emergencia o sótanos</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Límite de toxicidad x volumen del local</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Carga máx. 25 kg (a)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Densidad de personal inferior a 1 persona por 10m²</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Carga máx. 10 kg</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Sin límites de carga (a)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Otros</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle"></TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Carga máx. 25 kg (a)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={3} className="border border-gray-600 p-1 text-center align-middle">C</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Densidad de personal inferior a 1 persona por 10m²</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Carga no mayor de 50 kg (a) y salidas de emergencia existentes.</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Sin límites de carga (a)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Otros</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Carga máx. 10 kg (a)</TableCell>
                      <TableCell className="border border-gray-600 p-1 text-center align-middle">Carga máx. 25 kg (a)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-[10px] mt-2">a) Para aire exterior aplicar límite de toxicidad por volumen del local punto 3.3.2 de IF-04 y para salas de máquinas IF-07</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaCargaRefrigerante;
