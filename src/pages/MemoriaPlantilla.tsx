
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MemoriaPlantilla = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular un tiempo de carga para el PDF
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6 md:px-10 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Plantilla de Memoria Técnica</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="h-12 w-12 border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Cargando plantilla...</p>
          </div>
        ) : (
          <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium">memoria.pdf</h2>
              <a 
                href="memoria.pdf" 
                download 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Descargar PDF
              </a>
            </div>
            <div className="w-full h-[75vh]">
              <iframe 
                src="memoria.pdf" 
                className="w-full h-full" 
                title="Memoria técnica plantilla"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MemoriaPlantilla;
