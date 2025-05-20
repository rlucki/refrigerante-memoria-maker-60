
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { extractTableData } from "../utils/excelUtils";

interface CentralPositivaSectionProps {
  excelData?: any;
}

const CentralPositivaSection: React.FC<CentralPositivaSectionProps> = ({ excelData }) => {
  // Use useMemo to avoid unnecessary recalculations
  const centralPositivaData = React.useMemo(() => {
    return extractTableData(excelData, {
      sheet: "RESUM LEGA",
      startCol: "W",
      endCol: "AB",
      startRow: 1,
      endRow: 20,
      mappings: {
        caracteristica: "W",
        medidas: "X",
        observaciones: "AB"
      }
    });
  }, [excelData]);

  return (
    <div className="mt-8">
      <h4 className="text-md font-bold">14.1. CENTRAL POSITIVA</h4>
      <p className="mt-2">
        Se trata de una central frigorífica formada por compresores semiherméticos alternativos accionados mediante un motor eléctrico trifásico. Sus características técnicas son las siguientes:
      </p>
      
      {centralPositivaData.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-blue-100">
                <TableHead colSpan={3} className="border border-gray-300 p-2 text-center font-bold">
                  CENTRAL POSITIVA
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {centralPositivaData.map((row, index) => (
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
        <p className="mt-4 italic">No se encontraron datos de la central positiva en el archivo Excel.</p>
      )}
    </div>
  );
};

export default CentralPositivaSection;
