import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, XCircle, FileSpreadsheet, Table as TableIcon } from "lucide-react";

interface ExcelDataViewerProps {
  data?: any;
  title?: string;
  onExcelUpload?: (data: any) => void;
}

const ExcelDataViewer: React.FC<ExcelDataViewerProps> = ({ data, title = "Datos de Excel", onExcelUpload }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<"formatted" | "raw">("formatted");
  
  if (!data || (Array.isArray(data) && !data.length)) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No hay datos disponibles para mostrar.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Determina si los datos son un array o un objeto (formato de hoja de cálculo)
  const isArrayFormat = Array.isArray(data);
  
  // Función para convertir letra de columna a índice numérico
  const columnLetterToIndex = (columnLetter: string): number => {
    let result = 0;
    for (let i = 0; i < columnLetter.length; i++) {
      result = result * 26 + columnLetter.charCodeAt(i) - 64;
    }
    return result;
  };

  // Función para convertir índice numérico a letra de columna
  const indexToColumnLetter = (index: number): string => {
    let columnLetter = '';
    while (index > 0) {
      const remainder = (index - 1) % 26;
      columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
      index = Math.floor((index - 1) / 26);
    }
    return columnLetter || 'A';
  };
  
  // Función para extraer columna y fila de un cellId
  const extractColumnAndRow = (cellId: string): { column: string, row: number } | null => {
    // Detecta columnas como A, B, C... Z, AA, AB, etc.
    const match = cellId.match(/^([A-Z]+)(\d+)$/);
    if (!match) return null;
    
    return {
      column: match[1],
      row: parseInt(match[2], 10)
    };
  };
  
  // Función para comparar columnas como A, B, C... Z, AA, AB, etc.
  const compareColumns = (a: string, b: string): number => {
    // Si son de longitud diferente, las columnas más largas van después (AA > Z)
    if (a.length !== b.length) {
      return a.length - b.length;
    }
    
    // Si son de la misma longitud, comparar lexicográficamente
    return a.localeCompare(b);
  };
  
  // Para datos en formato de array (como en los logs)
  const renderArrayData = () => {
    // Obtener todas las claves únicas de todos los objetos
    const allKeys = data.reduce((keys: Set<string>, item: any) => {
      if (item) {
        Object.keys(item).forEach(key => keys.add(key));
      }
      return keys;
    }, new Set<string>());
    
    const keys = Array.from(allKeys);
    
    // Filtrar datos según el término de búsqueda
    const filteredData = data.filter((item: any) => {
      if (!item) return false;
      
      const stringValues = Object.values(item)
        .map(value => value?.toString?.() || "")
        .join(" ")
        .toLowerCase();
        
      return stringValues.includes(searchTerm.toLowerCase());
    });
    
    return (
      <div>
        <div className="flex gap-2 mb-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en los datos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            {searchTerm && (
              <button 
                className="absolute right-2 top-2.5"
                onClick={() => setSearchTerm("")}
              >
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={displayMode === "formatted" ? "default" : "outline"}
              onClick={() => setDisplayMode("formatted")}
              className="flex gap-2 items-center"
            >
              <TableIcon className="h-4 w-4" />
              Formateado
            </Button>
            <Button
              size="sm"
              variant={displayMode === "raw" ? "default" : "outline"}
              onClick={() => setDisplayMode("raw")}
              className="flex gap-2 items-center"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Datos crudos
            </Button>
          </div>
        </div>

        {displayMode === "formatted" ? (
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  {keys.map((key) => (
                    <TableHead key={key.toString()} className="whitespace-nowrap min-w-32">
                      {String(key)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    {keys.map((key) => (
                      <TableCell key={key.toString()} className="whitespace-nowrap overflow-hidden text-ellipsis max-w-52">
                        {item[key as keyof typeof item] !== undefined ? String(item[key as keyof typeof item]) : ""}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded border overflow-auto">
            <pre className="text-xs">{JSON.stringify(filteredData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };
  
  // Para datos en formato de hoja de cálculo
  const renderSheetData = () => {
    // Obtener nombres de las hojas
    const sheetNames = Object.keys(data);
    
    // Si no hay un área seleccionada, mostrar selector de hojas
    if (!selectedArea) {
      return (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Seleccione una hoja:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sheetNames.map((sheetName) => (
              <Button 
                key={sheetName}
                variant="outline"
                onClick={() => setSelectedArea(sheetName)}
                className="justify-start"
              >
                {sheetName}
              </Button>
            ))}
          </div>
        </div>
      );
    }
    
    // Mostrar datos de la hoja seleccionada
    const sheetData = data[selectedArea];
    
    // Extraer las celdas y organizarlas por fila/columna
    const cells: Record<string, any> = {};
    const rows: Set<number> = new Set();
    const columns: Set<string> = new Set();
    
    Object.entries(sheetData).forEach(([cellId, cellData]: [string, any]) => {
      if (cellId !== '!ref' && cellId !== '!margins' && typeof cellId === 'string') {
        const parsed = extractColumnAndRow(cellId);
        
        if (parsed) {
          columns.add(parsed.column);
          rows.add(parsed.row);
          cells[cellId] = cellData;
        }
      }
    });
    
    // Convertir sets a arrays ordenados
    const sortedRows = Array.from(rows).sort((a, b) => a - b);
    const sortedColumns = Array.from(columns).sort(compareColumns);
    
    // Rango de filas a mostrar
    const maxRowsToShow = 100; // Aumentado para ver más datos
    const startRow = 1;
    const endRow = Math.min(startRow + maxRowsToShow, Math.max(...sortedRows));
    const visibleRows = sortedRows.filter(row => row >= startRow && row <= endRow);
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Hoja: {selectedArea}</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setSelectedArea(null)}
            >
              Volver a la selección de hojas
            </Button>
            <Button
              size="sm"
              variant={displayMode === "formatted" ? "default" : "outline"}
              onClick={() => setDisplayMode("formatted")}
              className="flex gap-2 items-center"
            >
              <TableIcon className="h-4 w-4" />
              Tabla
            </Button>
            <Button
              size="sm"
              variant={displayMode === "raw" ? "default" : "outline"}
              onClick={() => setDisplayMode("raw")}
              className="flex gap-2 items-center"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Datos crudos
            </Button>
          </div>
        </div>
        
        {displayMode === "formatted" ? (
          <div className="overflow-x-auto border rounded">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-white z-10">#</TableHead>
                  {sortedColumns.map((col) => (
                    <TableHead key={col} className="whitespace-nowrap min-w-24">
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row}>
                    <TableCell className="font-medium sticky left-0 bg-white z-10">
                      {row}
                    </TableCell>
                    {sortedColumns.map((col) => {
                      const cellId = `${col}${row}`;
                      const cell = cells[cellId];
                      return (
                        <TableCell 
                          key={cellId} 
                          className="whitespace-nowrap"
                        >
                          {cell?.v !== undefined ? String(cell.v) : ""}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded border overflow-auto">
            <pre className="text-xs">{JSON.stringify(cells, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isArrayFormat ? renderArrayData() : renderSheetData()}
      </CardContent>
    </Card>
  );
};

export default ExcelDataViewer;
