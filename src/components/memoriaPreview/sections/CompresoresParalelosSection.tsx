import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { extractTableData } from "../utils/excelUtils";

interface Props {
  excelData?: any;
}

const CompresoresParalelosSection: React.FC<Props> = ({ excelData }) => {
  /*  RANGO AS–AW  (filas 3-25)  */
  const data = extractTableData(excelData, {
    sheet: "RESUM LEGA",
    startCol: "AS",
    endCol:   "AW",
    startRow: 3,      // debajo del título “COMPRESORES PARALELOS”
    endRow:   25,
    mappings: {
      caracteristica: "AS", // texto de la fila
      it:  "AU",            // valor del compresor paralelo (IT)
      total: "AW",          // columna TOTAL
    },
  });

  return (
    <div className="mt-8">
      <h4 className="text-md font-bold">14.2. COMPRESORES PARALELOS</h4>
      <p className="mt-2">
        La bancada “booster” incluye compresores paralelos (IT), que descargan
        sobre el mismo colector que la central positiva&nbsp;…
      </p>

      {data.length ? (
        <div className="mt-4 overflow-x-auto">
          <Table
            className="w-full border-collapse text-sm"
            style={{ tableLayout: "fixed" }}
          >
            <TableHeader>
              <TableRow className="bg-blue-100">
                <TableHead className="border p-2 min-w-[150px]" />
                <TableHead className="border p-2 text-center">IT</TableHead>
                <TableHead className="border p-2 text-center">TOTAL</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i} className={i % 2 ? "bg-gray-50" : ""}>
                  <TableCell className="border p-2">
                    {row.caracteristica}
                  </TableCell>

                  {/* valor IT - alineado a la derecha */}
                  <TableCell className="border p-2 text-right">
                    {row.it}
                  </TableCell>

                  {/* valor TOTAL */}
                  <TableCell className="border p-2 text-right">
                    {row.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="mt-4 italic">
          No se encontraron datos de los compresores paralelos en el archivo
          Excel.
        </p>
      )}
    </div>
  );
};

export default CompresoresParalelosSection;
