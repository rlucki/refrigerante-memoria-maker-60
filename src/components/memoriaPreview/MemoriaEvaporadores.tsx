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
          El desescarche en los evaporadores de las cámaras y de los muebles…
        </p>
        <p>
          La separación de aleta para los evaporadores de cámaras de temperatura
          positiva es como mínimo de 6&nbsp;mm…
        </p>
      </div>
    </div>
  );
};

export default MemoriaEvaporadores;
