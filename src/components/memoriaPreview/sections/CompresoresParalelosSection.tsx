
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { extractTableData } from "../utils/excelUtils";

interface CompresoresParalelosSectionProps {
  excelData?: any;
}

const CompresoresParalelosSection: React.FC<CompresoresParalelosSectionProps> = ({ excelData }) => {
  // Rango correcto para Compresores Paralelos (14.2)
  const compresoresParalelosData = extractTableData(excelData, {
    sheet: "RESUM LEGA",
    startCol: "AS",
    endCol: "AW",
    startRow: 1,
    endRow: 18,
    mappings: {
      caracteristica: "AS",
      medidas: "AT",
      observaciones: "AW"
    }
  });

  return (
    <div className="mt-8">
      <h4 className="text-md font-bold">14.2. COMPRESORES PARALELOS</h4>
      <p className="mt-2">
        La bancada "booster" incluye compresor/es denominados paralelos (IT), que descargan sobre el mismo colector que la central positiva y que tienen como misión comprimir una parte de los gases flash procedentes del correspondiente recipiente de líquido, pero a una temperatura de evaporación más elevada, lo que redunda en una mayor eficiencia energética de las centrales. Estos compresores son también del tipo semihermético, y sus características técnicas son las que siguen:
      </p>
      
      {compresoresParalelosData.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-blue-100">
                <TableHead colSpan={3} className="border border-gray-300 p-2 text-center font-bold">
                  COMPRESORES PARALELOS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compresoresParalelosData.map((row, index) => (
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
        <p className="mt-4 italic">No se encontraron datos de los compresores paralelos en el archivo Excel.</p>
      )}
    </div>
  );
};

export default CompresoresParalelosSection;
