
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

const MemoriaEvaporadores: React.FC<MemoriaEvaporadoresProps> = ({
  excelData,
}) => {
  /* ─── extraer filas AJ2:AQ15 ─── */
  const datos = React.useMemo(() => {
    if (!excelData?.["RESUM LEGA"]) return [];

    const sh = excelData["RESUM LEGA"];
    const out: any[] = [];

    for (let i = 2; i <= 15; i++) {
      const row = {
        unidades:     sh[`AJ${i}`]?.v ?? "",
        denominacion: sh[`AK${i}`]?.v ?? "",
        modelo:       sh[`AL${i}`]?.v ?? "",
        volInt:       sh[`AM${i}`]?.v ?? "",
        superficie:   sh[`AN${i}`]?.v ?? "",
        caudal:       sh[`AO${i}`]?.v ?? "",
        potencia:     sh[`AP${i}`]?.v ?? "",
        sepAleta:     sh[`AQ${i}`]?.v ?? "",
      };
      if (row.denominacion || row.modelo) out.push(row);
    }
    return out;
  }, [excelData]);

  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <h3 className="text-lg font-bold" data-heading="&&14.12. EVAPORADORES">
        14.12. EVAPORADORES
      </h3>

      <p className="text-sm text-justify mb-4">
        En cada cámara se instala un evaporador convenientemente dimensionado…
      </p>

      {datos.length ? (
        <div className="overflow-x-auto">
          <Table className="w-full border-collapse text-xs">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="border p-2">Unidades</TableHead>
                <TableHead className="border p-2">Denominación</TableHead>
                <TableHead className="border p-2">Modelo</TableHead>
                <TableHead className="border p-2">Vol. int.</TableHead>
                <TableHead className="border p-2">Superficie</TableHead>
                <TableHead className="border p-2">Caudal&nbsp;(m³/h)</TableHead>
                <TableHead className="border p-2">Potencia&nbsp;(W)</TableHead>
                <TableHead className="border p-2">Sep. aleta&nbsp;(mm)</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {datos.map((r, i) => (
                <TableRow key={i} className={i % 2 ? "bg-gray-50" : ""}>
                  <TableCell className="border p-2 text-center">
                    {r.unidades}
                  </TableCell>
                  <TableCell className="border p-2">{r.denominacion}</TableCell>
                  <TableCell className="border p-2">{r.modelo}</TableCell>
                  <TableCell className="border p-2 text-center">
                    {r.volInt && `${r.volInt} dm³`}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {r.superficie && `${r.superficie} m²`}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {r.caudal && `${r.caudal} m³/h`}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {r.potencia && `${r.potencia} W`}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {r.sepAleta && `${r.sepAleta} mm`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="italic text-gray-500">
          No se encontraron datos de evaporadores en el Excel.
        </p>
      )}

      {/* párrafos finales sin cambios */}
      <div className="text-sm mt-6 space-y-4 text-justify">
        <p>
          El desescarche en los evaporadores de las cámaras y de los muebles frigoríficos negativos se realiza mediante la aportación de calor por resistencias (desescarche eléctrico), mientras que en los evaporadores de los obradores y de los muebles frigoríficos positivos se realiza por aire, mediante el corte de la alimentación de refrigerante a éstos mientras los ventiladores están en funcionamiento.
        </p>
        <p>
          La separación de aleta para los evaporadores de cámaras de temperatura positiva es como mínimo de 6 mm. En los evaporadores de cámara de congelados es como mínimo de 7 mm.&nbsp;
        </p>
      </div>
      
      {/* Sección 14.12.1 - Valvulería y elementos muebles y evaporadores */}
      <div className="text-sm mt-10 space-y-4 text-justify">
        <h4 className="text-md font-semibold" data-heading="&&14.12.1. VALVULERÍA Y ELEMENTOS MUEBLES Y EVAPORADORES">
          14.12.1. VALVULERÍA Y ELEMENTOS MUEBLES Y EVAPORADORES
        </h4>
        <p>
          Para cada evaporador de cámaras y mueble frigorífico se instalan las siguientes válvulas:
        </p>
        
        <div className="ml-4">
          <p className="font-medium">Línea de líquido</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Válvula de paso de bola con descompresor integrado, que incorpora en su mismo cuerpo un by-pass para evitar una subida brusca de presión del refrigerante que pudiera quedar atrapado entre ambas válvulas.</li>
            <li>Válvula de bola para despresurización</li>
            <li>Visor de líquido y humedad</li>
            <li>Válvula de expansión electrónica DANFOSS AKV10P, en cada evaporador y módulo de mueble, conectada a su controlador DANFOSS AK-CC55 situado en el subcuadro de cada cámara o en el propio mueble</li>
          </ul>
        </div>
        
        <div className="ml-4">
          <p className="font-medium">Línea de aspiración</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Válvula de bola para despresurización</li>
            <li>Válvula de paso de bola con descompresor integrado, que incorpora en su mismo cuerpo un by-pass para evitar una subida brusca de presión del refrigerante que pudiera quedar atrapado entre ambas válvulas.</li>
            <li>Transductor de presión DANFOSS AKS-2050 con llave de paso</li>
            <li>Sonda de temperatura de contacto DANFOSS AKS-11</li>
            <li>Sondas de temperatura ambiente DANFOSS AKS-12</li>
          </ul>
        </div>
      </div>
      
      {/* Sección 14.12.2 - Valvulería y elementos muebles y evaporadores */}
      <div className="text-sm mt-8 space-y-4 text-justify">
        <h4 className="text-md font-semibold" data-heading="&&14.12.2. VALVLVULERÍA Y ELEMENTOS MUEBLES Y EVAPORADORES">
          14.12.2. VALVLVULERÍA Y ELEMENTOS MUEBLES Y EVAPORADORES
        </h4>
        
        <div className="ml-4">
          <p className="font-medium">Línea de líquido</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Válvula de paso</li>
            <li>Visor de líquido y humedad</li>
            <li>Válvula Solenoide</li>
            <li>Válvula de expansión termostática</li>
          </ul>
        </div>
        
        <div className="ml-4">
          <p className="font-medium">Línea de aspiración</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Válvula de bola</li>
            <li>Sonda de temperatura de contacto DANFOSS AKS-11</li>
            <li>Sondas de temperatura ambiente DANFOSS AKS-12</li>
          </ul>
        </div>
      </div>
      
      {/* Sección 14.12.3 - Conexionado desagües */}
      <div className="text-sm mt-8 space-y-4 text-justify">
        <h4 className="text-md font-semibold" data-heading="&&14.12.3. CONEXIONADO DESAGÜES MÓDULOS MOBILIARIO Y EVAPORADORES">
          14.12.3. CONEXIONADO DESAGÜES MÓDULOS MOBILIARIO Y EVAPORADORES
        </h4>
        <p>
          Los desagües de cada módulo de mobiliario frigorífico y de cada evaporador de cámara se realizan según se indica a continuación:
        </p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>En todo el mobiliario frigorífico el instalador frigorista realiza la conexión de desagüe de cada módulo aportando los accesorios necesarios (excepto el sifón que viene suministrado con cada módulo de fábrica) para la conexión hasta la línea de desagüe general. En el caso de mobiliario de congelado se aísla todo el tramo de tubería hasta el sifón, incluyendo el aislamiento del propio sifón.</li>
          <li>En evaporadores de cámaras el instalador frigorista realiza la conexión de cada desagüe de evaporador aportando los accesorios necesarios en PVC blanco de 40mm, hasta la línea de desagüe general. En el caso de evaporadores de cámaras de congelado se aísla todo el tramo de tubería incluyendo el sifón hasta la salida de la misma fuera de la cámara.</li>
        </ul>
      </div>
    </div>
  );
};

export default MemoriaEvaporadores;
