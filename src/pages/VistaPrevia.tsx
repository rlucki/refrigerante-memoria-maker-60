
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileDown, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MemoriaTecnicaForm from "@/components/MemoriaTecnicaForm";
import MemoriaPreview from "@/components/MemoriaPreview";
import { toast } from "@/hooks/use-toast";

const VistaPrevia = () => {
  const navigate = useNavigate();
  const [memoriaData, setMemoriaData] = useState({
    titular: "DINOSOL SUPERMERCADOS S.L.",
    nif: "B61742565",
    direccion: "CTRA. DEL RINCÓN, S/N, 4ª PLANTA Edif. Anexo C.C. Las Arenas",
    poblacion: "LAS PALMAS DE GRAN CANARIA",
    provincia: "LAS PALMAS",
    cp: "35010",
    instalador: "GESTÉCNICA INTEGRAL 10. S.L.",
    direccionInstalacion: "AVDA. BLAS PÉREZ GONZÁLEZ, 4",
    poblacionInstalacion: "PUERTO DE LA CRUZ",
    cpInstalacion: "35610",
    provinciaInstalacion: "SANTA CRUZ DE TENERIFE",
    titulo: "MEMORIA TÉCNICA DESCRIPTIVA",
    
    // Datos de clasificación
    metodoEnfriamiento: "Sistema indirecto",
    seguridadSistema: "Tipo 1",
    categoriaLocal: "Categoría A",
    refrigerante: "R-434A",
    composicionRefrigerante: "(63,2% R-125 / 18% R-143a / 16% R-134a / 2,8% R-600a)",
    inflamabilidad: "Grupo 1",
    toxicidad: "Grupo A",
    grupoSeguridad: "A1",
    directivaEquipos: "2",
    pca: "3245",
    agotamientoOzono: "0",
    limitePractico: "0.32 kg/m3",
    atelOdl: "0.32 kg/m3",
    limiteInflamabilidad: "NF",
    temperaturaAutoignicion: "ND",
    gasFluorado: "SI",
    nivelInstalacion: "Nivel 1",
    documentoNecesario: "Memoria",
    
    // Datos de normativa
    normativaCompleta: null
  });
  
  const [clienteLogo, setClienteLogo] = useState("");
  const formContainerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Sync scroll between form and preview
  useEffect(() => {
    const formContainer = formContainerRef.current;
    const previewContainer = previewContainerRef.current;

    if (!formContainer || !previewContainer) return;

    const handleScroll = () => {
      if (formContainer && previewContainer) {
        const formScrollPercentage = 
          formContainer.scrollTop / (formContainer.scrollHeight - formContainer.clientHeight);

        // Apply the same scroll percentage to the preview
        const previewScrollMax = previewContainer.scrollHeight - previewContainer.clientHeight;
        previewContainer.scrollTop = formScrollPercentage * previewScrollMax;
      }
    };

    formContainer.addEventListener("scroll", handleScroll);
    return () => {
      formContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFormChange = (field: string, value: any) => {
    console.log(`Field changed: ${field}`, value);
    setMemoriaData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleLogoUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setClienteLogo(url);
    setMemoriaData(prev => ({ ...prev, clienteLogo: url }));
  };

  const handleGenerarDocumento = () => {
    // Aquí iría la lógica para generar el documento final
    toast({
      title: "Documento generado",
      description: "Se ha generado el documento correctamente",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6 md:px-10 border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
            >
              <ChevronLeft />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Vista Previa de Memoria Técnica</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2" onClick={handleGenerarDocumento}>
              <FileDown size={18} />
              <span>Descargar</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Printer size={18} />
              <span>Imprimir</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Panel de formulario (lado izquierdo) */}
        <div 
          className="w-full lg:w-1/2 p-4 overflow-auto border-r" 
          style={{ height: 'calc(100vh - 72px)' }}
          ref={formContainerRef}
        >
          <div className="max-w-2xl mx-auto">
            <MemoriaTecnicaForm 
              onSubmit={() => {}} 
              onChange={handleFormChange}
              onLogoUpload={handleLogoUpload}
            />
          </div>
        </div>
        
        {/* Panel de vista previa (lado derecho) */}
        <div 
          className="w-full lg:w-1/2 p-4 bg-gray-50 overflow-auto"
          style={{ height: 'calc(100vh - 72px)' }}
          ref={previewContainerRef}
        >
          <MemoriaPreview 
            data={{
              ...memoriaData,
              clienteLogo
            }} 
          />
        </div>
      </main>
    </div>
  );
};

export default VistaPrevia;
