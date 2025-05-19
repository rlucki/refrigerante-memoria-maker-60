
import React from "react";

interface MemoriaEvaporadoresProps {
  excelData?: any;
}

const MemoriaEvaporadores: React.FC<MemoriaEvaporadoresProps> = ({ excelData }) => {
  // Extract data from Excel if available
  const evaporadoresData = React.useMemo(() => {
    if (!excelData || !excelData.jsonData) return [];
    
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
    if (!excelData || !excelData.jsonData) return [];
    
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
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Modelo</th>
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Potencia (W)</th>
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Cantidad</th>
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Temperatura (°C)</th>
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Desescarche</th>
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Ventiladores</th>
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Caudal (m³/h)</th>
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Ubicación</th>
                  </tr>
                </thead>
                <tbody>
                  {evaporadoresData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.modelo}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.potencia}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.cantidad}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.temperatura}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.desescarche}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.ventiladores}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.caudal}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.ubicacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="italic text-gray-500">No se encontraron datos de evaporadores en el Excel.</p>
          )}
          
          <h4 className="text-base font-bold mt-8 mb-3">14.3. CENTRAL NEGATIVA</h4>
          
          {centralNegativaData.length > 0 ? (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Característica</th>
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Valor</th>
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Unidad</th>
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Observaciones</th>
                    <th className="border border-gray-300 px-3 py-2 text-xs text-left">Referencia</th>
                  </tr>
                </thead>
                <tbody>
                  {centralNegativaData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.caracteristica}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.valor}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.unidad}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.observaciones}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{row.referencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="italic text-gray-500">No se encontraron datos de central negativa en el Excel.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoriaEvaporadores;
