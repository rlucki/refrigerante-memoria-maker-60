
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadProps {
  accept: string;
  onChange: (file: File) => void;
}

export const FileUpload = ({ accept, onChange }: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
      
      // Si es una imagen, crear una vista previa
      if (file.type.includes('image')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full mb-4">
        <label 
          htmlFor="file-upload" 
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Vista previa" 
              className="h-full object-contain max-h-28 p-2" 
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Haga clic para cargar</span> o arrastre y suelte
              </p>
              <p className="text-xs text-gray-500">{accept.replace(/image\//g, '').toUpperCase()}</p>
            </div>
          )}
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            accept={accept}
            onChange={handleFileChange}
          />
        </label>
      </div>
      
      {fileName && (
        <div className="flex items-center justify-center text-sm text-gray-500">
          <p className="truncate max-w-xs">{fileName}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              setFileName(null);
              setPreviewUrl(null);
            }}
          >
            Eliminar
          </Button>
        </div>
      )}
    </div>
  );
};
