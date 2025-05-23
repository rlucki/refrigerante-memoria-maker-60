import { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { buildWord } from "@/services/wordDocumentService";
import Header from "@/components/vista-previa/Header";
import FormSection from "@/components/vista-previa/FormSection";
import PreviewSection from "@/components/vista-previa/PreviewSection";

const VistaPrevia = () => {
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
    clasificacionSistema: "SI", // Adding this explicitly to have a separate value
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
  const [excelVisibleData, setExcelVisibleData] = useState(null); // For visualization
  const [activeTab, setActiveTab] = useState("form");
  const [activeSubTab, setActiveSubTab] = useState("titular");
  const formContainerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [calculationsData, setCalculationsData] = useState({
    compresorMT: "0",
    compresorBT: "0",
    compresorParalelo: "0",
    ubicacionGascooler: "",
    tieneIHX: "no",
    tieneDesrecalentador: "no"
  });
  const [wordTemplate, setWordTemplate] = useState<File | null>(null);

  // Handle form changes
  const handleFormChange = (field: string, value: any) => {
    console.log(`Field changed: ${field}`, value);
    
    // Special handling for gas fluorado and clasificacionSistema
    if (field === "gasFluorado") {
      // When gasFluorado is changed, update both fields
      setMemoriaData(prev => ({ 
        ...prev, 
        gasFluorado: value,
        clasificacionSistema: value 
      }));
      
      console.log("Updated gasFluorado and clasificacionSistema to:", value);
    }
    else if (field === "clasificacionSistema") {
      // When clasificacionSistema is changed, update both fields
      setMemoriaData(prev => ({ 
        ...prev, 
        clasificacionSistema: value,
        gasFluorado: value
      }));
      
      console.log("Updated clasificacionSistema and gasFluorado to:", value);
    }
    else if (field === "manualGasFluorado") {
      // If user manually changes gasFluorado in the form
      setMemoriaData(prev => ({ 
        ...prev, 
        gasFluorado: value,
        clasificacionSistema: value 
      }));
      
      console.log("Manually updated gasFluorado and clasificacionSistema to:", value);
    }
    else if (field === "refrigerante") {
      // Update the refrigerant field but don't automatically change gasFluorado
      // The gasFluorado will be updated by ClasificacionSection's useEffect
      setMemoriaData(prev => ({ ...prev, [field]: value }));
    }
    else {
      // Default case: just update the field
      setMemoriaData(prev => ({ ...prev, [field]: value }));
    }
    
    // Check if we need to update description based on compresor paralelo and nivelInstalacion
    if (field === "nivelInstalacion" && calculationsData.compresorParalelo === "0" && value === "Nivel 2") {
      const boosterDescription = `Esta instalación se ha diseñado para cubrir las necesidades frigoríficas de diferentes muebles y cámaras de un hipermercado. Para ello se han instalado dos centrales frigoríficas: una de régimen positivo para los servicios que trabajan a temperaturas que oscilan entre los 0/+10 °C, y otra de régimen negativo para los servicios de congelados que trabajan con temperaturas entre -22/-25 °C.

Tanto los servicios positivos como los negativos se alimentan con refrigerante R-744 (CO₂). Para garantizar las condiciones mencionadas se ha instalado un grupo "booster" de compresión, dotado de dos centrales frigoríficas, trabajando una con una temperatura de evaporación de -8 °C (central positiva), y la otra a -33 °C (central negativa).  La central positiva trabaja en modo transcrítico, mientras que la central negativa lo hace en modo subcrítico, descargando sobre la aspiración de la central positiva. Ambas centrales están en la misma bancada "booster".

Los gases de descarga generados por los compresores de la central positiva que salen a +124,8 °C y 93,7 bar, se envían a un separador de aceite, donde este se separa del refrigerante y se redirige a un acumulador desde el que se alimentará el circuito de aceite de todos los compresores de la bancada. El aceite ingresará a cada compresor a través de un nivel electrónico, el cual está dotado de una electroválvula que gestiona su apertura o cierre.  

Los gases de descarga, ya prácticamente sin aceite y a la temperatura y presión indicada anteriormente, son conducidos a un "gas cooler" (enfriador), situado en cubierta y dotado de ventiladores helicoidales, donde ceden parte del calor sensible al aire que circula por su batería y se produce un decremento de la temperatura del fluido frigorífico hasta alcanzar +38 °C. 
RADIAL SALA DE MÁQUINAS / HELICOIDAL CUBIERTA

El refrigerante, a alta presión, se expansiona hasta la presión de intermedia mediante una válvula de expansión electrónica transcrítica y se conduce al recipiente de líquido vertical de las centrales, a una temperatura superior a los +5,3 °C, donde una parte llega en fase líquida y la otra en fase gas (flash gas). Estos gases flash sobrecalentados se reconducen hasta el colector de aspiración de la central positiva, provocándoles una pequeña caída de presión mediante otra válvula de expansión electrónica, denominada válvula de flash gas bypass`;
        
      setMemoriaData(prev => ({ ...prev, descripcionInstalacion: boosterDescription }));
    }
  };

  // Add a debugging effect to monitor memoriaData.gasFluorado
  useEffect(() => {
    console.log("Current gasFluorado value:", memoriaData.gasFluorado);
    console.log("Current clasificacionSistema value:", memoriaData.clasificacionSistema);
  }, [memoriaData.gasFluorado, memoriaData.clasificacionSistema]);

  const handleExcelUpload = (data: any) => {
    console.log("Excel data loaded:", data);
    setExcelData(data);
    
    // Prepare data for visualization
    if (data && data.jsonData) {
      setExcelVisibleData(data.jsonData);
    } else {
      setExcelVisibleData(data);
    }
  };

  const handleCalculationsChange = (field: string, value: string) => {
    console.log(`Calculations field changed: ${field}`, value);
    setCalculationsData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Check if compresorParalelo is 0 and nivelInstalacion is Nivel 2 to update the description
      if (field === "compresorParalelo" && value === "0" && memoriaData.nivelInstalacion === "Nivel 2") {
        const boosterDescription = `Esta instalación se ha diseñado para cubrir las necesidades frigoríficas de diferentes muebles y cámaras de un hipermercado. Para ello se han instalado dos centrales frigoríficas: una de régimen positivo para los servicios que trabajan a temperaturas que oscilan entre los 0/+10 °C, y otra de régimen negativo para los servicios de congelados que trabajan con temperaturas entre -22/-25 °C.

Tanto los servicios positivos como los negativos se alimentan con refrigerante R-744 (CO₂). Para garantizar las condiciones mencionadas se ha instalado un grupo "booster" de compresión, dotado de dos centrales frigoríficas, trabajando una con una temperatura de evaporación de -8 °C (central positiva), y la otra a -33 °C (central negativa).  La central positiva trabaja en modo transcrítico, mientras que la central negativa lo hace en modo subcrítico, descargando sobre la aspiración de la central positiva. Ambas centrales están en la misma bancada "booster".

Los gases de descarga generados por los compresores de la central positiva que salen a +124,8 °C y 93,7 bar, se envían a un separador de aceite, donde este se separa del refrigerante y se redirige a un acumulador desde el que se alimentará el circuito de aceite de todos los compresores de la bancada. El aceite ingresará a cada compresor a través de un nivel electrónico, el cual está dotado de una electroválvula que gestiona su apertura o cierre.  

Los gases de descarga, ya prácticamente sin aceite y a la temperatura y presión indicada anteriormente, son conducidos a un "gas cooler" (enfriador), situado en cubierta y dotado de ventiladores helicoidales, donde ceden parte del calor sensible al aire que circula por su batería y se produce un decremento de la temperatura del fluido frigorífico hasta alcanzar +38 °C. 
RADIAL SALA DE MÁQUINAS / HELICOIDAL CUBIERTA

El refrigerante, a alta presión, se expansiona hasta la presión de intermedia mediante una válvula de expansión electrónica transcrítica y se conduce al recipiente de líquido vertical de las centrales, a una temperatura superior a los +5,3 °C, donde una parte llega en fase líquida y la otra en fase gas (flash gas). Estos gases flash sobrecalentados se reconducen hasta el colector de aspiración de la central positiva, provocándoles una pequeña caída de presión mediante otra válvula de expansión electrónica, denominada válvula de flash gas bypass`;
        
        setMemoriaData(prev => ({ ...prev, descripcionInstalacion: boosterDescription }));
      }
      
      return newData;
    });
  };

  // Handle Word template upload
  const handleWordTemplateUpload = (file: File) => {
    setWordTemplate(file);
    console.log("Word template uploaded:", file.name);
  };
  
  // Generate and download Word document
  const handleGenerateWordDocument = async () => {
    if (!wordTemplate) {
      toast({
        title: "Plantilla no encontrada",
        description: "Debes cargar una plantilla Word antes de generar el documento",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (!previewRef.current) {
        throw new Error("No se encuentra la vista previa");
      }
      
      const htmlPreview = previewRef.current.innerHTML;
      const templateArrayBuffer = await wordTemplate.arrayBuffer();

      await buildWord({
        templateArrayBuffer,
        htmlPreview,
        logoUrl: "/lovable-uploads/0849350b-e654-4690-a2e5-da51a316f627.png" // Logo URL
      });
      
      toast({
        title: "Documento generado",
        description: "El documento Word se ha generado correctamente"
      });
    } catch (error) {
      console.error("Error generating document:", error);
      toast({
        title: "Error",
        description: "No se pudo generar el documento Word: " + (error as Error).message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        hasWordTemplate={!!wordTemplate} 
        onGenerateWordDocument={handleGenerateWordDocument} 
      />
      
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 p-4 overflow-auto border-r" style={{ height: 'calc(100vh - 126px)' }} ref={formContainerRef}>
          <FormSection 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
            onFormChange={handleFormChange}
            onCalculationsChange={handleCalculationsChange}
            onExcelUpload={handleExcelUpload}
            onWordTemplateUploaded={handleWordTemplateUpload}
            onGenerateWordDocument={handleGenerateWordDocument}
            hasWordTemplate={!!wordTemplate}
          />
        </div>
        
        {/* Right side - Preview */}
        <div 
          className="w-full lg:w-1/2 p-4 bg-gray-50 overflow-auto"
          style={{ height: 'calc(100vh - 126px)' }}
          ref={previewContainerRef}
        >
          <PreviewSection 
            memoriaData={memoriaData}
            calculationsData={calculationsData}
            excelData={excelData}
            previewRef={previewRef}
          />
        </div>
      </div>
    </div>
  );
};

export default VistaPrevia;
