
import { useState } from "react";
import MemoriaTecnicaForm from "@/components/MemoriaTecnicaForm";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Index = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
    toast({
      title: "Memoria técnica generada",
      description: "Se ha generado correctamente la memoria técnica.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6 md:px-10 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/767f70e2-8522-4f58-aa42-2dd4244eed17.png" 
              alt="COLDsulting Logo" 
              className="h-12" 
            />
            <h1 className="text-2xl font-bold text-gray-800">L3G4L1Z4T0R</h1>
          </div>
          <Link to="/plantilla">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText size={18} />
              <span>Ver Plantilla</span>
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Formulario de Datos para Memoria Técnica</h2>
            <p className="mt-1 text-sm text-gray-500">
              Complete los siguientes campos para generar automáticamente la memoria técnica descriptiva de instalación frigorífica.
            </p>
          </div>
          <div className="p-6">
            <MemoriaTecnicaForm onSubmit={handleFormSubmit} />
          </div>
        </div>
        
        {isFormSubmitted && (
          <div className="bg-white shadow rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Memoria Técnica Generada</h2>
              <p className="mt-1 text-sm text-gray-500">
                La memoria técnica ha sido generada con éxito. Puede descargarla o visualizarla.
              </p>
            </div>
            <div className="p-6 flex gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Descargar Memoria
              </Button>
              <Button variant="outline">
                Vista Previa
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
