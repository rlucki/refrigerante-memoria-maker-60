
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import ExcelDataViewer from "./ExcelDataViewer";

interface ExcelUploaderProps {
  onDataLoaded: (data: any) => void;
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onDataLoaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [excelData, setExcelData] = useState<any>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls') && !selectedFile.name.endsWith('.xlsm')) {
        toast({
          title: "Formato no válido",
          description: "Por favor, seleccione un archivo de Excel (.xlsx, .xls o .xlsm)",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      setExcelData(null); // Reset data when new file selected
    }
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          
          // Check if "RESUM LEGA" sheet exists
          if (!workbook.SheetNames.includes('RESUM LEGA')) {
            toast({
              title: "Hoja no encontrada",
              description: "El archivo Excel debe contener una hoja llamada 'RESUM LEGA'",
              variant: "destructive"
            });
            setIsLoading(false);
            return;
          }
          
          // Get both formats of data for different uses
          
          // 1. Full workbook with all sheet data in original format
          const fullData: Record<string, any> = {};
          workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            fullData[sheetName] = worksheet;
          });
          
          // 2. JSON data from RESUM LEGA for the component
          const resumLegaSheet = workbook.Sheets['RESUM LEGA'];
          const jsonData = XLSX.utils.sheet_to_json(resumLegaSheet);
          
          // Set the data for viewing
          setExcelData(fullData);
          
          // Send the data to parent component for use in the preview
          onDataLoaded({
            ...fullData,
            jsonData // Add the JSON data for easier access
          });
          
          toast({
            title: "Datos cargados",
            description: `Archivo Excel cargado correctamente con ${Object.keys(fullData).length} hojas`,
          });
        } catch (error) {
          console.error("Error processing Excel file:", error);
          toast({
            title: "Error al procesar archivo",
            description: "No se pudo procesar el archivo de Excel",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error("Error reading Excel file:", error);
      toast({
        title: "Error al leer archivo",
        description: "No se pudo leer el archivo de Excel",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Cargar datos de Excel</h2>
        <p className="text-sm text-gray-500 mb-6">
          Sube un archivo Excel que contenga una hoja llamada "RESUM LEGA" para importar los datos
        </p>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="excelFile"
              onChange={handleFileChange}
              className="hidden"
              accept=".xlsx,.xls,.xlsm"
            />
            <label
              htmlFor="excelFile"
              className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
            >
              <FileUp className="mr-2 h-4 w-4" />
              Seleccionar archivo
            </label>
            {file && (
              <span className="text-sm text-gray-500">
                {file.name}
              </span>
            )}
          </div>
          
          <Button 
            onClick={handleUpload} 
            disabled={!file || isLoading}
            className="w-fit"
          >
            {isLoading ? "Procesando..." : "Cargar datos"}
          </Button>
        </div>
      </Card>
      
      {/* Show Excel data viewer if data is available */}
      {excelData && (
        <ExcelDataViewer 
          data={excelData} 
          title="Vista previa de datos Excel" 
        />
      )}
    </div>
  );
};

export default ExcelUploader;
