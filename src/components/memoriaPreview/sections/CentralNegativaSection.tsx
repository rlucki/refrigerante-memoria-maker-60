
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { extractTableData } from "../utils/excelUtils";

interface CentralNegativaSectionProps {
  excelData?: any;
}

const CentralNegativaSection: React.FC<CentralNegativaSectionProps> = ({ excelData }) => {
  // Use useMemo to avoid unnecessary recalculations
  const centralNegativaData = React.useMemo(() => {
    return extractTableData(excelData, {
      sheet: "RESUM LEGA",
      startCol: "AD",
      endCol: "AH",
      startRow: 1,
      endRow: 19,
      mappings: {
        caracteristica: "AD",
        medidas: "AE",
        observaciones: "AH"
      }
    });
  }, [excelData]);

  return (
    <div className="mt-8">
      <h4 className="text-md font-bold">14.3. CENTRAL NEGATIVA</h4>
      <p className="mt-2">
        Central frigorífica formada por compresores semiherméticos alternativos, accionados mediante un motor eléctrico trifásico. Está ubicada en la misma bancada que la central anterior, a diferente altura. Sus características técnicas son las siguientes:
      </p>
      
      {centralNegativaData.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-blue-100">
                <TableHead colSpan={3} className="border border-gray-300 p-2 text-center font-bold">
                  CENTRAL NEGATIVA
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {centralNegativaData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="border border-gray-300 p-2">{row.caracteristica}</TableCell>
                  <TableCell className="border border-gray-300 p-2">{row.medidas}</TableCell>
                  <TableCell className="border border-gray-300 p-2">{row.observaciones}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="mt-4 italic">No se encontraron datos de la central negativa en el archivo Excel.</p>
      )}
    </div>
  );
};

export default CentralNegativaSection;
