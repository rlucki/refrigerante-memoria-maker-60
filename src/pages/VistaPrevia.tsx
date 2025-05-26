import React, { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { buildWord } from "@/services/wordDocumentService";
import Header from "@/components/vista-previa/Header";
import FormSection from "@/components/vista-previa/FormSection";
import PreviewSection from "@/components/vista-previa/PreviewSection";

// Importa tu base de datos de refrigerantes
import { refrigerantesData } from "@/data/refrigerantsData";

const VistaPrevia: React.FC = () => {
  const [memoriaData, setMemoriaData] = useState<any>({
    // agrega campo aplicaGasesFluorados
    gasFluorado: "SI",
    aplicaGasesFluorados: "SI",

    // — Datos Titular —
    titular: "DINOSOL SUPERMERCADOS S.L.",
    nif: "B61742565",
    direccion: "CTRA. DEL RINCÓN, S/N, 4ª PLANTA Edif. Anexo C.C. Las Arenas",
    poblacion: "LAS PALMAS DE GRAN CANARIA",
    provincia: "LAS PALMAS",
    cp: "35010",
    telefono: "928303600",
    email: "info.supermercado@dinosol.es",

    // — Datos Notificaciones —
    direccionNotif: "C/ Luis Correa Medina, 9",
    poblacionNotif: "LAS PALMAS DE GRAN CANARIA",
    provinciaNotif: "LAS PALMAS",
    cpNotif: "35013",
    telefonoNotif: "928303600",

    // — Datos Instalador —
    instalador: "GESTÉCNICA INTEGRAL 10. S.L.",
    cif_instalacion: "B76501931",
    n_registro_instalacion: "38020755",
    direccion_instalador: "C/ ISAAC PERAL, Nº 3, NAVE 5",
    poblacion_instalacion: "EL ROSARIO",
    cp_instalacion: "38109",
    telefono_instalacion: "922618202",
    mail_instalacion: "gestecnicaintegral10@gestecnicaintegral10.es",

    // — Datos de la Instalación —
    direccionInstalacion: "AVDA. BLAS PÉREZ GONZÁLEZ, 4",
    poblacionInstalacion: "PUERTO DE LA CRUZ",
    cpInstalacion: "35610",
    provinciaInstalacion: "SANTA CRUZ DE TENERIFE",
    telefonoInstalacion: "922443768",
    num_inscripcion: "IF202400127",
    fecha_inscripcion: "2024-09-23",

    // — Encabezados —
    titulo: "MEMORIA TÉCNICA DESCRIPTIVA",
    encabezado: "",

    // — Datos Proyecto —
    tipoInstalacion: "Supermercado",
    nombreProyecto: "Costa del Silencio (Arona)",

    // — Clasificación (iniciales) —
    metodoEnfriamiento: "Sistema indirecto",
    seguridadSistema: "Tipo 1",
    categoriaLocal: "Categoría A",

    // — Refrigerante inicial —
    refrigerante: "R-434A",
    composicionRefrigerante:
      "(63,2% R-125 / 18% R-143a / 16% R-134a / 2,8% R-600a)",
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
    clasificacionSistema: "SI",

    nivelInstalacion: "Nivel 1",
    documentoNecesario: "Memoria",

    // — Normativa (se irá llenando) —
    normativaCompleta: null,

    // — Descripción Instalación —
    descripcionInstalacion: `La instalación está compuesta por varios muebles frigoríficos tipo mural...
    `,
  });

  const [excelData, setExcelData] = useState<any>(null);
  const [excelVisibleData, setExcelVisibleData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"form" | "word">("form");
  const [activeSubTab, setActiveSubTab] = useState<string>("titular");
  const formContainerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [calculationsData, setCalculationsData] = useState<any>({
    compresorMT: "0",
    compresorBT: "0",
    compresorParalelo: "0",
    ubicacionGascooler: "",
    tieneIHX: "no",
    tieneDesrecalentador: "no",
  });
  const [wordTemplate, setWordTemplate] = useState<File | null>(null);

  // -----------------------------
  // HANDLE FORM CHANGES
  // -----------------------------
  const handleFormChange = (field: string, value: any) => {
    console.log(`Field changed: ${field}`, value);

    if (field === "refrigerante") {
      const info = refrigerantesData[value];
      if (info) {
        setMemoriaData((prev: any) => ({
          ...prev,
          refrigerante: value,
          composicionRefrigerante: info.composicion,
          inflamabilidad: info.inflamabilidad,
          toxicidad: info.toxicidad,
          grupoSeguridad: info.grupoSeguridad,
          directivaEquipos: info.directivaEquipos,
          pca: info.pca,
          agotamientoOzono: info.agotamientoOzono,
          limitePractico: info.limitePractico,
          atelOdl: info.atelOdl,
          limiteInflamabilidad: info.limiteInflamabilidad,
          temperaturaAutoignicion: info.temperaturaAutoignicion,
          gasFluorado: info.gasFluorado,
          clasificacionSistema: info.gasFluorado,
          aplicaGasesFluorados: info.gasFluorado  // <— ahora se sincroniza
        }));
      } else {
        setMemoriaData((prev: any) => ({ ...prev, refrigerante: value }));
      }
      return;
    }

    if (field === "gasFluorado") {
      setMemoriaData((prev: any) => ({
        ...prev,
        gasFluorado: value,
        clasificacionSistema: value,
        aplicaGasesFluorados: value  // <— y aquí también
      }));
      return;
    }

    if (field === "clasificacionSistema") {
      setMemoriaData((prev: any) => ({
        ...prev,
        clasificacionSistema: value,
        gasFluorado: value,
        aplicaGasesFluorados: value  // <— y aquí
      }));
      return;
    }

    setMemoriaData((prev: any) => ({ ...prev, [field]: value }));
  };

  // -----------------------------
  // EFECTO DEBUG
  // -----------------------------
  useEffect(() => {
    console.log("🛰 memoriaData:", memoriaData);
  }, [memoriaData]);

  // -----------------------------
  // UPLOAD HANDLERS
  // -----------------------------
  const handleExcelUpload = (data: any) => {
    setExcelData(data);
    setExcelVisibleData(data.jsonData || data);
  };
  const handleCalculationsChange = (field: string, value: string) => {
    setCalculationsData((prev) => ({ ...prev, [field]: value }));
  };
  const handleWordTemplateUpload = (file: File) => setWordTemplate(file);
  const handleGenerateWordDocument = async () => {
    if (!wordTemplate) {
      toast({ title: "Plantilla no encontrada", description: "Carga primero tu plantilla Word", variant: "destructive" });
      return;
    }
    try {
      if (!previewRef.current) throw new Error("No preview");
      const html = previewRef.current.innerHTML;
      const buf = await wordTemplate.arrayBuffer();
      await buildWord({ templateArrayBuffer: buf, htmlPreview: html, logoUrl: "/logo.png" });
      toast({ title: "Documento generado" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header hasWordTemplate={!!wordTemplate} onGenerateWordDocument={handleGenerateWordDocument} />
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Formulario */}
        <div
          ref={formContainerRef}
          className="w-full lg:w-1/2 p-4 overflow-auto border-r"
          style={{ height: "calc(100vh - 126px)" }}
        >
          <FormSection
            activeTab={activeTab}
            setActiveTab={(tab: string) => setActiveTab(tab as "form" | "word")}
            activeSubTab={activeSubTab}
            setActiveSubTab={(sub: string) => setActiveSubTab(sub)}
            onFormChange={handleFormChange}
            onCalculationsChange={handleCalculationsChange}
            onExcelUpload={handleExcelUpload}
            onWordTemplateUploaded={handleWordTemplateUpload}
            onGenerateWordDocument={handleGenerateWordDocument}
            hasWordTemplate={!!wordTemplate}
          />
        </div>

        {/* Vista previa */}
        <div
          ref={previewContainerRef}
          className="w-full lg:w-1/2 p-4 bg-gray-50 overflow-auto"
          style={{ height: "calc(100vh - 126px)" }}
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
