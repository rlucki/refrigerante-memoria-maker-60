
import { useState, useEffect } from "react";
import { postalCodeToCommunity } from "@/data/postalCodeMapping";

// Define regulation descriptions
export const reglamentosRSIF = {
  "RD 552/2019": `Real Decreto 552/2019, de 27 de septiembre, por el que se aprueban el Reglamento de seguridad para instalaciones frigoríficas y sus instrucciones técnicas complementarias. Es el Reglamento que se encuentra en vigor desde el 2 de enero de 2020.`,
  "RD 138/2011": `Real Decreto 138/2011, de 4 de febrero, por el que se aprueban el Reglamento de seguridad para instalaciones frigoríficas y sus instrucciones técnicas complementarias, publicado en el BOE con fecha martes 8 de marzo de 2011, entando en vigor seis meses después de su publicación. Es el que se encontraba en vigor en la puesta en marcha de la instalación.`,
  "RD 3099/1977": `Real Decreto 3099/1977, de 8 de septiembre, por el que se aprueban el Reglamento de Seguridad para Plantas e Instalaciones Frigoríficas y sus instrucciones técnicas complementarias. Es el que se encontraba en vigor en la puesta en marcha de la instalación.`,
  "Decreto 3214/1971": `Decreto 3214/1971, de 28 de octubre, por el que se aprueba el Reglamento de Seguridad para Plantas e Instalaciones Frigoríficas. Es el que se encontraba en vigor en el momento de la puesta en marcha de la instalación.`
};

export const additionalRSIFText = {
  "RD 552/2019_antiguo": ` Real Decreto 552/2019, de 27 de septiembre, por el que se aprueban el Reglamento de seguridad para instalaciones frigoríficas y sus instrucciones técnicas complementarias. Es el Reglamento que se encuentra en vigor desde el 2 de enero de 2020 y del que se observarán las disposiciones de cumplimiento obligatorio para instalaciones en funcionamiento antes de su entrada en vigor.`
};

export const reglamentosAutonomicos = {
  "Decret 192/2023": `Decret 192/2023, de 7 de noviembre, de la Seguretat Industrial dels Establiments, les Instal·lacions i els Productes, publicada en el Diari Oficial de la Generalitat de Catalunya (DOGC) n.º 9037 el 9 de noviembre de 2023. Este Decret deroga, entre otras, las Instruccions 1/2015, 2/2015 y 1/2019.`,
  "Decreto-Ley 4/2023": `Decreto-Ley 4/2023, de 6 de febrero, por el que se adoptan medidas de simplificación y racionalización administrativa para la mejora de las relaciones de los ciudadanos con la Administración de la Junta de Andalucía y el impulso de la actividad económica en Andalucía, publicada en el Boletín Oficial de la Junta de Andalucía (BOJA) n.º 34, de 16 de febrero de 2024.`,
  "Orden EEI/1036/2021": `Orden EEI/1036/2021, de 6 de septiembre, por la que se establece el procedimiento de regularización administrativa de instalaciones sometidas a la normativa de seguridad industrial, publicada en el Boletín Oficial de Castilla y León (BOCyL) n.º 180, de 16 de septiembre de 2021.`
};

export const normativasSiempreAplican = {
  "RD 709/2015": `Real Decreto 709/2015, de 24 de julio, por el que se dictan las disposiciones de aplicación de la Directiva del Parlamento Europeo y del Consejo, 2014/68/UE, relativa a la armonización de las legislaciones de los Estados miembros sobre la comercialización de equipos a presión, y que deroga la Directiva 97/23/CE.`,
  "RD 842/2002": `Real Decreto 842/2002, de 2 de agosto, por el que se aprueba el Reglamento Electrotécnico para Baja Tensión y sus instrucciones técnicas complementarias.`
};

export const normativasGasesFluorados = {
  "Reglamento (UE) 2024/573": `Reglamento (UE) N.º 2024/573 del Parlamento Europeo y del Consejo, de 7 de febrero de 2024, sobre los gases fluorados de efecto invernadero, por el que se modifica la Directiva (UE) 2019/1937, y se deroga el Reglamento (UE) 517/2014.`,
  "Reglamento de ejecución (UE) 2024/2174": `Reglamento de ejecución (UE) 2024/2174 de la Comisión, de 2 de septiembre de 2024, por el que se establecen disposiciones de aplicación del Reglamento (UE) 2024/573 del Parlamento Europeo y del Consejo, en lo que respecta al formato de las etiquetas de determinados productos y aparatos que contengan gases fluorados de efecto invernadero y se deroga el Reglamento de Ejecución (UE) 2015/2068 de la Comisión.`,
  "Reglamento (UE) 2024/590": `Reglamento (UE) 2024/590 del Parlamento Europeo y del Consejo, de 16 de febrero de 2024, sobre las sustancias que agotan la capa de ozono. Este Reglamento deroga el Reglamento (CE) 1005/2009 del Parlamento Europeo y del Consejo, de 16 de septiembre.`,
  "Reglamento (CE) 1516/2007": `Reglamento (CE) n.º 1516/2007 de la Comisión, de 19 de diciembre de 2007 por el que se establecen, de conformidad con el Reglamento (CE) n.º 842/2006 del Parlamento Europeo y del Consejo, requisitos de control de fugas estándar para los equipos fijos de refrigeración, aires acondicionado y bombas de calor que contengan determinados gases fluorados de efecto invernadero.`,
  "RD 115/2017": `Real Decreto 115/2017, de 17 de febrero, por el que se regula la comercialización y manipulación de gases fluorados y equipos basados en los mismos, así como la certificación de los profesionales que los utilizan y por el que se establecen los requisitos técnicos para las instalaciones que desarrollen actividades que emitan gases fluorados. Este Real Decreto deroga el RD 795/2010, de 16 de junio.`
};

export const normativaEdificacion = {
  "RD 314/2006": `Real Decreto 314/2006, de 17 de marzo, por el que se aprueba el Código Técnico de la Edificación y modificaciones posteriores.`,
  "RD 1371/2007": `Real Decreto 1371/2007, de 19 de octubre, por el que se aprueba el documento básico \"DB-HR Protección frente al ruido\" del Código Técnico de la Edificación y se modifica el RD 314/2006.`,
  "RD 732/2019": `Real Decreto 732/2019, de 20 de diciembre, por el que se modifica el Código Técnico de la Edificación, aprobado por el RD 314/2006.`
};

export const normativaLegionela = {
  "RD 487/2022": `Real Decreto 487/2022, de 21 de junio, por el que se establecen los requisitos sanitarios para la prevención y el control de la legionelosis.`,
  "RD 614/2024": `Real Decreto 614/2024, de 2 de julio, por el que se modifica el Real Decreto 487/2022, de 21 de junio.`
};

export const normativaSeguridadSalud = {
  "Ley 31/1995": `Ley 31/1995 de 8 de noviembre de Prevención de Riesgos Laborales.`,
  "RD 485/1997": `Real Decreto 485/1997, de 14 de abril de 1997, sobre disposiciones mínimas en materia de señalización y salud en el trabajo.`,
  "RD 1627/1997": `Real Decreto 1627/1997, de 24 de octubre, por el que se establecen disposiciones mínimas de seguridad y salud en las obras de construcción. Transpone la Directiva Europea 92/57/CEE, de 24 de junio. El RD 2177/2004, de 12 de noviembre, modifica el anexo IV. El RD 604/2006, de 19 de mayo, incorpora una disposición adicional única. El RD 1109/2007, de 24 de agosto, modifica los artículos 13.4 y 18.2. Finalmente, el RD 337/2010, de 19 de marzo, deroga el artículo 18 y modifica el 19.1.`
};

export const comunidadesAutonomas = [
  { id: "ANDALUCIA", nombre: "ANDALUCÍA", normativa: "Decreto-Ley 4/2023", aplicaSiempre: true },
  { id: "ARAGON", nombre: "ARAGÓN", normativa: "No aplica", aplicaSiempre: false },
  { id: "ASTURIAS", nombre: "ASTURIAS", normativa: "No aplica", aplicaSiempre: false },
  { id: "BALEARES", nombre: "ILLES BALEARS", normativa: "No aplica", aplicaSiempre: false },
  { id: "CANARIAS", nombre: "CANARIAS", normativa: "No aplica", aplicaSiempre: false },
  { id: "CANTABRIA", nombre: "CANTABRIA", normativa: "No aplica", aplicaSiempre: false },
  { id: "CASTILLA_LEON", nombre: "CASTILLA Y LEÓN", normativa: "Orden EEI/1036/2021", aplicaSiempre: false },
  { id: "CASTILLA_MANCHA", nombre: "CASTILLA-LA MANCHA", normativa: "No aplica", aplicaSiempre: false },
  { id: "CATALUNYA", nombre: "CATALUNYA", normativa: "Decret 192/2023", aplicaSiempre: true },
  { id: "VALENCIA", nombre: "COM. VALENCIANA", normativa: "No aplica", aplicaSiempre: false },
  { id: "EXTREMADURA", nombre: "EXTREMADURA", normativa: "No aplica", aplicaSiempre: false },
  { id: "GALICIA", nombre: "GALICIA", normativa: "No aplica", aplicaSiempre: false },
  { id: "MADRID", nombre: "MADRID", normativa: "No aplica", aplicaSiempre: false },
  { id: "MURCIA", nombre: "MURCIA", normativa: "No aplica", aplicaSiempre: false },
  { id: "NAVARRA", nombre: "NAVARRA", normativa: "No aplica", aplicaSiempre: false },
  { id: "PAIS_VASCO", nombre: "PAÍS VASCO-EUSKADI", normativa: "No aplica", aplicaSiempre: false },
  { id: "LA_RIOJA", nombre: "LA RIOJA", normativa: "No aplica", aplicaSiempre: false },
  { id: "CEUTA", nombre: "CEUTA", normativa: "No aplica", aplicaSiempre: false },
  { id: "MELILLA", nombre: "MELILLA", normativa: "No aplica", aplicaSiempre: false },
];

export const periodoInstalacion = [
  { id: "entre_1971_1977", nombre: "Entre 1971 y 1977", rsif: "Decreto 3214/1971" },
  { id: "entre_1978_2011", nombre: "Entre 1978 y 2011", rsif: "RD 3099/1977" },
  { id: "entre_2012_2019", nombre: "Entre 2012 y 2019", rsif: "RD 138/2011" },
  { id: "desde_2020", nombre: "A partir de 2020", rsif: "RD 552/2019" },
  { id: "nueva", nombre: "Nueva", rsif: "RD 552/2019" },
];

// Custom hook for normativa logic
export const useNormativaLogic = (aplicaGasesFluorados?: string, codigoPostal?: string, onNormativaChange?: (field: string, value: any) => void) => {
  const [comunidadAutonoma, setComunidadAutonoma] = useState("CATALUNYA");
  const [instalacionNueva, setInstalacionNueva] = useState("SI");
  const [periodoInstalacionSeleccionado, setPeriodoInstalacionSeleccionado] = useState("nueva");
  const [aplicaLegionela, setAplicaLegionela] = useState("SI");
  const [rsifAplicable, setRsifAplicable] = useState("RD 552/2019");
  const [normativaCompleta, setNormativaCompleta] = useState({});

  // Auto-set comunidad autonoma based on postal code
  useEffect(() => {
    if (codigoPostal) {
      const detectedCommunity = postalCodeToCommunity(codigoPostal);
      setComunidadAutonoma(detectedCommunity);
      console.log("Auto-detected community based on postal code:", codigoPostal, "->", detectedCommunity);
    }
  }, [codigoPostal]);

  // Update installation period when the installation status changes
  useEffect(() => {
    if (instalacionNueva === "SI") {
      setPeriodoInstalacionSeleccionado("nueva");
      setRsifAplicable("RD 552/2019");
    } else {
      if (periodoInstalacionSeleccionado === "nueva") {
        setPeriodoInstalacionSeleccionado("desde_2020");
        setRsifAplicable("RD 552/2019");
      } else {
        const periodo = periodoInstalacion.find(p => p.id === periodoInstalacionSeleccionado);
        if (periodo) {
          setRsifAplicable(periodo.rsif);
        }
      }
    }
  }, [instalacionNueva]);

  // Update RSIF when the installation period changes
  useEffect(() => {
    const periodo = periodoInstalacion.find(p => p.id === periodoInstalacionSeleccionado);
    if (periodo) {
      setRsifAplicable(periodo.rsif);
    }
  }, [periodoInstalacionSeleccionado]);

  const handleInstalacionNuevaChange = (value: string) => {
    setInstalacionNueva(value);
    if (value === "NO" && periodoInstalacionSeleccionado === "nueva") {
      setPeriodoInstalacionSeleccionado("desde_2020");
    }
  };

  const getNormativaAutonomica = () => {
    const comunidad = comunidadesAutonomas.find(c => c.id === comunidadAutonoma);
    if (comunidad) {
      if (comunidad.aplicaSiempre || instalacionNueva === "NO") {
        return comunidad.normativa;
      }
    }
    return "No aplica";
  };

  // Function to get all applicable regulations for the current selections
  const getAplicableRegulations = () => {
    console.log("🔧 getAplicableRegulations called with aplicaGasesFluorados:", aplicaGasesFluorados);
    
    const regulations = {
      reglamentoRSIF: {
        title: "REGLAMENTOS DE INSTALACIONES FRIGORÍFICAS",
        regulations: []
      },
      reglamentoAutonomico: {
        title: "NORMATIVA AUTONÓMICA",
        regulations: []
      },
      normativasSiempreAplican: {
        title: "NORMATIVA QUE SIEMPRE APLICA",
        regulations: []
      },
      gasesFluorados: {
        title: "NORMATIVA GASES FLUORADOS",
        regulations: []
      },
      edificacion: {
        title: "NORMATIVA EDIFICACIÓN",
        regulations: []
      },
      legionela: {
        title: "NORMATIVA LEGIONELOSIS",
        regulations: []
      },
      seguridadSalud: {
        title: "NORMATIVA SEGURIDAD Y SALUD",
        regulations: []
      }
    };

    // Add RSIF regulations
    if (instalacionNueva === "NO") {
      if (rsifAplicable in reglamentosRSIF) {
        regulations.reglamentoRSIF.regulations.push({
          name: rsifAplicable,
          description: reglamentosRSIF[rsifAplicable]
        });
        
        if (rsifAplicable !== "RD 552/2019") {
          regulations.reglamentoRSIF.regulations.push({
            name: "RD 552/2019",
            description: additionalRSIFText["RD 552/2019_antiguo"]
          });
        }
      }
    } else {
      regulations.reglamentoRSIF.regulations.push({
        name: "RD 552/2019",
        description: reglamentosRSIF["RD 552/2019"]
      });
    }
    
    // Add autonomic regulations if applicable
    const autonomicRegulation = getNormativaAutonomica();
    if (autonomicRegulation !== "No aplica" && autonomicRegulation in reglamentosAutonomicos) {
      regulations.reglamentoAutonomico.regulations.push({
        name: autonomicRegulation,
        description: reglamentosAutonomicos[autonomicRegulation]
      });
    }
    
    // Add regulations that always apply
    Object.entries(normativasSiempreAplican).forEach(([name, description]) => {
      regulations.normativasSiempreAplican.regulations.push({ name, description });
    });
    
    // Add gases fluorados regulations when aplicaGasesFluorados is "SI"
    console.log("🔧 Checking gases fluorados. aplicaGasesFluorados:", aplicaGasesFluorados);
    if (aplicaGasesFluorados === "SI") {
      console.log("🔧 Adding gases fluorados regulations...");
      Object.entries(normativasGasesFluorados).forEach(([name, description]) => {
        regulations.gasesFluorados.regulations.push({ name, description });
      });
      console.log("🔧 Added", regulations.gasesFluorados.regulations.length, "gases fluorados regulations");
    } else {
      console.log("🔧 Not adding gases fluorados regulations (aplicaGasesFluorados is not SI)");
    }
    
    // Add edificación regulations (always apply)
    Object.entries(normativaEdificacion).forEach(([name, description]) => {
      regulations.edificacion.regulations.push({ name, description });
    });
    
    // Add legionela if applicable
    if (aplicaLegionela === "SI") {
      Object.entries(normativaLegionela).forEach(([name, description]) => {
        regulations.legionela.regulations.push({ name, description });
      });
    }
    
    // Add seguridad y salud (always apply)
    Object.entries(normativaSeguridadSalud).forEach(([name, description]) => {
      regulations.seguridadSalud.regulations.push({ name, description });
    });
    
    console.log("🔧 Final regulations object:", regulations);
    return regulations;
  };

  // Update normativa when any input changes INCLUDING aplicaGasesFluorados
  useEffect(() => {
    console.log("🔧 useEffect triggered. aplicaGasesFluorados:", aplicaGasesFluorados);
    const regulations = getAplicableRegulations();
    setNormativaCompleta(regulations);
    
    // Notify parent component about normativa changes
    if (onNormativaChange) {
      onNormativaChange('normativaCompleta', regulations);
    }
  }, [comunidadAutonoma, instalacionNueva, periodoInstalacionSeleccionado, aplicaLegionela, aplicaGasesFluorados, onNormativaChange]);

  return {
    // State
    comunidadAutonoma,
    setComunidadAutonoma,
    instalacionNueva,
    setInstalacionNueva,
    periodoInstalacionSeleccionado,
    setPeriodoInstalacionSeleccionado,
    aplicaLegionela,
    setAplicaLegionela,
    rsifAplicable,
    setRsifAplicable,
    normativaCompleta,
    setNormativaCompleta,
    
    // Functions
    handleInstalacionNuevaChange,
    getNormativaAutonomica,
    getAplicableRegulations
  };
};
