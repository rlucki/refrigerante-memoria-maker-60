
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface MemoriaCargaTermicaProps {
  excelData?: any;
}

const MemoriaCargaTermica: React.FC<MemoriaCargaTermicaProps> = ({ excelData }) => {
  // Function to extract relevant data from Excel data within A1:E60 range
  const extractTableData = (data: any) => {
    if (!data) return [];
    
    // Parse the data structure
    console.log("Excel data structure:", data);
    
    // Look for the "RESUM LEGA" sheet
    if (!data["RESUM LEGA"]) {
      console.log("No RESUM LEGA sheet found");
      return [];
    }
    
    const sheet = data["RESUM LEGA"];
    console.log("Sheet found:", sheet);
    
    // Prepare rows array
    const rows = [];
    
    // Start from row 1 and go through all possible rows up to 60
    for (let i = 1; i <= 60; i++) {
      const rowNum = i;
      
      // Get cell keys for this row (A1, B1, etc.)
      const aKey = `A${rowNum}`;
      const bKey = `B${rowNum}`;
      const cKey = `C${rowNum}`;
      const dKey = `D${rowNum}`;
      const eKey = `E${rowNum}`;
      
      // Check if this row has data in column A
      if (sheet[aKey] && sheet[aKey].v) {
        // Create a row with cell values from columns A to E
        const row = {
          denominacion: sheet[aKey]?.v || "",
          modulos: sheet[bKey]?.v || "",
          modVol: sheet[cKey]?.v || "",
          temperatura: sheet[dKey]?.v || "",
          cargaT: sheet[eKey]?.v || ""
        };
        
        // Add row only if it has a denomination
        if (row.denominacion && row.denominacion !== "") {
          rows.push(row);
        }
      }
    }
    
    console.log("Extracted table data:", rows);
    return rows;
  };
  
  // Get table data from Excel
  const tableData = extractTableData(excelData);
  
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Section 13 - CARGAS TÉRMICAS MUEBLES FRIGORÍFICOS Y CÁMARAS */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">13. CARGAS TÉRMICAS MUEBLES FRIGORÍFICOS Y CÁMARAS</h3>
          
          <div className="mt-4 text-sm text-justify">
            <p>
              De acuerdo con los datos facilitados considerando unas condiciones interiores de +24ºC/+60% y exteriores de +32ºC/65%, se han calculado las siguientes cargas térmicas para el mobiliario frigorífico, según los datos aportados por el fabricante, y las cámaras.
            </p>
            
            {tableData.length > 0 ? (
              <div className="mt-6 overflow-x-auto">
                <Table className="w-full border-collapse">
                  <TableHeader>
                    <TableRow className="bg-blue-100">
                      <TableHead className="border border-gray-300 p-2">DENOMINACIÓN</TableHead>
                      <TableHead className="border border-gray-300 p-2">MÓDULOS</TableHead>
                      <TableHead className="border border-gray-300 p-2">MOD/VOL</TableHead>
                      <TableHead className="border border-gray-300 p-2">Tª</TableHead>
                      <TableHead className="border border-gray-300 p-2">CARGA Tª</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="border border-gray-300 p-2">{row.denominacion}</TableCell>
                        <TableCell className="border border-gray-300 p-2">{row.modulos}</TableCell>
                        <TableCell className="border border-gray-300 p-2">{row.modVol}</TableCell>
                        <TableCell className="border border-gray-300 p-2">{row.temperatura}</TableCell>
                        <TableCell className="border border-gray-300 p-2">{row.cargaT ? Math.round(row.cargaT) : ""}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="mt-4 italic">No se encontraron datos de cargas térmicas en el archivo Excel.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaCargaTermica;
