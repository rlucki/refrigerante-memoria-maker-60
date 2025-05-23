
import {
  reglamentosRSIF,
  additionalRSIFText,
  reglamentosAutonomicos,
  normativasSiempreAplican,
  normativasGasesFluorados,
  normativaEdificacion,
  normativaLegionela,
  normativaSeguridadSalud,
} from "../constants/normativas";
import { comunidadesAutonomas } from "../constants/regiones";

export const getNormativaAutonomica = (comunidadAutonoma: string, instalacionNueva: string) => {
  const comunidad = comunidadesAutonomas.find(c => c.id === comunidadAutonoma);
  if (comunidad) {
    // Check if the regulation applies to all installations or only to old ones
    if (comunidad.aplicaSiempre || instalacionNueva === "NO") {
      return comunidad.normativa;
    }
  }
  return "No aplica";
};

// Function to get all applicable regulations for the current selections
export const getAplicableRegulations = (
  comunidadAutonoma: string,
  instalacionNueva: string,
  rsifAplicable: string,
  aplicaLegionela: string,
  aplicaGasesFluorados: string
) => {
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
    // For old installations, add the relevant RSIF and current one
    if (rsifAplicable in reglamentosRSIF) {
      regulations.reglamentoRSIF.regulations.push({
        name: rsifAplicable,
        description: reglamentosRSIF[rsifAplicable]
      });
      
      // Add the current RSIF as well for old installations
      if (rsifAplicable !== "RD 552/2019") {
        regulations.reglamentoRSIF.regulations.push({
          name: "RD 552/2019",
          description: additionalRSIFText["RD 552/2019_antiguo"]
        });
      }
    }
  } else {
    // For new installations, just add the current RSIF
    regulations.reglamentoRSIF.regulations.push({
      name: "RD 552/2019",
      description: reglamentosRSIF["RD 552/2019"]
    });
  }
  
  // Add autonomic regulations if applicable
  const autonomicRegulation = getNormativaAutonomica(comunidadAutonoma, instalacionNueva);
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
  
  // Add gases fluorados regulations
  if (aplicaGasesFluorados === "SI") {
    // If Gases Fluorados is YES, add ALL regulations
    Object.entries(normativasGasesFluorados).forEach(([name, description]) => {
      regulations.gasesFluorados.regulations.push({ name, description });
    });
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
  
  return regulations;
};

// Function to detect region from postal code
export const detectRegionFromPostalCode = (postalCode: string, postalCodeRegions: any[]) => {
  if (postalCode.length >= 2) {
    const prefix = postalCode.substring(0, 2);
    const regionMatch = postalCodeRegions.find(r => r.prefix === prefix);
    
    if (regionMatch) {
      return regionMatch.region;
    }
  }
  return null;
};
