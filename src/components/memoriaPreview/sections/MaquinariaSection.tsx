
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { extractTableData } from "../utils/excelUtils";

interface MaquinariaSectionProps {
  excelData?: any;
}

const MaquinariaSection: React.FC<MaquinariaSectionProps> = ({ excelData }) => {
  const maquinariaData = extractTableData(excelData, {
    sheet: "RESUM LEGA",
    startCol: "G",
    endCol: "H",
    startRow: 1,
    endRow: 9,
    mappings: {
      elemento: "G",
      detalles: "H"
    }
  });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold">14. MAQUINARIA INSTALADA</h3>
      
      <div className="mt-4 text-sm text-justify">
        <p>
          Para atender la demanda de todas las cargas térmicas indicadas, se han instalado las siguientes centrales frigoríficas y componentes:
        </p>
        
        {maquinariaData.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-blue-100">
                  <TableHead className="border border-gray-300 p-2">ELEMENTO</TableHead>
                  <TableHead className="border border-gray-300 p-2">DETALLES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maquinariaData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="border border-gray-300 p-2">{row.elemento}</TableCell>
                    <TableCell className="border border-gray-300 p-2">{row.detalles}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="mt-4 italic">No se encontraron datos de maquinaria instalada en el archivo Excel.</p>
        )}
      </div>
    </div>
  );
};

export default MaquinariaSection;
