import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface MemoriaCargaTermicaProps {
  excelData?: any;
}

const MemoriaCargaTermica: React.FC<MemoriaCargaTermicaProps> = ({ excelData }) => {
  // Function to extract relevant data from Excel data within specific ranges
  const extractTableData = (data: any, range: { startCol: string, endCol: string, startIndex: number, endIndex: number }) => {
    if (!data) return [];
    
    console.log(`Procesando datos Excel para rango ${range.startCol}-${range.endCol}:`, data);
    
    // For parsing specific tables with special formatting
    const extractCentralIntermedia = (data: any) => {
      if (!data) return [];
      
      const centralIntermedia = [];
      
      // First try to extract from array format
      if (Array.isArray(data) && data.length > 0) {
        for (const row of data) {
          if (row) {
            // Use direct property names that match the Excel structure
            const caracteristica = row["CARACTERÍSTICA"] || row["__EMPTY_9"] || row["Unnamed: 9"] || row["CENTRAL POSITIVA"] || row["CENTRAL INTERMEDIA"] || "";
            
            // Skip header rows and empty rows
            if (caracteristica && 
                caracteristica !== "CENTRAL POSITIVA" && 
                caracteristica !== "CENTRAL INTERMEDIA" &&
                caracteristica !== "CARACTERÍSTICA") {
              
              // Create a row object that matches the structure in the screenshots
              const rowData: any = {
                caracteristica
              };
              
              // Add specific measurements based on the characteristic type
              if (caracteristica === "Modelos compresores" || 
                  caracteristica === "Nº de serie compresores" || 
                  caracteristica === "Potencia frigorífica" ||
                  caracteristica === "Potencia absorbida" ||
                  caracteristica === "Potencia absorbida máxima" ||
                  caracteristica === "Caudal Másico" ||
                  caracteristica === "Desplazamiento Volumétrico" ||
                  caracteristica === "Intensidad a régimen" ||
                  caracteristica === "Intensidad máxima") {
                  
                  // Add multiple columns if needed
                  rowData.col1 = row["__EMPTY_10"] || "";
                  rowData.col2 = row["__EMPTY_11"] || "";
                  rowData.col3 = row["__EMPTY_12"] || "";
                  rowData.col4 = row["__EMPTY_13"] || "";
                  rowData.total = row["__EMPTY_14"] || "";
              } else {
                // For single-value rows
                rowData.valor = row["__EMPTY_10"] || "";
                
                // Add additional columns like pressure if available
                if (caracteristica.includes("Presión") || caracteristica.includes("Temp")) {
                  rowData.separator = "/";
                  rowData.presion = row["__EMPTY_11"] || "";
                }
              }
              
              centralIntermedia.push(rowData);
            }
          }
        }
      }
      
      // If we couldn't find data in array format, try sheet format
      if (centralIntermedia.length === 0 && data && data["RESUM LEGA"]) {
        const sheet = data["RESUM LEGA"];
        
        for (let i = 1; i <= 30; i++) {
          const caracteristicaKey = `J${i}`;
          
          if (sheet[caracteristicaKey] && sheet[caracteristicaKey].v && 
              sheet[caracteristicaKey].v !== "CENTRAL POSITIVA" && 
              sheet[caracteristicaKey].v !== "CENTRAL INTERMEDIA" &&
              sheet[caracteristicaKey].v !== "CARACTERÍSTICA") {
            
            const caracteristica = sheet[caracteristicaKey].v;
            const rowData: any = {
              caracteristica
            };
            
            // Add specific measurements based on the characteristic type
            if (caracteristica === "Modelos compresores" || 
                caracteristica === "Nº de serie compresores" || 
                caracteristica === "Potencia frigorífica" ||
                caracteristica === "Potencia absorbida" ||
                caracteristica === "Potencia absorbida máxima" ||
                caracteristica === "Caudal Másico" ||
                caracteristica === "Desplazamiento Volumétrico" ||
                caracteristica === "Intensidad a régimen" ||
                caracteristica === "Intensidad máxima") {
                
                // Add multiple columns if needed
                rowData.col1 = sheet[`K${i}`]?.v || "";
                rowData.col2 = sheet[`L${i}`]?.v || "";
                rowData.col3 = sheet[`M${i}`]?.v || "";
                rowData.col4 = sheet[`N${i}`]?.v || "";
                rowData.total = sheet[`O${i}`]?.v || "";
            } else {
              // For single-value rows
              rowData.valor = sheet[`K${i}`]?.v || "";
              
              // Add additional columns like pressure if available
              if (caracteristica.includes("Presión") || caracteristica.includes("Temp")) {
                rowData.separator = "/";
                rowData.presion = sheet[`L${i}`]?.v || "";
              }
            }
            
            centralIntermedia.push(rowData);
          }
        }
      }
      
      return centralIntermedia;
    };
    
    const extractCompresoresParalelos = (data: any) => {
      if (!data) return [];
      
      const compresoresParalelos = [];
      
      // First try to extract from array format
      if (Array.isArray(data) && data.length > 0) {
        for (const row of data) {
          if (row) {
            // Use direct property names that match the Excel structure
            const caracteristica = row["CARACTERÍSTICA"] || row["__EMPTY_22"] || row["Unnamed: 22"] || row["COMPRESORES PARALELOS"] || "";
            
            // Skip header rows and empty rows
            if (caracteristica && 
                caracteristica !== "COMPRESORES PARALELOS" && 
                caracteristica !== "CARACTERÍSTICA") {
              
              // Create a row object that matches the structure in the screenshots
              const rowData: any = {
                caracteristica
              };
              
              // Add specific measurements based on the characteristic type
              if (caracteristica === "Modelos compresores" || 
                  caracteristica === "Nº de serie compresores" || 
                  caracteristica === "Potencia absorbida" ||
                  caracteristica === "Potencia absorbida máxima" ||
                  caracteristica === "Caudal Másico" ||
                  caracteristica === "Desplazamiento Volumétrico" ||
                  caracteristica === "Intensidad a régimen" ||
                  caracteristica === "Intensidad máxima") {
                  
                  // Add multiple columns if needed
                  rowData.col1 = row["__EMPTY_23"] || "";
                  rowData.col2 = row["__EMPTY_24"] || "";
                  rowData.total = row["__EMPTY_25"] || "";
              } else {
                // For single-value rows
                rowData.valor = row["__EMPTY_23"] || "";
                
                // Add additional columns like pressure if available
                if (caracteristica.includes("Presión") || caracteristica.includes("Temp")) {
                  rowData.separator = "/";
                  rowData.presion = row["__EMPTY_24"] || "";
                }
              }
              
              compresoresParalelos.push(rowData);
            }
          }
        }
      }
      
      // If we couldn't find data in array format, try sheet format
      if (compresoresParalelos.length === 0 && data && data["RESUM LEGA"]) {
        const sheet = data["RESUM LEGA"];
        
        for (let i = 1; i <= 30; i++) {
          const caracteristicaKey = `W${i}`;
          
          if (sheet[caracteristicaKey] && sheet[caracteristicaKey].v && 
              sheet[caracteristicaKey].v !== "COMPRESORES PARALELOS" && 
              sheet[caracteristicaKey].v !== "CARACTERÍSTICA") {
            
            const caracteristica = sheet[caracteristicaKey].v;
            const rowData: any = {
              caracteristica
            };
            
            // Add specific measurements based on the characteristic type
            if (caracteristica === "Modelos compresores" || 
                caracteristica === "Nº de serie compresores" || 
                caracteristica === "Potencia absorbida" ||
                caracteristica === "Potencia absorbida máxima" ||
                caracteristica === "Caudal Másico" ||
                caracteristica === "Desplazamiento Volumétrico" ||
                caracteristica === "Intensidad a régimen" ||
                caracteristica === "Intensidad máxima") {
                
                // Add multiple columns if needed
                rowData.col1 = sheet[`X${i}`]?.v || "";
                rowData.col2 = sheet[`Y${i}`]?.v || "";
                rowData.total = sheet[`Z${i}`]?.v || "";
            } else {
              // For single-value rows
              rowData.valor = sheet[`X${i}`]?.v || "";
              
              // Add additional columns like pressure if available
              if (caracteristica.includes("Presión") || caracteristica.includes("Temp")) {
                rowData.separator = "/";
                rowData.presion = sheet[`Y${i}`]?.v || "";
              }
            }
            
            compresoresParalelos.push(rowData);
          }
        }
      }
      
      return compresoresParalelos;
    };
    
    const extractCentralNegativa = (data: any) => {
      if (!data) return [];
      
      const centralNegativa = [];
      
      // First try to extract from array format
      if (Array.isArray(data) && data.length > 0) {
        for (const row of data) {
          if (row) {
            // Use direct property names that match the Excel structure
            const caracteristica = row["CARACTERÍSTICA"] || row["__EMPTY_29"] || row["Unnamed: 29"] || row["CENTRAL NEGATIVA"] || "";
            
            // Skip header rows and empty rows
            if (caracteristica && 
                caracteristica !== "CENTRAL NEGATIVA" && 
                caracteristica !== "CARACTERÍSTICA") {
              
              // Create a row object that matches the structure in the screenshots
              const rowData: any = {
                caracteristica
              };
              
              // Add specific measurements based on the characteristic type
              if (caracteristica === "Modelos compresores" || 
                  caracteristica === "Nº de serie compresores" || 
                  caracteristica === "Potencia frigorífica" ||
                  caracteristica === "Potencia absorbida" ||
                  caracteristica === "Potencia absorbida máxima" ||
                  caracteristica === "COP" ||
                  caracteristica === "Caudal Másico" ||
                  caracteristica === "Desplazamiento Volumétrico" ||
                  caracteristica === "Intensidad a régimen" ||
                  caracteristica === "Intensidad máxima") {
                  
                  // Add multiple columns if needed
                  rowData.col1 = row["__EMPTY_30"] || "";
                  rowData.col2 = row["__EMPTY_31"] || "";
                  rowData.col3 = row["__EMPTY_32"] || "";
                  rowData.total = row["__EMPTY_33"] || "";
              } else {
                // For single-value rows
                rowData.valor = row["__EMPTY_30"] || "";
                
                // Add additional columns like pressure if available
                if (caracteristica.includes("Presión") || caracteristica.includes("Temp")) {
                  rowData.separator = "/";
                  rowData.presion = row["__EMPTY_31"] || "";
                  rowData.valor2 = row["__EMPTY_32"] || "";
                  rowData.presion2 = row["__EMPTY_33"] || "";
                }
              }
              
              centralNegativa.push(rowData);
            }
          }
        }
      }
      
      // If we couldn't find data in array format, try sheet format
      if (centralNegativa.length === 0 && data && data["RESUM LEGA"]) {
        const sheet = data["RESUM LEGA"];
        
        for (let i = 1; i <= 30; i++) {
          const caracteristicaKey = `AD${i}`;
          
          if (sheet[caracteristicaKey] && sheet[caracteristicaKey].v && 
              sheet[caracteristicaKey].v !== "CENTRAL NEGATIVA" && 
              sheet[caracteristicaKey].v !== "CARACTERÍSTICA") {
            
            const caracteristica = sheet[caracteristicaKey].v;
            const rowData: any = {
              caracteristica
            };
            
            // Add specific measurements based on the characteristic type
            if (caracteristica === "Modelos compresores" || 
                caracteristica === "Nº de serie compresores" || 
                caracteristica === "Potencia frigorífica" ||
                caracteristica === "Potencia absorbida" ||
                caracteristica === "Potencia absorbida máxima" ||
                caracteristica === "COP" ||
                caracteristica === "Caudal Másico" ||
                caracteristica === "Desplazamiento Volumétrico" ||
                caracteristica === "Intensidad a régimen" ||
                caracteristica === "Intensidad máxima") {
                
                // Add multiple columns if needed
                rowData.col1 = sheet[`AE${i}`]?.v || "";
                rowData.col2 = sheet[`AF${i}`]?.v || "";
                rowData.col3 = sheet[`AG${i}`]?.v || "";
                rowData.total = sheet[`AH${i}`]?.v || "";
            } else {
              // For single-value rows
              rowData.valor = sheet[`AE${i}`]?.v || "";
              
              // Add additional columns like pressure if available
              if (caracteristica.includes("Presión") || caracteristica.includes("Temp")) {
                rowData.separator = "/";
                rowData.presion = sheet[`AF${i}`]?.v || "";
                rowData.valor2 = sheet[`AG${i}`]?.v || "";
                rowData.presion2 = sheet[`AH${i}`]?.v || "";
              }
            }
            
            centralNegativa.push(rowData);
          }
        }
      }
      
      return centralNegativa;
    };
    
    if (range.startCol === 'J' && range.endCol === 'O') {
      return extractCentralIntermedia(data);
    } else if (range.startCol === 'W' && range.endCol === 'Z') {
      return extractCompresoresParalelos(data);
    } else if (range.startCol === 'AD' && range.endCol === 'AH') {
      return extractCentralNegativa(data);
    }
  };
  
  // Calcular el sumatorio de la columna de carga térmica
  const calculateSum = (data: any[]): number => {
    return data.reduce((sum, row) => {
      const value = typeof row.cargaT === 'number' ? row.cargaT : 
                    (typeof row.cargaT === 'string' && !isNaN(parseFloat(row.cargaT))) ? 
                    parseFloat(row.cargaT) : 0;
      return sum + value;
    }, 0);
  };
  
  // Obtener datos para las tablas
  const positivosData = extractTableData(excelData, { startCol: 'A', endCol: 'E', startIndex: 1, endIndex: 60 });
  const negativosData = extractTableData(excelData, { startCol: 'Q', endCol: 'U', startIndex: 1, endIndex: 60 });
  const maquinariaData = extractTableData(excelData, { startCol: 'G', endCol: 'H', startIndex: 1, endIndex: 9 });
  const centralIntermediaData = extractTableData(excelData, { startCol: 'J', endCol: 'O', startIndex: 1, endIndex: 20 });
  const compresoresParalelosData = extractTableData(excelData, { startCol: 'W', endCol: 'Z', startIndex: 1, endIndex: 20 });
  const centralNegativaData = extractTableData(excelData, { startCol: 'AD', endCol: 'AH', startIndex: 1, endIndex: 20 });
  
  const renderCentralIntermediaTable = () => {
    return (
      <div className="mt-4 overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead colSpan={6} className="border border-gray-600 p-2 text-center font-bold">
                CENTRAL INTERMEDIA
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {centralIntermediaData.map((row: any, index: number) => {
              // Rows with multiple columns (like "Modelos compresores")
              if (row.col1 !== undefined) {
                return (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <TableCell className="border border-gray-300 p-2 font-medium">{row.caracteristica}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center">{row.col1}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center">{row.col2}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center">{row.col3}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center">{row.col4}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center font-bold">{row.total}</TableCell>
                  </TableRow>
                );
              }
              // Rows with temperature/pressure
              else if (row.separator) {
                return (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <TableCell className="border border-gray-300 p-2 font-medium">{row.caracteristica}</TableCell>
                    <TableCell colSpan={4} className="border border-gray-300 p-2 text-center">
                      {row.valor ? `${row.valor} ºC` : ""} {row.separator} {row.presion ? `${row.presion} bar` : ""}
                    </TableCell>
                    <TableCell className="border border-gray-300 p-2"></TableCell>
                  </TableRow>
                );
              }
              // Regular rows
              else {
                return (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <TableCell className="border border-gray-300 p-2 font-medium">{row.caracteristica}</TableCell>
                    <TableCell colSpan={5} className="border border-gray-300 p-2 text-center">{row.valor}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  const renderCompresoresParalelosTable = () => {
    return (
      <div className="mt-4 overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead colSpan={4} className="border border-gray-600 p-2 text-center font-bold">
                COMPRESORES PARALELOS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {compresoresParalelosData.map((row: any, index: number) => {
              // Rows with multiple columns
              if (row.col1 !== undefined) {
                return (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <TableCell className="border border-gray-300 p-2 font-medium">{row.caracteristica}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center">{row.col1}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center">{row.col2}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center font-bold">{row.total}</TableCell>
                  </TableRow>
                );
              }
              // Rows with temperature/pressure
              else if (row.separator) {
                return (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <TableCell className="border border-gray-300 p-2 font-medium">{row.caracteristica}</TableCell>
                    <TableCell colSpan={3} className="border border-gray-300 p-2 text-center">
                      {row.valor ? `${row.valor} ºC` : ""} {row.separator} {row.presion ? `${row.presion} bar` : ""}
                    </TableCell>
                  </TableRow>
                );
              }
              // Regular rows
              else {
                return (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <TableCell className="border border-gray-300 p-2 font-medium">{row.caracteristica}</TableCell>
                    <TableCell colSpan={3} className="border border-gray-300 p-2 text-center">{row.valor}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  const renderCentralNegativaTable = () => {
    return (
      <div className="mt-4 overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead colSpan={5} className="border border-gray-600 p-2 text-center font-bold">
                CENTRAL NEGATIVA
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {centralNegativaData.map((row: any, index: number) => {
              // Rows with multiple columns
              if (row.col1 !== undefined) {
                return (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <TableCell className="border border-gray-300 p-2 font-medium">{row.caracteristica}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center">{row.col1}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center">{row.col2}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center">{row.col3}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-center font-bold">{row.total}</TableCell>
                  </TableRow>
                );
              }
              // Rows with temperature/pressure
              else if (row.separator) {
                return (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <TableCell className="border border-gray-300 p-2 font-medium">{row.caracteristica}</TableCell>
                    <TableCell colSpan={4} className="border border-gray-300 p-2 text-center">
                      {row.valor ? `${row.valor} ºC` : ""} {row.separator} {row.presion ? `${row.presion} bar` : ""}
                    </TableCell>
                  </TableRow>
                );
              }
              // Regular rows
              else {
                return (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <TableCell className="border border-gray-300 p-2 font-medium">{row.caracteristica}</TableCell>
                    <TableCell colSpan={4} className="border border-gray-300 p-2 text-center">{row.valor}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

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
                        {Math.round(calculateSum(positivosData))}
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
                        {Math.round(calculateSum(negativosData))}
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
        
        {/* Section 14 - MAQUINARIA INSTALADA */}
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
            
            {/* Section 14.1 - CENTRAL INTERMEDIA */}
            <div className="mt-8">
              <h4 className="text-md font-bold">14.1. CENTRAL INTERMEDIA</h4>
              <p className="mt-2">
                Se trata de una central frigorífica formada por compresores semiherméticos alternativos accionados mediante un motor eléctrico trifásico. Sus características técnicas son las siguientes:
              </p>
              
              {centralIntermediaData.length > 0 ? (
                renderCentralIntermediaTable()
              ) : (
                <p className="mt-4 italic">No se encontraron datos de la central intermedia en el archivo Excel.</p>
              )}
            </div>
            
            {/* Section 14.2 - COMPRESORES PARALELOS */}
            <div className="mt-8">
              <h4 className="text-md font-bold">14.2. COMPRESORES PARALELOS</h4>
              <p className="mt-2">
                La bancada "booster" incluye compresor/es denominados paralelos (IT), que descargan sobre el mismo colector que la central positiva y que tienen como misión comprimir una parte de los gases flash procedentes del correspondiente recipiente de líquido, pero a una temperatura de evaporación más elevada, lo que redunda en una mayor eficiencia energética de las centrales. Estos compresores son también del tipo semihermético, y sus características técnicas son las que siguen:
              </p>
              
              {compresoresParalelosData.length > 0 ? (
                renderCompresoresParalelosTable()
              ) : (
                <p className="mt-4 italic">No se encontraron datos de los compresores paralelos en el archivo Excel.</p>
              )}
            </div>
            
            {/* Section 14.3 - CENTRAL NEGATIVA */}
            <div className="mt-8">
              <h4 className="text-md font-bold">14.3. CENTRAL NEGATIVA</h4>
              <p className="mt-2">
                Central frigorífica formada por compresores semiherméticos alternativos, accionados mediante un motor eléctrico trifásico. Está ubicada en la misma bancada que la central anterior, a diferente altura. Sus características técnicas son las siguientes:
              </p>
              
              {centralNegativaData.length > 0 ? (
                renderCentralNegativaTable()
              ) : (
                <p className="mt-4 italic">No se encontraron datos de la central negativa en el archivo Excel.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaCargaTermica;
