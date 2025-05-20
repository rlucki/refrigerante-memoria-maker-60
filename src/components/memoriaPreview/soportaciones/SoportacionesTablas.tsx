
import React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const SoportacionesTablas: React.FC = () => {
  return (
    <div className="space-y-8 text-sm text-justify">
      {/* Tabla de soportaciones */}
      <div className="mt-4 mb-6 overflow-x-auto">
        <Table className="w-full border-collapse border border-gray-300">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="border border-gray-300 p-2 text-left">
                Diámetro exterior (mm)
              </TableHead>
              <TableHead className="border border-gray-300 p-2 text-left">
                Diámetro exterior (&ldquo;&rdquo;)
              </TableHead>
              <TableHead className="border border-gray-300 p-2 text-center">
                Separación máxima (m)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border border-gray-300 p-2">3 a 15 recocido</TableCell>
              <TableCell className="border border-gray-300 p-2">
                De 1/4&quot; a 5/8&quot;
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">1,2</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell className="border border-gray-300 p-2">15 a 22 recocido</TableCell>
              <TableCell className="border border-gray-300 p-2">
                De 5/8&quot; a 7/8&quot;
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-gray-300 p-2">
                22 a &lt; 54 recocido
              </TableCell>
              <TableCell className="border border-gray-300 p-2">
                De 7/8&quot; a 2 1/8&quot;
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">3</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell className="border border-gray-300 p-2">54 a 56 recocido</TableCell>
              <TableCell className="border border-gray-300 p-2">
                De 2 1/8&quot; a 3 1/8&quot;
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">4</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p>
        Los pasos de tuberías a través de paredes y paneles deberán protegerse
        mediante lámina de polietileno o material equivalente, para evitar el
        desgaste del aislamiento contra las chapas de los paneles frigoríficos
        de las cámaras. Así mismo, estos pasos deberán quedar perfectamente
        sellados mediante inyección de poliuretano para evitar pérdidas no
        deseables por transmisión.
      </p>

      <p>
        Todo el trazado de tuberías se ha diseñado siguiendo los criterios
        técnicos que minimicen las pérdidas de carga y por lo tanto el consumo
        eléctrico, garantizando a la vez el retorno de aceite al compresor, con
        especial cuidado en los tramos verticales generales, en los que se han
        diseñado dobles montantes para garantizar velocidades mínimas a cargas
        parciales.
      </p>

      {/* Tabla de velocidades y pérdidas */}
      <div className="mt-4 mb-6 overflow-x-auto">
        <Table className="w-full border-collapse border border-gray-300 text-sm">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="border border-gray-300 p-2 text-left">Tipo</TableHead>
              <TableHead className="border border-gray-300 p-2 text-center">
                Velocidad (m/s)
              </TableHead>
              <TableHead className="border border-gray-300 p-2 text-center">
                Pérdida de carga máxima (K)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border border-gray-300 p-2">Aspiración</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">5 – 10</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">1,5</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell className="border border-gray-300 p-2">Líquido</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">
                0,5 – 1,0
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">0,5</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-gray-300 p-2">Caída Líquido</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">
                0,2 – 0,4
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">0,2</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell className="border border-gray-300 p-2">Descarga</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">5 – 10</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">1,0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SoportacionesTablas;
