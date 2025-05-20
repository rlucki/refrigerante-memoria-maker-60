import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { extractTableData } from "../utils/excelUtils";

interface CentralNegativaSectionProps {
  excelData?: any;
}

const CentralNegativaSection: React.FC<CentralNegativaSectionProps> = ({
  excelData,
}) => {
  // Rango correcto para Central Negativa (14.3)
  const centralNegativaData = extractTableData(excelData, {
    sheet: "RESUM LEGA",
    startCol: "AD",
    endCol: "AH",
    startRow: 2,  // saltamos cabecera
    endRow: 19,
    mappings: {
      caracteristica: "AD",
      c1: "AE",
      c2: "AF",
      c3: "AG",
      total: "AH",
    },
  });

  // Helper: si es 0 o "0", lo dejamos en blanco
  const showOrBlank = (v: any) =>
    v === 0 || v === "0" || v === "0.0" ? "" : v;

  return (
    <div className="mt-8">
      <h4 className="text-md font-bold">14.3. CENTRAL NEGATIVA</h4>
      <p className="mt-2">
        Central frigorífica formada por compresores semiherméticos alternativos…
      </p>

      {centralNegativaData.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <Table className="w-full border-collapse text-sm" style={{ tableLayout: "fixed" }}>
            <TableHeader>
              <TableRow className="bg-blue-100">
                <TableHead className="border p-2 min-w-[150px]" />
                {["Cº 1", "Cº 2", "Cº 3", "TOTAL"].map((h) => (
                  <TableHead key={h} className="border p-2 text-center">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {centralNegativaData.map((row, i) => (
                <TableRow key={i} className={i % 2 ? "bg-gray-50" : ""}>
                  <TableCell className="border p-2">{row.caracteristica}</TableCell>
                  {["c1", "c2", "c3", "total"].map((k) => (
                    <TableCell key={k} className="border p-2 text-center">
                      {showOrBlank(row[k])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="mt-4 italic">No se encontraron datos de la central negativa en el Excel.</p>
      )}
    </div>
  );
};

export default CentralNegativaSection;
