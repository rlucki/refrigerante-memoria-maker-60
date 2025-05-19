
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MemoriaEvaporadoresProps {
  excelData?: any;
}

const MemoriaEvaporadores: React.FC<MemoriaEvaporadoresProps> = ({ excelData }) => {
  // Extract data from Excel if available
  const evaporadoresData = React.useMemo(() => {
    if (!excelData || !excelData['RESUM LEGA']) return [];
    
    try {
      // Filter for rows between AJ1 and AQ15
      const evaporadoresRows = [];
      
      // Process the Excel data to extract evaporadores information
      if (excelData['RESUM LEGA']) {
        for (let i = 1; i <= 15; i++) {
          const rowData = {
            modelo: excelData['RESUM LEGA'][`AJ${i}`]?.v || '',
            potencia: excelData['RESUM LEGA'][`AK${i}`]?.v || '',
            cantidad: excelData['RESUM LEGA'][`AL${i}`]?.v || '',
            temperatura: excelData['RESUM LEGA'][`AM${i}`]?.v || '',
            desescarche: excelData['RESUM LEGA'][`AN${i}`]?.v || '',
            ventiladores: excelData['RESUM LEGA'][`AO${i}`]?.v || '',
            caudal: excelData['RESUM LEGA'][`AP${i}`]?.v || '',
            ubicacion: excelData['RESUM LEGA'][`AQ${i}`]?.v || '',
          };
          
          // Only add rows that have data (at least model or power)
          if (rowData.modelo || rowData.potencia) {
            evaporadoresRows.push(rowData);
          }
        }
      }
      
      return evaporadoresRows;
    } catch (error) {
      console.error("Error extracting evaporadores data:", error);
      return [];
    }
  }, [excelData]);

  // Extract central negativa data if available
  const centralNegativaData = React.useMemo(() => {
    if (!excelData || !excelData['RESUM LEGA']) return [];
    
    try {
      // Filter for rows between AD1 and AH20
      const centralNegativaRows = [];
      
      // Process the Excel data to extract central negativa information
      if (excelData['RESUM LEGA']) {
        for (let i = 1; i <= 20; i++) {
          const rowData = {
            caracteristica: excelData['RESUM LEGA'][`AD${i}`]?.v || '',
            valor: excelData['RESUM LEGA'][`AE${i}`]?.v || '',
            unidad: excelData['RESUM LEGA'][`AF${i}`]?.v || '',
            observaciones: excelData['RESUM LEGA'][`AG${i}`]?.v || '',
            referencia: excelData['RESUM LEGA'][`AH${i}`]?.v || '',
          };
          
          // Only add rows that have data
          if (rowData.caracteristica || rowData.valor) {
            centralNegativaRows.push(rowData);
          }
        }
      }
      
      return centralNegativaRows;
    } catch (error) {
      console.error("Error extracting central negativa data:", error);
      return [];
    }
  }, [excelData]);

  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* First we show the Central Negativa section (14.3) */}
        <h3 className="text-lg font-bold">14.3. CENTRAL NEGATIVA</h3>
        
        {centralNegativaData.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="border border-gray-300 p-2 text-xs">Característica</TableHead>
                  <TableHead className="border border-gray-300 p-2 text-xs">Valor</TableHead>
                  <TableHead className="border border-gray-300 p-2 text-xs">Unidad</TableHead>
                  <TableHead className="border border-gray-300 p-2 text-xs">Observaciones</TableHead>
                  <TableHead className="border border-gray-300 p-2 text-xs">Referencia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {centralNegativaData.map((row, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="border border-gray-300 p-2 text-xs">{row.caracteristica}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-xs">{row.valor}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-xs">{row.unidad}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-xs">{row.observaciones}</TableCell>
                    <TableCell className="border border-gray-300 p-2 text-xs">{row.referencia}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="italic text-gray-500">No se encontraron datos de central negativa en el Excel.</p>
        )}
        
        {/* Then we show the Evaporadores section (14.12) */}
        <h3 className="text-lg font-bold mt-8">14.12. EVAPORADORES</h3>
        
        <div className="mt-4 text-sm text-justify">
          <p className="mb-4">
            En cada cámara se instala un evaporador convenientemente dimensionado y dotado de ventiladores 
            axiales y baterías de intercambio con tubos de cobre y aletas de aluminio, cuya separación 
            está en función de la temperatura interior deseada. Están diseñados para soportar las presiones 
            de trabajo alcanzadas por el refrigerante. Los evaporadores instalados son los siguientes:
          </p>
          
          {evaporadoresData.length > 0 ? (
            <div className="overflow-x-auto mt-4">
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="border border-gray-300 p-2 text-xs">Modelo</TableHead>
                    <TableHead className="border border-gray-300 p-2 text-xs">Potencia (W)</TableHead>
                    <TableHead className="border border-gray-300 p-2 text-xs">Cantidad</TableHead>
                    <TableHead className="border border-gray-300 p-2 text-xs">Temperatura (°C)</TableHead>
                    <TableHead className="border border-gray-300 p-2 text-xs">Desescarche</TableHead>
                    <TableHead className="border border-gray-300 p-2 text-xs">Ventiladores</TableHead>
                    <TableHead className="border border-gray-300 p-2 text-xs">Caudal (m³/h)</TableHead>
                    <TableHead className="border border-gray-300 p-2 text-xs">Ubicación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evaporadoresData.map((row, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <TableCell className="border border-gray-300 p-2 text-xs">{row.modelo}</TableCell>
                      <TableCell className="border border-gray-300 p-2 text-xs">{row.potencia}</TableCell>
                      <TableCell className="border border-gray-300 p-2 text-xs">{row.cantidad}</TableCell>
                      <TableCell className="border border-gray-300 p-2 text-xs">{row.temperatura}</TableCell>
                      <TableCell className="border border-gray-300 p-2 text-xs">{row.desescarche}</TableCell>
                      <TableCell className="border border-gray-300 p-2 text-xs">{row.ventiladores}</TableCell>
                      <TableCell className="border border-gray-300 p-2 text-xs">{row.caudal}</TableCell>
                      <TableCell className="border border-gray-300 p-2 text-xs">{row.ubicacion}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="italic text-gray-500">No se encontraron datos de evaporadores en el Excel.</p>
          )}
          
          <div className="mt-6">
            <p className="mb-4">
              El desescarche en los evaporadores de las cámaras y de los muebles frigoríficos negativos se realiza mediante la aportación 
              de calor por resistencias (desescarche eléctrico), mientras que en los evaporadores de los obradores y de los muebles 
              frigoríficos positivos se realiza por aire, mediante el corte de la alimentación de refrigerante a éstos mientras 
              los ventiladores están en funcionamiento.
            </p>
            
            <p className="mb-4">
              La separación de aleta para los evaporadores de cámaras de temperatura positiva es como mínimo de 6 mm. 
              En los evaporadores de cámara de congelados es como mínimo de 7 mm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaEvaporadores;
