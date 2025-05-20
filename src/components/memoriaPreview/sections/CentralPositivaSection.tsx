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

interface Props {
  excelData?: any;
}

const CentralPositivaSection: React.FC<Props> = ({ excelData }) => {
  const data = extractTableData(excelData, {
    sheet: "RESUM LEGA",
    startCol: "J",
    endCol: "O",
    startRow: 2,
    endRow: 25,
    mappings: {
      caracteristica: "J",
      c1: "K",
      c2: "L",
      c3: "M",
      c4: "N",
      total: "O",
    },
  });

  return (
    <div className="mt-8">
      <h4 className="text-md font-bold">14.1. CENTRAL POSITIVA</h4>
      <p className="mt-2">
        Se trata de una central frigorífica formada por compresores
        semiherméticos alternativos accionados mediante un motor eléctrico
        trifásico. Sus características técnicas son las siguientes:
      </p>

      {data.length ? (
        <div className="mt-4 overflow-x-auto">
          <Table
            className="w-full border-collapse text-sm"
            style={{ tableLayout: "fixed" }}
          >
            <TableHeader>
              <TableRow className="bg-blue-100">
                <TableHead className="border p-2 min-w-[150px]" />
                {["Cº 1", "Cº 2", "Cº 3", "Cº 4", "TOTAL"].map((h) => (
                  <TableHead key={h} className="border p-2 text-center">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((row, i) => (
                <Table
