/*  src/components/memoriaPreview/MemoriaEvaporadores.tsx
    Tabla 14.12  – EVAPORADORES
    Lee las columnas AJ–AQ (filas 2-15) de la hoja “RESUM LEGA”
    y muestra la tabla con las cabeceras correctas.
*/

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
  /* ─────────── Extraer datos de Excel ─────────── */
  const evaporadoresData = React.useMemo(() => {
    if (!excelData?.["RESUM LEGA"]) return [];

    const sheet = excelData["RESUM LEGA"];
    const rows: any[] = [];

    // Filas 2-15 (fila 1 contiene cabeceras “UNIDADES…SEP.ALETA”)
    for (let i = 2; i <= 15; i++) {
      const row = {
        unidades:     sheet[`AJ${i}`]?.v ?? "",
        denominacion: sheet[`AK${i}`]?.v ?? "",
        modelo:       sheet[`AL${i}`]?.v ?? "",
        volInt:       sheet[`AM${i}`]?.v ?? "",
        superficie:   sheet[`AN${i}`]?.v ?? "",
        caudal:       sheet[`AO${i}`]?.v ?? "",
        potencia:     sheet[`AP${i}`]?.v ?? "",
        sepAleta:     sheet[`AQ${i}`]?.v ?? "",
      };

      // Añadir fila solo si hay denominación o modelo
      if (row.denominacion || row.modelo) rows.push(row);
    }
    return rows;
  }, [excelData]);

  /* ─────────── Render ─────────── */
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <h3 className="text-lg font-bold mb-4">14.12. EVAPORADORES</h3>

      <p className="text-sm text-justify mb-4">
        En cada cámara se instala un evaporador convenientemente dimensionado y
        dotado de ventiladores axiales y baterías de intercambio con tubos de
        cobre y aletas de aluminio, cuya separación está en función de la
        temperatura interior deseada. Están diseñados para soportar las
        presiones de trabajo alcanzadas por el refrigerante. Los evaporadores
        instalados son los siguientes:
      </p>

      {evaporadoresData.length ? (
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
              {evaporadoresData.map((r, i) => (
                <TableRow key={i} className={i % 2 ? "bg-gray-50" : ""}>
                  <TableCell className="border p-2 text-center">
                    {r.unidades}
                  </TableCell>
                  <TableCell className="border p-2">{r.denominacion}</TableCell>
                  <TableCell className="border p-2">{r.modelo}</TableCell>
                  <TableCell className="border p-2 text-center">
                    {r.volInt}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {r.superficie}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {r.caudal}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {r.potencia}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {r.sepAleta}
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

      {/* texto adicional de la sección (sin cambios) */}
      <div className="text-sm mt-6 space-y-4 text-justify">
        <p>
          El desescarche en los evaporadores de las cámaras y de los muebles
          frigoríficos negativos se realiza mediante la aportación de calor por
          resistencias (desescarche eléctrico), mientras que en los evaporadores
          de los obradores y de los muebles frigoríficos positivos se realiza
          por aire, mediante el corte de la alimentación de refrigerante a éstos
          mientras los ventiladores están en funcionamiento.
        </p>
        <p>
          La separación de aleta para los evaporadores de cámaras de temperatura
          positiva es como mínimo de 6&nbsp;mm. En los evaporadores de cámara de
          congelados es como mínimo de 7&nbsp;mm.
        </p>
      </div>
    </div>
  );
};

export default MemoriaEvaporadores;
