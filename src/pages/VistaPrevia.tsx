import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MemoriaTecnicaForm from "@/components/MemoriaTecnicaForm";
import MemoriaPreview from "@/components/memoriaPreview/MemoriaPreview";
import { toast } from "@/hooks/use-toast";
import { validateMargin } from "@/lib/utils";
import ExcelUploader from "@/components/ExcelUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VistaPrevia = () => {
  const navigate = useNavigate();
  const [memoriaData, setMemoriaData] = useState({
    // Datos titular
    titular: "DINOSOL SUPERMERCADOS S.L.",
    nif: "B61742565",
    direccion: "CTRA. DEL RINCÓN, S/N, 4ª PLANTA Edif. Anexo C.C. Las Arenas",
    poblacion: "LAS PALMAS DE GRAN CANARIA",
    provincia: "LAS PALMAS",
    cp: "35010",
    telefono: "928303600",
    email: "info.supermercado@dinosol.es",
    
    // Datos notificaciones
    direccionNotif: "C/ Luis Correa Medina, 9",
    poblacionNotif: "LAS PALMAS DE GRAN CANARIA",
    provinciaNotif: "LAS PALMAS",
    cpNotif: "35013",
    telefonoNotif: "928303600",
    
    // Datos instalador
    instalador: "GESTÉCNICA INTEGRAL 10. S.L.",
    cif_instalacion: "B76501931",
    n_registro_instalacion: "38020755",
    direccion_instalador: "C/ ISAAC PERAL, Nº 3, NAVE 5",
    poblacion_instalacion: "EL ROSARIO",
    cp_instalacion: "38109",
    telefono_instalacion: "922618202",
    mail_instalacion: "gestecnicaintegral10@gestecnicaintegral10.es",
    
    // Datos instalación
    direccionInstalacion: "AVDA. BLAS PÉREZ GONZÁLEZ, 4",
    poblacionInstalacion: "PUERTO DE LA CRUZ",
    cpInstalacion: "35610",
    provinciaInstalacion: "SANTA CRUZ DE TENERIFE",
    telefonoInstalacion: "922443768",
    num_inscripcion: "IF202400127",
    fecha_inscripcion: "2024-09-23",
    
    // Encabezados
    titulo: "MEMORIA TÉCNICA DESCRIPTIVA",
    encabezado: "",
    
    // Datos del proyecto
    tipoInstalacion: "Supermercado",
    nombreProyecto: "Costa del Silencio (Arona)",
    
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
    normativaCompleta: null,
    
    // Descripción de la instalación
    descripcionInstalacion: `La instalación está compuesta por varios muebles frigoríficos tipo mural y dos armarios de congelados, así como tres cámaras de conservación, un obrador y dos cámaras de congelados. Los servicios positivos se alimentan desde una central compacta positiva, mientras que los servicios negativos se alimentan desde una central compacta negativa.

Las centrales compactas frigoríficas se encuentran ubicadas dentro de una sala de máquinas no específica. Los compresores utilizados son de tipo scroll de la marca COPELAND. Dichos compresores van provistos de todos los elementos de seguridad necesarios para garantizar el funcionamiento correcto de los mismos y un mantenimiento mínimo. 

Las centrales compactas frigoríficas incorporan el condensador de aire dentro de su propio carrozado. Los ventiladores de los condensadores son radiales de conmutación electrónica (EC) y medio nivel sonoro.

El refrigerante condensado se almacena en su correspondiente recipiente de líquido individual incorporado dentro de las propias máquinas descritas.  
Se ha instalado un evaporador en cada cámara, correctamente dimensionado a sus necesidades. El desescarche de los evaporadores se realiza por resistencias eléctricas.
El gas utilizado en la instalación es R-448A. La carga de refrigerante para la central compacta positiva es de 50 kg, mientras que la carga de refrigerante para la central compacta negativa es de 35 kg. Por lo que la instalación cuenta con una carga total de 85 kg de refrigerante R-448A repartida en dos sistemas diferentes.`
  });
  
  const [excelData, setExcelData] = useState(null);
  const [activeTab, setActiveTab] = useState("form");
  const formContainerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Modificamos la sincronización de scroll para que sea más suave
  useEffect(() => {
    const formContainer = formContainerRef.current;
    const previewContainer = previewContainerRef.current;

    if (!formContainer || !previewContainer) return;

    let isScrolling = false;

    const handleScroll = () => {
      if (isScrolling) return;
      
      isScrolling = true;
      
      if (formContainer && previewContainer) {
        const formScrollPercentage = 
          formContainer.scrollTop / (formContainer.scrollHeight - formContainer.clientHeight);

        // Apply the same scroll percentage to the preview
        const previewScrollMax = previewContainer.scrollHeight - previewContainer.clientHeight;
        previewContainer.scrollTop = formScrollPercentage * previewScrollMax;
      }
      
      // Permitir nuevos eventos de scroll después de un pequeño retraso
      setTimeout(() => {
        isScrolling = false;
      }, 50);
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

  const handleExcelUpload = (data: any) => {
    console.log("Excel data loaded:", data);
    setExcelData(data);
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
        </div>
      </header>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <div className="border-b bg-white">
          <div className="max-w-7xl mx-auto">
            <TabsList className="h-12">
              <TabsTrigger value="form" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Formulario
              </TabsTrigger>
              <TabsTrigger value="excel" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Cálculos Excel
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="form" className="flex-1 flex flex-col lg:flex-row">
          {/* Panel de formulario (lado izquierdo) */}
          <div 
            className="w-full lg:w-1/2 p-4 overflow-auto border-r" 
            style={{ height: 'calc(100vh - 126px)' }}
            ref={formContainerRef}
          >
            <div className="max-w-2xl mx-auto">
              <MemoriaTecnicaForm 
                onSubmit={() => {}} 
                onChange={handleFormChange}
              />
            </div>
          </div>
          
          {/* Panel de vista previa (lado derecho) */}
          <div 
            className="w-full lg:w-1/2 p-4 bg-gray-50 overflow-auto"
            style={{ 
              height: 'calc(100vh - 126px)',
            }}
            ref={previewContainerRef}
          >
            <div 
              ref={previewRef} 
              className="pdf-preview-container"
              style={{
                "--hide-page-breaks": "none",
                "--hide-footers": "none"
              } as React.CSSProperties}
            >
              <MemoriaPreview 
                data={memoriaData} 
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="excel" className="flex-1 flex flex-col lg:flex-row">
          <div className="w-full p-4 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <ExcelUploader onDataLoaded={handleExcelUpload} />
              
              {excelData && (
                <div className="mt-6">
                  <h2 className="text-xl font-bold mb-4">Datos de la hoja "RESUM LEGA"</h2>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                    {JSON.stringify(excelData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VistaPrevia;
