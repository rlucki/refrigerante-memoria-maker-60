/* src/components/memoriaPreview/MemoriaEvaporadores.tsx */

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

/* helper para adjuntar la unidad */
const withUnit = (v: string | number, unit: string) =>
  v !== "" && v !== undefined && v !== null ? `${v} ${unit}` : "";

const MemoriaEvaporadores: React.FC<MemoriaEvaporadoresProps> = ({
  excelData,
}) => {
  /* ─── Extraer datos ─── */
  const data = React.useMemo(() => {
    if (!excelData?.["RESUM LEGA"]) return [];
    const sh = excelData["RESUM LEGA"];
    const out: any[] = [];

    /* filas 2-15 (fila 1 = cabecera) */
    for (let r = 2; r <= 15; r++) {
      const row = {
        cantidad:      sh[`AJ${r}`]?.v ?? "",   // “1”
        denominacion:  sh[`AK${r}`]?.v ?? "",
        modelo:        sh[`AL${r}`]?.v ?? "",
        volInt:        sh[`AM${r}`]?.v ?? "",
        superficie:    sh[`AN${r}`]?.v ?? "",
        caudal:        sh[`AO${r}`]?.v ?? "",
        potencia:      sh[`AP${r}`]?.v ?? "",
        sepAleta:      sh[`AQ${r}`]?.v ?? "",
      };
      if (row.denominacion || row.modelo) out.push(row);
    }
    return out;
  }, [excelData]);

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

      {data.length ? (
        <div className="overflow-x-auto">
          <Table className="w-full border-collapse text-xs">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="border p-2">Cant.</TableHead>
                <TableHead className="border p-2">Denominación</TableHead>
                <TableHead className="border p-2">Modelo</TableHead>
                <TableHead className="border p-2">Vol.&nbsp;int.</TableHead>
                <TableHead className="border p-2">Superficie</TableHead>
                <TableHead className="border p-2">Caudal&nbsp;(m³/h)</TableHead>
                <TableHead className="border p-2">Potencia</TableHead>
                <TableHead className="border p-2">Sep.&nbsp;aleta</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((r, i) => (
                <TableRow key={i} className={i % 2 ? "bg-gray-50" : ""}>
                  <TableCell className="border p-2 text-center">
                    {r.cantidad}
                  </TableCell>
                  <TableCell className="border p-2">{r.denominacion}</TableCell>
                  <TableCell className="border p-2">{r.modelo}</TableCell>
                  <TableCell className="border p-2 text-center">
                    {withUnit(r.volInt, "dm³")}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {withUnit(r.superficie, "m²")}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {withUnit(r.caudal, "m³/h")}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {withUnit(r.potencia, "W")}
                  </TableCell>
                  <TableCell className="border p-2 text-center">
                    {withUnit(r.sepAleta, "mm")}
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
          El desescarche en los evaporadores de las cámaras y de los muebles
          frigoríficos negativos se realiza mediante la aportación de calor por
          resistencias …
        </p>
        <p>
          La separación de aleta para los evaporadores de cámaras de temperatura
          positiva es como mínimo de 6&nbsp;mm. …
        </p>
      </div>
    </div>
  );
};

export default MemoriaEvaporadores;
