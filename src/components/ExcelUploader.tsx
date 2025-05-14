
import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ExcelUploaderProps {
  onDataLoaded: (data: any) => void;
  className?: string;
}

const ExcelUploader = ({ onDataLoaded, className }: ExcelUploaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setFileName(file.name);
    setIsLoading(true);

    try {
      // Check file extension
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'xlsx' && fileExtension !== 'xls' && fileExtension !== 'xlsm') {
        toast({
          title: "Formato de archivo no soportado",
          description: "Por favor sube un archivo Excel (.xlsx, .xls o .xlsm)",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      
      // Check if the worksheet exists
      if (!workbook.SheetNames.includes('RESUM LEGA')) {
        toast({
          title: "Hoja no encontrada",
          description: "El archivo no contiene la hoja 'RESUM LEGA'",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // Extract data from the 'RESUM LEGA' sheet
      const worksheet = workbook.Sheets['RESUM LEGA'];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Process the data if needed
      onDataLoaded(jsonData);
      
      toast({
        title: "Datos cargados correctamente",
        description: `Se han cargado los datos de la hoja 'RESUM LEGA' del archivo ${file.name}`,
      });
    } catch (error) {
      console.error("Error al procesar el archivo Excel:", error);
      toast({
        title: "Error al procesar el archivo",
        description: "Ocurrió un error al procesar el archivo Excel",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Cargar archivo Excel</h2>
        <p className="text-sm text-gray-500">
          Sube un archivo Excel que contenga la hoja "RESUM LEGA" para cargar los datos de cálculos.
        </p>
      </div>
      
      <div className="border border-dashed border-gray-300 rounded-md p-8 text-center">
        <input
          type="file"
          id="excel-upload"
          className="hidden"
          accept=".xlsx,.xls,.xlsm"
          onChange={handleUpload}
        />
        <label
          htmlFor="excel-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="mb-3">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex text-sm text-gray-600">
            <span className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
              Seleccionar archivo
            </span>
            <p className="pl-1">o arrastrar y soltar</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            XLSX, XLS o XLSM (máx. 10MB)
          </p>
        </label>
      </div>
      
      {fileName && (
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm font-medium">Archivo cargado: {fileName}</p>
          {isLoading ? (
            <p className="text-sm text-gray-500">Procesando archivo...</p>
          ) : (
            <div className="flex justify-end mt-2">
              <Button
                size="sm"
                onClick={() => {
                  setFileName(null);
                  document.getElementById("excel-upload") && (document.getElementById("excel-upload") as HTMLInputElement).value = "";
                }}
              >
                Eliminar
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;
