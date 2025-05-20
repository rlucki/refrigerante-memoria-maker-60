
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { extractTableData, calculateSum } from "../utils/excelUtils";

interface CargasTermicasSectionProps {
  excelData?: any;
}

const CargasTermicasSection: React.FC<CargasTermicasSectionProps> = ({ excelData }) => {
  // Get data for the tables
  const positivosData = extractTableData(excelData, {
    sheet: "RESUM LEGA",
    startCol: "A",
    endCol: "E",
    startRow: 1,
    endRow: 60,
    mappings: {
      denominacion: "A",
      modulos: "B",
      modVol: "C",
      temperatura: "D",
      cargaT: "E"
    }
  });
  
  const negativosData = extractTableData(excelData, {
    sheet: "RESUM LEGA",
    startCol: "Q",
    endCol: "U",
    startRow: 1,
    endRow: 60,
    mappings: {
      denominacion: "Q",
      modulos: "R",
      modVol: "S",
      temperatura: "T",
      cargaT: "U"
    }
  });
  
  // Calculate sums
  const sumPositivos = calculateSum(positivosData);
  const sumNegativos = calculateSum(negativosData);
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold">13. CARGAS TÉRMICAS MUEBLES FRIGORÍFICOS Y CÁMARAS</h3>
      
      <div className="mt-4 text-sm text-justify">
        <p>
          De acuerdo con los datos facilitados considerando unas condiciones interiores de +24ºC/+60% y exteriores de +32ºC/65%, se han calculado las siguientes cargas térmicas para el mobiliario frigorífico, según los datos aportados por el fabricante, y las cámaras.
        </p>
        
        {positivosData.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-blue-100">
                  <TableHead colSpan={5} className="border border-gray-300 p-2 text-center font-bold">
                    SERVICIOS POSITIVOS
                  </TableHead>
                </TableRow>
                <TableRow className="bg-blue-100">
                  <TableHead className="border border-gray-300 p-2">DENOMINACIÓN</TableHead>
                  <TableHead className="border border-gray-300 p-2">MÓDULOS</TableHead>
                  <TableHead className="border border-gray-300 p-2">MOD/VOL</TableHead>
                  <TableHead className="border border-gray-300 p-2">Tª</TableHead>
                  <TableHead className="border border-gray-300 p-2">CARGA Tª</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positivosData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="border border-gray-300 p-2">{row.denominacion}</TableCell>
                    <TableCell className="border border-gray-300 p-2">{row.modulos}</TableCell>
                    <TableCell className="border border-gray-300 p-2">{row.modVol}</TableCell>
                    <TableCell className="border border-gray-300 p-2">{row.temperatura}</TableCell>
                    <TableCell className="border border-gray-300 p-2">
                      {row.cargaT ? (typeof row.cargaT === 'number' ? Math.round(row.cargaT) : row.cargaT) : ""}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-gray-100">
                  <TableCell colSpan={4} className="border border-gray-300 p-2 text-right">
                    TOTAL CARGA TÉRMICA POSITIVA
                  </TableCell>
                  <TableCell className="border border-gray-300 p-2">
                    {Math.round(sumPositivos)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="mt-4 italic">No se encontraron datos de servicios positivos en el archivo Excel.</p>
        )}
        
        {negativosData.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-blue-100">
                  <TableHead colSpan={5} className="border border-gray-300 p-2 text-center font-bold">
                    SERVICIOS NEGATIVOS
                  </TableHead>
                </TableRow>
                <TableRow className="bg-blue-100">
                  <TableHead className="border border-gray-300 p-2">DENOMINACIÓN</TableHead>
                  <TableHead className="border border-gray-300 p-2">MÓDULOS</TableHead>
                  <TableHead className="border border-gray-300 p-2">MOD/VOL</TableHead>
                  <TableHead className="border border-gray-300 p-2">Tª</TableHead>
                  <TableHead className="border border-gray-300 p-2">CARGA Tª</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {negativosData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="border border-gray-300 p-2">{row.denominacion}</TableCell>
                    <TableCell className="border border-gray-300 p-2">{row.modulos}</TableCell>
                    <TableCell className="border border-gray-300 p-2">{row.modVol}</TableCell>
                    <TableCell className="border border-gray-300 p-2">{row.temperatura}</TableCell>
                    <TableCell className="border border-gray-300 p-2">
                      {row.cargaT ? (typeof row.cargaT === 'number' ? Math.round(row.cargaT) : row.cargaT) : ""}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-gray-100">
                  <TableCell colSpan={4} className="border border-gray-300 p-2 text-right">
                    TOTAL CARGA TÉRMICA NEGATIVA
                  </TableCell>
                  <TableCell className="border border-gray-300 p-2">
                    {Math.round(sumNegativos)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
        
        {!positivosData.length && !negativosData.length && (
          <p className="mt-4 italic">No se encontraron datos de cargas térmicas en el archivo Excel.</p>
        )}
      </div>
    </div>
  );
};

export default CargasTermicasSection;
