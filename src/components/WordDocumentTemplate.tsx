
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, FileText, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface WordDocumentTemplateProps {
  onTemplateUploaded: (file: File) => void;
  onDownloadDocument: () => void;
  hasTemplate: boolean;
}

const WordDocumentTemplate = ({ 
  onTemplateUploaded, 
  onDownloadDocument, 
  hasTemplate 
}: WordDocumentTemplateProps) => {
  const [fileName, setFileName] = useState<string>("");
  
  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    // Check if the file is a Word document
    if (!file.name.endsWith('.docx')) {
      toast({
        title: "Formato no válido",
        description: "Por favor, sube un documento Word (.docx)",
        variant: "destructive"
      });
      return;
    }
    
    setFileName(file.name);
    onTemplateUploaded(file);
    toast({
      title: "Plantilla cargada",
      description: "La plantilla Word se ha cargado correctamente"
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-md shadow-sm border">
        <h3 className="text-lg font-bold mb-4">Plantilla Word</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Sube una plantilla de Word que contenga el formato deseado (pie de página, numeración, etc.).
          El contenido de la memoria técnica se insertará en este documento manteniendo el formato.
        </p>
        
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="wordTemplate">Documento plantilla (.docx)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="wordTemplate"
                type="file"
                accept=".docx"
                className="hidden"
                onChange={handleTemplateUpload}
              />
              <Button
                onClick={() => document.getElementById("wordTemplate")?.click()}
                variant="outline"
                className="w-full flex gap-2 items-center justify-center"
              >
                <Upload size={16} /> Subir plantilla Word
              </Button>
            </div>
          </div>
          
          {fileName && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText size={16} />
              <span>{fileName}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-md shadow-sm border mt-6">
        <h3 className="text-lg font-bold mb-4">Generar documento Word</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Genera un documento Word con el contenido de la memoria técnica respetando el formato de la plantilla.
          Los títulos marcados con "&&" se incluirán en el índice del documento.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-4 flex gap-2">
          <AlertTriangle size={16} className="text-amber-500 mt-1 flex-shrink-0" />
          <p className="text-xs text-amber-700">
            El formato del documento generado puede variar respecto al HTML. La conversión de tablas y elementos complejos es limitada.
          </p>
        </div>
        
        <Button 
          onClick={onDownloadDocument} 
          disabled={!hasTemplate}
          className="w-full flex gap-2 items-center justify-center"
        >
          <Download size={16} /> Descargar documento Word
        </Button>
        
        {!hasTemplate && (
          <p className="text-xs text-muted-foreground mt-2">
            Debes cargar una plantilla Word antes de generar el documento
          </p>
        )}
      </div>
    </div>
  );
};

export default WordDocumentTemplate;
