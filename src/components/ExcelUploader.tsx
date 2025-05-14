
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

interface ExcelUploaderProps {
  onDataLoaded: (data: any) => void;
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onDataLoaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls')) {
        toast({
          title: "Formato no válido",
          description: "Por favor, seleccione un archivo de Excel (.xlsx o .xls)",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
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
          
          // Get data from "RESUM LEGA" sheet
          const worksheet = workbook.Sheets['RESUM LEGA'];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          onDataLoaded(jsonData);
          
          toast({
            title: "Datos cargados",
            description: `Se cargaron ${jsonData.length} registros de la hoja "RESUM LEGA"`,
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
            accept=".xlsx,.xls"
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
  );
};

export default ExcelUploader;
