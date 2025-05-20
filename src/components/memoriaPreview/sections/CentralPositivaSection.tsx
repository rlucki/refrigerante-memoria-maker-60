import React from "react";
import {
  Table, TableHeader, TableBody,
  TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { extractTableData } from "../utils/excelUtils";

interface CentralPositivaSectionProps {
  excelData?: any;
}

const CentralPositivaSection: React.FC<CentralPositivaSectionProps> = ({ excelData }) => {
  const data = extractTableData(excelData, {
    sheet: "RESUM LEGA",
    startCol: "J",
    endCol:   "O",
    startRow: 2,    // ← si tu primera fila útil es la 2
    endRow:   25,
    mappings: {
      caracteristica: "J", // texto
      c1: "K",             // compresor 1
      c2: "L",             // compresor 2
      c3: "M",             // compresor 3
      c4: "N",             // compresor 4  (elimínalo si no existe)
      total: "O",          // total
    },
  });

  return (
    <div className="mt-8">
      <h4 className="text-md font-bold">14.1. CENTRAL POSITIVA</h4>
      <p className="mt-2">
        Se trata de una central frigorífica formada por compresores
        semiherméticos alternativos accionados mediante un motor eléctrico
        trifásico. Sus características técnicas son las siguientes:
      </p>

      {data.length ? (
        <div className="mt-4 overflow-x-auto">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-blue-100">
                <TableHead className="border p-2" />
                <TableHead className="border p-2 text-center">Cº&nbsp;1</TableHead>
                <TableHead className="border p-2 text-center">Cº&nbsp;2</TableHead>
                <TableHead className="border p-2 text-center">Cº&nbsp;3</TableHead>
                <TableHead className="border p-2 text-center">Cº&nbsp;4</TableHead>
                <TableHead className="border p-2 text-center">TOTAL</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="border p-2">{row.caracteristica}</TableCell>
                  <TableCell className="border p-2">{row.c1}</TableCell>
                  <TableCell className="border p-2">{row.c2}</TableCell>
                  <TableCell className="border p-2">{row.c3}</TableCell>
                  <TableCell className="border p-2">{row.c4}</TableCell>
                  <TableCell className="border p-2">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="mt-4 italic">
          No se encontraron datos de la central positiva en el archivo Excel.
        </p>
      )}
    </div>
  );
};

export default CentralPositivaSection;
