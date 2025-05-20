
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
  /* ─── extraer datos ─── */
  const evaporadoresData = React.useMemo(() => {
    if (!excelData?.["RESUM LEGA"]) return [];

    const sh = excelData["RESUM LEGA"];
    const rows: any[] = [];

    /*  ⚠️  Empieza en la fila 2 (salta la cabecera UNIDADES…)  */
    for (let i = 2; i <= 15; i++) {
      const row = {
        modelo:       sh[`AJ${i}`]?.v || "",
        potencia:     sh[`AK${i}`]?.v || "",
        cantidad:     sh[`AL${i}`]?.v || "",
        temperatura:  sh[`AM${i}`]?.v || "",
        desescarche:  sh[`AN${i}`]?.v || "",
        ventiladores: sh[`AO${i}`]?.v || "",
        caudal:       sh[`AP${i}`]?.v || "",
        ubicacion:    sh[`AQ${i}`]?.v || "",
      };

      /* añade solo si hay datos reales */
      if (row.modelo || row.potencia) rows.push(row);
    }

    return rows;
  }, [excelData]);

  /* ─── render ─── */
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        <h3 className="text-lg font-bold" data-heading="&&14.12. EVAPORADORES">
          14.12. EVAPORADORES
        </h3>

        <div className="mt-4 text-sm text-justify">
          <p className="mb-4">
            En cada cámara se instala un evaporador convenientemente
            dimensionado…
          </p>

          {evaporadoresData.length ? (
            <div className="overflow-x-auto mt-4">
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="border p-2 text-xs">Modelo</TableHead>
                    <TableHead className="border p-2 text-xs">
                      Potencia&nbsp;(W)
                    </TableHead>
                    <TableHead className="border p-2 text-xs">Cantidad</TableHead>
                    <TableHead className="border p-2 text-xs">
                      Temperatura&nbsp;(°C)
                    </TableHead>
                    <TableHead className="border p-2 text-xs">
                      Desescarche
                    </TableHead>
                    <TableHead className="border p-2 text-xs">
                      Ventiladores
                    </TableHead>
                    <TableHead className="border p-2 text-xs">
                      Caudal&nbsp;(m³/h)
                    </TableHead>
                    <TableHead className="border p-2 text-xs">Ubicación</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {evaporadoresData.map((r, idx) => (
                    <TableRow
                      key={idx}
                      className={idx % 2 ? "bg-gray-50" : "bg-white"}
                    >
                      <TableCell className="border p-2 text-xs">
                        {r.modelo}
                      </TableCell>
                      <TableCell className="border p-2 text-xs">
                        {r.potencia}
                      </TableCell>
                      <TableCell className="border p-2 text-xs">
                        {r.cantidad}
                      </TableCell>
                      <TableCell className="border p-2 text-xs">
                        {r.temperatura}
                      </TableCell>
                      <TableCell className="border p-2 text-xs">
                        {r.desescarche}
                      </TableCell>
                      <TableCell className="border p-2 text-xs">
                        {r.ventiladores}
                      </TableCell>
                      <TableCell className="border p-2 text-xs">
                        {r.caudal}
                      </TableCell>
                      <TableCell className="border p-2 text-xs">
                        {r.ubicacion}
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

          {/* texto final sin cambios */}
          <div className="mt-6 space-y-4">
            <p>
              El desescarche en los evaporadores de las cámaras y de los muebles
              frigoríficos negativos se realiza…
            </p>
            <p>
              La separación de aleta para los evaporadores de cámaras de
              temperatura positiva es como mínimo de 6&nbsp;mm…
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaEvaporadores;
