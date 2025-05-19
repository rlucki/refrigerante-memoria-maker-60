
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface MemoriaCargaTermicaProps {
  excelData?: any;
}

const MemoriaCargaTermica: React.FC<MemoriaCargaTermicaProps> = ({ excelData }) => {
  // Function to extract relevant data from Excel data within A1:E60 range
  const extractTableData = (data: any) => {
    if (!data) return [];
    
    console.log("Procesando datos Excel:", data);
    
    // Primero vamos a verificar si los datos tienen un formato plano (como un array)
    if (Array.isArray(data) && data.length > 0) {
      console.log("Datos en formato array encontrados");
      
      // Filtramos filas que contengan datos útiles (eliminamos filas vacías y encabezados no deseados)
      const validRows = data.filter(row => {
        // Verificar que la fila tenga datos en la primera columna
        return row && 
               // "SERVICIOS CENTRAL INTERMEDIA" parece ser la columna de denominación
               row["SERVICIOS CENTRAL INTERMEDIA"] && 
               // Excluir filas con encabezados o totales específicos
               row["SERVICIOS CENTRAL INTERMEDIA"] !== "CENTRAL FRIGORÍFICA" &&
               row["SERVICIOS CENTRAL INTERMEDIA"] !== "Fabricante central" &&
               row["SERVICIOS CENTRAL INTERMEDIA"] !== "Modelo central" &&
               row["SERVICIOS CENTRAL INTERMEDIA"] !== "Nº de serie central" &&
               row["SERVICIOS CENTRAL INTERMEDIA"] !== "Tensión de alimentación" &&
               row["SERVICIOS CENTRAL INTERMEDIA"] !== "Dimensiones Central" &&
               row["SERVICIOS CENTRAL INTERMEDIA"] !== "Peso central";
      });
      
      // Extraer los datos relevantes de cada fila
      const formattedRows = validRows.map(row => {
        return {
          denominacion: row["SERVICIOS CENTRAL INTERMEDIA"] || "",
          modulos: row["__EMPTY"] || "",
          modVol: row["__EMPTY_1"] || "",
          temperatura: row["__EMPTY_2"] || "",
          cargaT: row["__EMPTY_3"] || ""
        };
      });
      
      console.log("Filas procesadas:", formattedRows);
      return formattedRows;
    }
    
    // Si no es un array, intentamos el formato de hoja de cálculo por nombre
    // Buscar la hoja "RESUM LEGA" 
    if (data["RESUM LEGA"]) {
      const sheet = data["RESUM LEGA"];
      console.log("Hoja RESUM LEGA encontrada:", sheet);
      
      const rows = [];
      
      // Iterar sobre las filas potenciales del A1 al E60
      for (let i = 1; i <= 60; i++) {
        const aKey = `A${i}`;
        const bKey = `B${i}`;
        const cKey = `C${i}`;
        const dKey = `D${i}`;
        const eKey = `E${i}`;
        
        // Si hay un valor en la columna A, procesamos la fila
        if (sheet[aKey] && sheet[aKey].v) {
          const row = {
            denominacion: sheet[aKey].v || "",
            modulos: sheet[bKey]?.v || "",
            modVol: sheet[cKey]?.v || "",
            temperatura: sheet[dKey]?.v || "",
            cargaT: sheet[eKey]?.v || ""
          };
          
          // Añadir fila solo si tiene denominación válida
          if (row.denominacion && row.denominacion !== "") {
            rows.push(row);
          }
        }
      }
      
      console.log("Filas extraídas de RESUM LEGA:", rows);
      return rows;
    }
    
    console.log("No se pudo procesar el formato de los datos Excel");
    return [];
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
                        <TableCell className="border border-gray-300 p-2">
                          {row.cargaT ? (typeof row.cargaT === 'number' ? Math.round(row.cargaT) : row.cargaT) : ""}
                        </TableCell>
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
