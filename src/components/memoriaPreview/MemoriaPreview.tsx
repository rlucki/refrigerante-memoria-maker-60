
import React from "react";
import MemoriaPortada from "./MemoriaPortada";
import MemoriaSecciones1a9 from "./MemoriaSecciones1a9";
import MemoriaPreviewNormativa from "../MemoriaPreviewNormativa";
import MemClasificacion from "./MemoriaClasificacion";
import MemoriaClasificacionLocal from "./MemoriaClasificacionLocal";
import MemoriaClasificacionGas from "./MemoriaClasificacionGas";
import MemoriaInstalacion from "./MemoriaInstalacion";
import MemoriaDescripcion from "./MemoriaDescripcion";
import MemoriaInstalacionElectrica from "./MemoriaInstalacionElectrica";
import MemoriaTuberias from "./MemoriaTuberias";
import MemoriaSoportaciones from "./MemoriaSoportaciones";
import MemoriaSobrepresiones from "./MemoriaSobrepresiones";

interface MemoriaPreviewProps {
  data: {
    titular?: string;
    nif?: string;
    direccion?: string;
    poblacion?: string;
    provincia?: string;
    cp?: string;
    instalador?: string;
    direccionInstalacion?: string;
    poblacionInstalacion?: string;
    cpInstalacion?: string;
    provinciaInstalacion?: string;
    titulo?: string;
    
    // Datos de clasificación
    metodoEnfriamiento?: string;
    seguridadSistema?: string;
    categoriaLocal?: string;
    refrigerante?: string;
    composicionRefrigerante?: string;
    inflamabilidad?: string;
    toxicidad?: string;
    grupoSeguridad?: string;
    directivaEquipos?: string;
    pca?: string;
    agotamientoOzono?: string;
    limitePractico?: string;
    atelOdl?: string;
    limiteInflamabilidad?: string;
    temperaturaAutoignicion?: string;
    gasFluorado?: string;
    nivelInstalacion?: string;
    documentoNecesario?: string;
    
    // Datos de normativa
    normativaCompleta?: any;
    
    // Descripción de la instalación
    descripcionInstalacion?: string;
  };
  currentPage?: number;
}

const MemoriaPreview: React.FC<MemoriaPreviewProps> = ({ data, currentPage = 1 }) => {
  
  return (
    <div className="memoria-preview-container">
      {/* Página 1: Portada */}
      <MemoriaPortada data={data} />
      
      {/* Página 2: Secciones 1-9 */}
      <MemoriaSecciones1a9 data={data} />
      
      {/* Página 3: Normativa */}
      <MemoriaPreviewNormativa data={data} />
      
      {/* Página 4: Clasificación Sistema */}
      <MemClasificacion data={data} />
      
      {/* Página 5: Clasificación Local */}
      <MemoriaClasificacionLocal data={data} />
      
      {/* Página 6: Clasificación Gas */}
      <MemoriaClasificacionGas data={data} />
      
      {/* Página 7: Clasificación Instalación + Sala + Resumen */}
      <MemoriaInstalacion data={data} />
      
      {/* Página 8: Descripción Instalación */}
      <MemoriaDescripcion data={data} />
      
      {/* Página 9: Instalación Eléctrica */}
      <MemoriaInstalacionElectrica />
      
      {/* Página 10: Tuberías */}
      <MemoriaTuberias />
      
      {/* Página 11: Soportaciones */}
      <MemoriaSoportaciones />
      
      {/* Página 12: Sobrepresiones */}
      <MemoriaSobrepresiones />
    </div>
  );
};

export default MemoriaPreview;
