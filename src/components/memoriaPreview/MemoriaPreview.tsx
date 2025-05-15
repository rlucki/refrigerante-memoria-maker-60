
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
import MemoriaCargaRefrigerante from "./MemoriaCargaRefrigerante";

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
    
    // Datos del proyecto
    tipoInstalacion?: string;
    nombreProyecto?: string;
    
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
      {/* Páginas 1-11 */}
      <MemoriaPortada data={data} />
      <MemoriaSecciones1a9 data={data} />
      <MemoriaPreviewNormativa data={data} />
      <MemClasificacion data={data} />
      <MemoriaClasificacionLocal data={data} />
      <MemoriaClasificacionGas data={data} />
      <MemoriaInstalacion data={data} />
      <MemoriaDescripcion data={data} />
      <MemoriaInstalacionElectrica />
      <MemoriaTuberias />
      <MemoriaSoportaciones />
      
      {/* Página 12: Sobrepresiones */}
      <MemoriaSobrepresiones />
      
      {/* Página 13: Carga Refrigerante */}
      <MemoriaCargaRefrigerante />
    </div>
  );
};

export default MemoriaPreview;
