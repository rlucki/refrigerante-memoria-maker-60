
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface MemoriaCargaTermicaProps {
  excelData?: any;
}

const MemoriaCargaTermica: React.FC<MemoriaCargaTermicaProps> = ({ excelData }) => {
  // Función para convertir letra de columna a índice numérico
  const columnLetterToIndex = (columnLetter: string): number => {
    let result = 0;
    for (let i = 0; i < columnLetter.length; i++) {
      result = result * 26 + columnLetter.charCodeAt(i) - 64;
    }
    return result;
  };

  // Función para convertir índice numérico a letra de columna
  const indexToColumnLetter = (index: number): string => {
    let columnLetter = '';
    while (index > 0) {
      const remainder = (index - 1) % 26;
      columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
      index = Math.floor((index - 1) / 26);
    }
    return columnLetter || 'A';
  };

  // Función para extraer datos de un rango específico de celdas
  const extractDataFromRange = (
    sheet: any, 
    startCol: string, 
    endCol: string, 
    startRow: number, 
    endRow: number,
    columnMapping: { [key: string]: string }
  ): any[] => {
    if (!sheet) return [];
    
    const result = [];
    const startColIndex = columnLetterToIndex(startCol);
    const endColIndex = columnLetterToIndex(endCol);
    
    console.log(`Extrayendo datos del rango ${startCol}${startRow}-${endCol}${endRow}`);
    
    for (let row = startRow; row <= endRow; row++) {
      // Determina si la fila contiene datos válidos
      const hasValidData = Object.keys(columnMapping).some(key => {
        const colLetter = columnMapping[key];
        const cellKey = `${colLetter}${row}`;
        return sheet[cellKey] && sheet[cellKey].v !== undefined;
      });
      
      // Solo procesar filas que tengan al menos un dato
      if (hasValidData) {
        const rowData: any = {};
        
        // Extraer datos según el mapeo de columnas
        Object.keys(columnMapping).forEach(key => {
          const colLetter = columnMapping[key];
          const cellKey = `${colLetter}${row}`;
          rowData[key] = sheet[cellKey]?.v;
        });
        
        // Filtrar filas con encabezados específicos
        const firstColumnValue = rowData[Object.keys(rowData)[0]];
        if (firstColumnValue && 
            !["DENOMINACIÓN", "CENTRAL FRIGORÍFICA", "CARACTERÍSTICA", 
              "MAQUINARIA INSTALADA", "ELEMENTO", "CENTRAL POSITIVA", 
              "CENTRAL INTERMEDIA", "CENTRAL NEGATIVA", 
              "COMPRESORES PARALELOS"].includes(firstColumnValue)) {
          result.push(rowData);
        }
      }
    }
    
    return result;
  };

  // Extrae datos de un rango especificando columnas por nombre
  const extractTableData = (data: any, options: {
    sheet: string,
    startCol: string,
    endCol: string,
    startRow: number,
    endRow: number,
    mappings: { [key: string]: string }
  }): any[] => {
    if (!data) return [];
    
    console.log(`Procesando datos Excel para rango ${options.startCol}-${options.endCol}:`, data);
    
    // Para datos en formato de hoja de cálculo
    if (data && data[options.sheet]) {
      const sheet = data[options.sheet];
      return extractDataFromRange(sheet, options.startCol, options.endCol, options.startRow, options.endRow, options.mappings);
    }
    
    console.log(`No se encontró la hoja ${options.sheet} en los datos Excel`);
    return [];
  };
  
  // Calcular el sumatorio de la columna de carga térmica
  const calculateSum = (data: any[], field: string = "cargaT"): number => {
    return data.reduce((sum, row) => {
      const value = typeof row[field] === 'number' ? row[field] : 
                   (typeof row[field] === 'string' && !isNaN(parseFloat(row[field]))) ? 
                   parseFloat(row[field]) : 0;
      return sum + value;
    }, 0);
  };
  
  // Obtener datos para las tablas
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
  
  // ACTUALIZADO: Rango correcto para Central Positiva (14.1)
  const centralPositivaData = extractTableData(excelData, {
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
  
  // ACTUALIZADO: Rango correcto para Compresores Paralelos (14.2)
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
  
  // ACTUALIZADO: Rango correcto para Central Negativa (14.3)
  const centralNegativaData = extractTableData(excelData, {
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
  
  // Calcular sumatorios
  const sumPositivos = calculateSum(positivosData);
  const sumNegativos = calculateSum(negativosData);
  
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
            
            {/* Section 14.1 - CENTRAL POSITIVA */}
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
            
            {/* Section 14.2 - COMPRESORES PARALELOS */}
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
            
            {/* Section 14.3 - CENTRAL NEGATIVA */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaCargaTermica;
