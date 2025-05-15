import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileDown, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MemoriaTecnicaForm from "@/components/MemoriaTecnicaForm";
import MemoriaPreview from "@/components/MemoriaPreview";
import { toast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";
import { validateMargin } from "@/lib/utils";
import ExcelUploader from "@/components/ExcelUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    normativaCompleta: null,
    
    // Descripción de la instalación
    descripcionInstalacion: `La instalación está compuesta por varios muebles frigoríficos tipo mural y dos armarios de congelados, así como tres cámaras de conservación, un obrador y dos cámaras de congelados. Los servicios positivos se alimentan desde una central compacta positiva, mientras que los servicios negativos se alimentan desde una central compacta negativa.

Las centrales compactas frigoríficas se encuentran ubicadas dentro de una sala de máquinas no específica. Los compresores utilizados son de tipo scroll de la marca COPELAND. Dichos compresores van provistos de todos los elementos de seguridad necesarios para garantizar el funcionamiento correcto de los mismos y un mantenimiento mínimo. 

Las centrales compactas frigoríficas incorporan el condensador de aire dentro de su propio carrozado. Los ventiladores de los condensadores son radiales de conmutación electrónica (EC) y medio nivel sonoro.

El refrigerante condensado se almacena en su correspondiente recipiente de líquido individual incorporado dentro de las propias máquinas descritas.  
Se ha instalado un evaporador en cada cámara, correctamente dimensionado a sus necesidades. El desescarche de los evaporadores se realiza por resistencias eléctricas.
El gas utilizado en la instalación es R-448A. La carga de refrigerante para la central compacta positiva es de 50 kg, mientras que la carga de refrigerante para la central compacta negativa es de 35 kg. Por lo que la instalación cuenta con una carga total de 85 kg de refrigerante R-448A repartida en dos sistemas diferentes.`
  });
  
  const [clienteLogo, setClienteLogo] = useState("");
  const [excelData, setExcelData] = useState(null);
  const [activeTab, setActiveTab] = useState("form");
  const formContainerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

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

  const handleExcelUpload = (data: any) => {
    console.log("Excel data loaded:", data);
    setExcelData(data);
  };

  const handleGenerarDocumento = () => {
    if (!previewRef.current) {
      toast({
        title: "Error al generar documento",
        description: "No se pudo generar el documento. Inténtelo nuevamente.",
        variant: "destructive"
      });
      return;
    }

    // Mostrar toast de generando documento
    toast({
      title: "Generando documento",
      description: "Espere mientras se genera el PDF...",
    });

    // Agregar clase especial para el modo de exportación PDF
    document.body.classList.add('pdf-export-mode');
    
    // Crear una copia del contenido para manipularlo sin afectar la visualización
    const content = previewRef.current.cloneNode(true) as HTMLElement;
    
    // Forzar estilos específicos para el PDF que garantizan la exactitud
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @page {
        size: 210mm 297mm;
        margin: 0;
      }
      body {
        margin: 0;
        padding: 0;
      }
      .memoria-preview-container > div {
        width: 210mm !important;
        height: 297mm !important;
        min-height: 297mm !important;
        padding: 20mm !important;
        position: relative !important;
        page-break-after: always !important;
        box-sizing: border-box !important;
        background-color: white !important;
        margin: 0 !important;
        border: none !important;
        overflow: hidden !important;
      }
      .absolute.bottom-10,
      .absolute.bottom-6 {
        position: absolute !important;
        bottom: 20mm !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        padding: 0 20mm !important;
        box-sizing: border-box !important;
        z-index: 100 !important;
      }
      h3, h4 {
        margin-top: 10mm !important;
        margin-bottom: 5mm !important;
        page-break-after: avoid !important;
      }
      .memory-preview-page {
        page-break-inside: avoid !important;
      }
      ul, li {
        page-break-inside: avoid !important;
      }
      p {
        orphans: 3 !important;
        widows: 3 !important;
      }
      img {
        max-width: 100% !important;
      }
    `;
    content.appendChild(styleElement);
    
    // Configurar opciones avanzadas para html2pdf utilizando una configuración que preserve el texto como texto
    const opt = {
      margin: 0,
      filename: `Memoria_Técnica_${memoriaData.titular.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      enableLinks: true,
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 210 * 3, // Mayor factor para mejor precisión
        logging: false,
        removeContainer: true,
        foreignObjectRendering: true, // Intentar renderizar texto como texto
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true,
        precision: 16,
        putOnlyUsedFonts: true,
        floatPrecision: "smart"
      },
      pagebreak: { mode: 'avoid-all', before: '.page-break', after: '.avoid-break-after' }
    };

    // Convertir a PDF con configuración para preservar texto
    html2pdf()
      .from(content)
      .set(opt)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        // Verificar y ajustar todas las páginas para tener tamaño A4 exacto
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.internal.pageSize.width = 210;
          pdf.internal.pageSize.height = 297;
        }
        return pdf;
      })
      .save()
      .then(() => {
        // Remover la clase de exportación PDF
        document.body.classList.remove('pdf-export-mode');
        
        toast({
          title: "Documento generado",
          description: "Se ha generado el documento correctamente",
        });
      })
      .catch((error) => {
        // Remover la clase de exportación PDF en caso de error
        document.body.classList.remove('pdf-export-mode');
        
        console.error("Error al generar PDF:", error);
        toast({
          title: "Error al generar documento",
          description: "Ocurrió un error al generar el PDF. Inténtelo nuevamente.",
          variant: "destructive"
        });
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
                onLogoUpload={handleLogoUpload}
              />
            </div>
          </div>
          
          {/* Panel de vista previa (lado derecho) */}
          <div 
            className="w-full lg:w-1/2 p-4 bg-gray-50 overflow-auto"
            style={{ height: 'calc(100vh - 126px)' }}
            ref={previewContainerRef}
          >
            <div ref={previewRef} className="pdf-preview-container">
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
