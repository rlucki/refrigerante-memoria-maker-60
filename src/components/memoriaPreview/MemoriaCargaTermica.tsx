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
    
    // Para datos en formato array (como en los logs)
    if (Array.isArray(data) && data.length > 0) {
      console.log("Datos en formato array encontrados");
      
      // Filtrar encabezados y extraer datos para la primera tabla (A-E)
      if (range.startCol === 'A' && range.endCol === 'E') {
        // Filtramos filas que contengan datos útiles (eliminamos filas vacías y encabezados no deseados)
        const validRows = data.filter(row => {
          // Verificar que la fila tenga datos en la primera columna y no sea un encabezado
          return row && 
                 row["SERVICIOS CENTRAL INTERMEDIA"] && 
                 // Excluir filas con encabezados o totales específicos
                 row["SERVICIOS CENTRAL INTERMEDIA"] !== "DENOMINACIÓN" &&
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
        
        console.log("Filas procesadas para servicios positivos:", formattedRows);
        return formattedRows;
      } 
      // Para la segunda tabla (Q-U) - SERVICIOS NEGATIVOS
      else if (range.startCol === 'Q' && range.endCol === 'U') {
        const serviciosNegativos = [];
        
        // Buscar datos en el área Q-U usando las columnas correctas
        for (const row of data) {
          // Verificar columnas específicas para datos de servicios negativos
          if (row && 
              ((row["DENOMINACIÓN"] && row["MÓDULOS"] && row["Tª INT."]) || 
               (row["__EMPTY_16"] && row["__EMPTY_17"] && row["__EMPTY_19"]))) {
            
            // Extraer los datos usando las columnas correctas según el formato
            const denominacion = row["DENOMINACIÓN"] || row["__EMPTY_16"] || "";
            const modulos = row["MÓDULOS"] || row["__EMPTY_17"] || "";
            const modVol = row["MOD./PUERTAS"] || row["__EMPTY_18"] || "";
            const temperatura = row["Tª INT."] || row["__EMPTY_19"] || "";
            const cargaT = row["CARGA Tª"] || row["__EMPTY_20"] || "";
            
            // Filtrar filas de encabezado o totales
            if (denominacion !== "DENOMINACIÓN" && denominacion) {
              serviciosNegativos.push({
                denominacion,
                modulos,
                modVol,
                temperatura,
                cargaT
              });
            }
          }
        }
        
        console.log("Filas procesadas para servicios negativos:", serviciosNegativos);
        return serviciosNegativos;
      }
      // Para la tabla de Maquinaria Instalada (G-H)
      else if (range.startCol === 'G' && range.endCol === 'H') {
        const maquinaria = [];
        
        // Buscar datos en el área G-H
        for (const row of data) {
          if (row && 
             ((row["__EMPTY_6"] || row["Unnamed: 6"] || row["MAQUINARIA INSTALADA"]) && 
              (row["__EMPTY_6"] !== "MAQUINARIA INSTALADA" && 
               row["__EMPTY_6"] !== "ELEMENTO" && 
               row["__EMPTY_6"] !== "CENTRAL FRIGORÍFICA"))) {
            
            const elemento = row["__EMPTY_6"] || row["Unnamed: 6"] || row["MAQUINARIA INSTALADA"] || "";
            const detalles = row["__EMPTY_7"] || row["Unnamed: 7"] || row["ELEMENTO"] || "";
            
            // Solo agregar filas no vacías
            if (elemento && elemento !== "MAQUINARIA INSTALADA" && elemento !== "ELEMENTO") {
              maquinaria.push({
                elemento: elemento,
                detalles: detalles
              });
            }
          }
        }
        
        console.log("Filas procesadas para maquinaria instalada:", maquinaria);
        return maquinaria;
      }
      // Para la tabla de Central Positiva (J-O)
      else if (range.startCol === 'J' && range.endCol === 'O') {
        const centralPositiva = [];
        
        // Buscar datos en el área J-O
        for (const row of data) {
          if (row) {
            // Intentar extraer los datos usando diferentes posibles nombres de columnas
            const caracteristica = row["__EMPTY_9"] || row["Unnamed: 9"] || row["CENTRAL POSITIVA"] || row["CARACTERÍSTICA"] || "";
            const medidas = row["__EMPTY_10"] || row["Unnamed: 10"] || row["MEDIDAS"] || "";
            const observaciones = row["__EMPTY_14"] || row["Unnamed: 14"] || row["OBSERVACIONES"] || "";
            
            // Solo agregar filas no vacías y no encabezados
            if (caracteristica && 
                caracteristica !== "CENTRAL POSITIVA" && 
                caracteristica !== "CARACTERÍSTICA") {
              centralPositiva.push({
                caracteristica,
                medidas,
                observaciones
              });
            }
          }
        }
        
        console.log("Filas procesadas para central positiva:", centralPositiva);
        return centralPositiva;
      }
      // Para la tabla de Compresores Paralelos (W-Z)
      else if (range.startCol === 'W' && range.endCol === 'Z') {
        const compresoresParalelos = [];
        
        // Buscar datos en el área W-Z
        for (const row of data) {
          if (row) {
            // Intentar extraer los datos usando diferentes posibles nombres de columnas
            const caracteristica = row["__EMPTY_22"] || row["Unnamed: 22"] || row["COMPRESORES PARALELOS"] || row["CARACTERÍSTICA"] || "";
            const medidas = row["__EMPTY_23"] || row["Unnamed: 23"] || row["MEDIDAS"] || "";
            const observaciones = row["__EMPTY_25"] || row["Unnamed: 25"] || row["OBSERVACIONES"] || "";
            
            // Solo agregar filas no vacías y no encabezados
            if (caracteristica && 
                caracteristica !== "COMPRESORES PARALELOS" && 
                caracteristica !== "CARACTERÍSTICA") {
              compresoresParalelos.push({
                caracteristica,
                medidas,
                observaciones
              });
            }
          }
        }
        
        console.log("Filas procesadas para compresores paralelos:", compresoresParalelos);
        return compresoresParalelos;
      }
    }
    
    // Para datos en formato de hoja de cálculo
    if (data && data["RESUM LEGA"]) {
      const sheet = data["RESUM LEGA"];
      console.log(`Hoja RESUM LEGA encontrada para rango ${range.startCol}-${range.endCol}:`, sheet);
      
      const rows = [];
      
      // Determinar las columnas según el rango
      if (range.startCol === 'A' && range.endCol === 'E') {
        const colMapping = { denom: 'A', modulos: 'B', modVol: 'C', temp: 'D', carga: 'E' };
        
        // Iterar sobre las filas potenciales
        for (let i = range.startIndex; i <= range.endIndex; i++) {
          const denomKey = `${colMapping.denom}${i}`;
          
          // Verificar si hay valor en la columna de denominación
          if (sheet[denomKey] && sheet[denomKey].v && 
              sheet[denomKey].v !== "DENOMINACIÓN" &&
              sheet[denomKey].v !== "CENTRAL FRIGORÍFICA") {
            const row = {
              denominacion: sheet[denomKey].v || "",
              modulos: sheet[`${colMapping.modulos}${i}`]?.v || "",
              modVol: sheet[`${colMapping.modVol}${i}`]?.v || "",
              temperatura: sheet[`${colMapping.temp}${i}`]?.v || "",
              cargaT: sheet[`${colMapping.carga}${i}`]?.v || ""
            };
            
            rows.push(row);
          }
        }
      } 
      else if (range.startCol === 'Q' && range.endCol === 'U') {
        const colMapping = { denom: 'Q', modulos: 'R', modVol: 'S', temp: 'T', carga: 'U' };
        
        for (let i = range.startIndex; i <= range.endIndex; i++) {
          const denomKey = `${colMapping.denom}${i}`;
          
          if (sheet[denomKey] && sheet[denomKey].v && sheet[denomKey].v !== "DENOMINACIÓN") {
            const row = {
              denominacion: sheet[denomKey].v || "",
              modulos: sheet[`${colMapping.modulos}${i}`]?.v || "",
              modVol: sheet[`${colMapping.modVol}${i}`]?.v || "",
              temperatura: sheet[`${colMapping.temp}${i}`]?.v || "",
              cargaT: sheet[`${colMapping.carga}${i}`]?.v || ""
            };
            
            rows.push(row);
          }
        }
      }
      else if (range.startCol === 'G' && range.endCol === 'H') {
        // Para la tabla de maquinaria instalada
        for (let i = range.startIndex; i <= range.endIndex; i++) {
          const elementoKey = `G${i}`;
          
          if (sheet[elementoKey] && sheet[elementoKey].v && 
              sheet[elementoKey].v !== "MAQUINARIA INSTALADA" &&
              sheet[elementoKey].v !== "ELEMENTO" &&
              sheet[elementoKey].v !== "CENTRAL FRIGORÍFICA") {
            
            rows.push({
              elemento: sheet[elementoKey].v || "",
              detalles: sheet[`H${i}`]?.v || ""
            });
          }
        }
      }
      else if (range.startCol === 'J' && range.endCol === 'O') {
        // Para la tabla de central positiva
        for (let i = range.startIndex; i <= range.endIndex; i++) {
          const caracteristicaKey = `J${i}`;
          
          if (sheet[caracteristicaKey] && sheet[caracteristicaKey].v && 
              sheet[caracteristicaKey].v !== "CENTRAL POSITIVA" &&
              sheet[caracteristicaKey].v !== "CARACTERÍSTICA") {
            
            rows.push({
              caracteristica: sheet[caracteristicaKey].v || "",
              medidas: sheet[`K${i}`]?.v || sheet[`L${i}`]?.v || "",
              observaciones: sheet[`O${i}`]?.v || ""
            });
          }
        }
      }
      else if (range.startCol === 'W' && range.endCol === 'Z') {
        // Para la tabla de compresores paralelos
        for (let i = range.startIndex; i <= range.endIndex; i++) {
          const caracteristicaKey = `W${i}`;
          
          if (sheet[caracteristicaKey] && sheet[caracteristicaKey].v && 
              sheet[caracteristicaKey].v !== "COMPRESORES PARALELOS" &&
              sheet[caracteristicaKey].v !== "CARACTERÍSTICA") {
            
            rows.push({
              caracteristica: sheet[caracteristicaKey].v || "",
              medidas: sheet[`X${i}`]?.v || "",
              observaciones: sheet[`Z${i}`]?.v || ""
            });
          }
        }
      }
      
      console.log(`Filas extraídas de RESUM LEGA (${range.startCol}-${range.endCol}):`, rows);
      return rows;
    }
    
    console.log(`No se pudo procesar el formato de los datos Excel para rango ${range.startCol}-${range.endCol}`);
    return [];
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
  const centralPositivaData = extractTableData(excelData, { startCol: 'J', endCol: 'O', startIndex: 1, endIndex: 20 });
  const compresoresParalelosData = extractTableData(excelData, { startCol: 'W', endCol: 'Z', startIndex: 1, endIndex: 20 });
  
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
                        <TableHead className="border border-gray-300 p-2">CARACTERÍSTICA</TableHead>
                        <TableHead className="border border-gray-300 p-2">MEDIDAS</TableHead>
                        <TableHead className="border border-gray-300 p-2">OBSERVACIONES</TableHead>
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
                        <TableHead className="border border-gray-300 p-2">CARACTERÍSTICA</TableHead>
                        <TableHead className="border border-gray-300 p-2">MEDIDAS</TableHead>
                        <TableHead className="border border-gray-300 p-2">OBSERVACIONES</TableHead>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaCargaTermica;
