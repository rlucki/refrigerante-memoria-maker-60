import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { extractTableData } from "./utils/excelUtils";

interface MemoriaEvaporadoresProps {
  excelData?: any;
}

const MemoriaEvaporadores: React.FC<MemoriaEvaporadoresProps> = ({ excelData }) => {
  // Extract data from Excel if available using useMemo to prevent unnecessary recalculations
  const evaporadoresData = React.useMemo(() => {
    // Use the extractTableData function for consistency with other components
    const data = extractTableData(excelData, {
      sheet: "RESUM LEGA",
      startCol: "AJ",
      endCol: "AQ",
      startRow: 1,
      endRow: 15,
      mappings: {
        modelo: "AJ",
        potencia: "AK",
        cantidad: "AL",
        temperatura: "AM",
        desescarche: "AN",
        ventiladores: "AO",
        caudal: "AP",
        ubicacion: "AQ",
      }
    });
    
    return data;
  }, [excelData]);

  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Only keep the EVAPORADORES section (14.12) */}
        <h3 className="text-lg font-bold">14.12. EVAPORADORES</h3>
        
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
