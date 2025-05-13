
import React from "react";
import { Card } from "@/components/ui/card";

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
    clienteLogo?: string;
  };
  currentPage?: number;
}

const MemoriaPreview: React.FC<MemoriaPreviewProps> = ({ data, currentPage = 1 }) => {
  // Use a company logo that won't have the incorrect one
  const companyLogo = "/lovable-uploads/2b54f50e-bf5f-4be0-8559-6310a024aa33.png";
  
  return (
    <div className="bg-white shadow-lg border rounded-lg overflow-hidden h-full flex flex-col">
      {/* Cabecera de la memoria */}
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Vista previa</h2>
        <span className="text-sm text-gray-500">Página {currentPage}</span>
      </div>
      
      <div className="flex-1 overflow-auto p-8">
        {/* Portada */}
        <div className="mb-12 max-w-[595px] mx-auto bg-white shadow-sm border min-h-[842px] relative p-10">
          {/* Logos en la parte superior */}
          <div className="flex justify-between mb-32">
            <img 
              src={companyLogo} 
              alt="Logo Empresa" 
              className="h-16 object-contain" 
            />
            {data.clienteLogo && (
              <img 
                src={data.clienteLogo} 
                alt="Logo Cliente" 
                className="h-16 object-contain" 
              />
            )}
          </div>
          
          {/* Título central */}
          <div className="text-center mb-28">
            <h1 className="text-3xl font-bold mb-6">MEMORIA TÉCNICA</h1>
            <h2 className="text-2xl">INSTALACIÓN FRIGORÍFICA</h2>
          </div>
          
          {/* Datos del establecimiento */}
          <div className="mb-20">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">ESTABLECIMIENTO</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Titular:</span> {data.titular || "DINOSOL SUPERMERCADOS S.L."}</p>
              <p><span className="font-medium">Dirección:</span> {data.direccion || "CTRA. DEL RINCÓN, S/N, 4ª PLANTA Edif. Anexo C.C. Las Arenas"}</p>
              <p><span className="font-medium">Población:</span> {data.poblacion || "LAS PALMAS DE GRAN CANARIA"}</p>
              <p><span className="font-medium">Código Postal:</span> {data.cp || "35010"}</p>
              <p><span className="font-medium">Provincia:</span> {data.provincia || "LAS PALMAS"}</p>
            </div>
          </div>
          
          {/* Datos de la instalación */}
          <div className="mb-20">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">EMPLAZAMIENTO INSTALACIÓN</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Dirección:</span> {data.direccionInstalacion || "AVDA. BLAS PÉREZ GONZÁLEZ, 4"}</p>
              <p><span className="font-medium">Población:</span> {data.poblacionInstalacion || "PUERTO DE LA CRUZ"}</p>
              <p><span className="font-medium">Código Postal:</span> {data.cpInstalacion || "35610"}</p>
              <p><span className="font-medium">Provincia:</span> {data.provinciaInstalacion || "SANTA CRUZ DE TENERIFE"}</p>
            </div>
          </div>
          
          {/* Datos del instalador */}
          <div className="mb-20">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">EMPRESA INSTALADORA</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Nombre:</span> {data.instalador || "GESTÉCNICA INTEGRAL 10. S.L."}</p>
            </div>
          </div>
          
          {/* Numeración de página */}
          <div className="absolute bottom-5 right-5">
            <p className="text-xs text-gray-500">Pág. {currentPage}</p>
          </div>
        </div>
        
        {/* Segunda página - Índice */}
        <div className="mb-12 max-w-[595px] mx-auto bg-white shadow-sm border min-h-[842px] relative p-10">
          {/* Cabecera con logos */}
          <div className="flex justify-between mb-8">
            <img 
              src={companyLogo} 
              alt="Logo Empresa" 
              className="h-10 object-contain" 
            />
            {data.clienteLogo && (
              <img 
                src={data.clienteLogo} 
                alt="Logo Cliente" 
                className="h-10 object-contain" 
              />
            )}
          </div>
          
          {/* Título de índice */}
          <h2 className="text-2xl font-bold mb-8 text-center">ÍNDICE</h2>
          
          {/* Contenido del índice */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <p>1. OBJETO</p>
              <p>3</p>
            </div>
            <div className="flex justify-between">
              <p>2. ANTECEDENTES</p>
              <p>3</p>
            </div>
            <div className="flex justify-between">
              <p>3. TITULAR</p>
              <p>3</p>
            </div>
            <div className="flex justify-between">
              <p>4. DOMICILIO A EFECTOS DE NOTIFICACIONES</p>
              <p>3</p>
            </div>
            <div className="flex justify-between">
              <p>6. EMPRESA INSTALADORA</p>
              <p>4</p>
            </div>
            <div className="flex justify-between">
              <p>7. ACTIVIDAD</p>
              <p>4</p>
            </div>
            <div className="flex justify-between">
              <p>8. NORMATIVA DE APLICACIÓN</p>
              <p>5</p>
            </div>
            <div className="flex justify-between">
              <p>9. CLASIFICACIÓN DE LA INSTALACIÓN</p>
              <p>7</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>9.1. CLASIFICACIÓN DEL SISTEMA</p>
              <p>7</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>9.2. CLASIFICACIÓN DEL LOCAL</p>
              <p>8</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>9.3. CLASIFICACIÓN DEL GAS REFRIGERANTE</p>
              <p>9</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>9.4. CLASIFICACIÓN DE LA INSTALACIÓN</p>
              <p>10</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>9.5. SALA DE MÁQUINAS</p>
              <p>11</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>9.6. RESUMEN</p>
              <p>11</p>
            </div>
            <div className="flex justify-between">
              <p>10. DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA</p>
              <p>12</p>
            </div>
            <div className="flex justify-between">
              <p>11. CARGAS TÉRMICAS MUEBLES FRIGORÍFICOS Y CÁMARAS</p>
              <p>13</p>
            </div>
            <div className="flex justify-between">
              <p>12. MAQUINARIA INSTALADA</p>
              <p>14</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>12.1. CENTRALES POSITIVAS</p>
              <p>14</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>12.2. CENTRAL NEGATIVA</p>
              <p>15</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>12.3. EVAPORADORES</p>
              <p>16</p>
            </div>
            <div className="flex justify-between ml-8">
              <p>12.3.1. VALVULERÍA Y ELEMENTOS MUEBLES Y EVAPORADORES</p>
              <p>16</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>12.4. ELEMENTOS DE SEGURIDAD EN CÁMARAS</p>
              <p>17</p>
            </div>
            <div className="flex justify-between">
              <p>13. CUADROS ELÉCTRICOS</p>
              <p>20</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>13.1. TELEGESTIÓN</p>
              <p>21</p>
            </div>
            <div className="flex justify-between">
              <p>14. INSTALACIÓN ELÉCTRICA</p>
              <p>22</p>
            </div>
            <div className="flex justify-between">
              <p>15. TUBERÍAS Y AISLAMIENTO</p>
              <p>23</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>15.1. TUBERÍAS</p>
              <p>23</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>15.2. SUPORTACIONES</p>
              <p>23</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>15.3. AISLAMIENTO</p>
              <p>24</p>
            </div>
            <div className="flex justify-between">
              <p>16. SALAS DE MÁQUINAS</p>
              <p>24</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>16.1. VENTILACIÓN SALA DE MÁQUINAS</p>
              <p>24</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>16.2. DETECTOR DE FUGAS EN SALA DE MÁQUINAS</p>
              <p>25</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>16.3. INTERRUPTOR DE EMERGENCIA</p>
              <p>25</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>16.4. INTERRUPTOR ACTIVACIÓN VENTILACIÓN FORZADA SALA MÁQUINAS</p>
              <p>25</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>16.5. EXTINTORES PORTÁTILES</p>
              <p>26</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>16.6. PLACA DE IDENTIFICACIÓN</p>
              <p>26</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>16.7. CARTEL DE SEGURIDAD</p>
              <p>27</p>
            </div>
            <div className="flex justify-between">
              <p>17. EQUIPOS A PRESIÓN</p>
              <p>28</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>17.1. EQUIPOS A PRESIÓN CENTRAL POSITIVA</p>
              <p>28</p>
            </div>
            <div className="flex justify-between">
              <p>18. PROTECCIÓN CONTRA SOBREPRESIONES</p>
              <p>29</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>18.1. VÁLVULAS DE SEGURIDAD</p>
              <p>29</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>18.2. DESCARGA DE LAS VÁLVULAS DE SEGURIDAD</p>
              <p>30</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>18.3. LIMITADORES DE PRESIÓN</p>
              <p>33</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>18.4. PROTECCIÓN INTERNA COMPRESORES</p>
              <p>33</p>
            </div>
            <div className="flex justify-between">
              <p>19. CARGA MÁXIMA ADMISIBLE DE REFRIGERANTE</p>
              <p>34</p>
            </div>
            <div className="flex justify-between">
              <p>20. CONTROL DE FUGAS</p>
              <p>35</p>
            </div>
            <div className="flex justify-between">
              <p>21. REVISIONES E INSPECCIONES PERIÓDICAS</p>
              <p>38</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>21.1. REVISIONES PERIÓDICAS</p>
              <p>38</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>21.2. INSPECCIONES PERIÓDICAS</p>
              <p>40</p>
            </div>
            <div className="flex justify-between">
              <p>22. CONSIDERACIONES FINALES</p>
              <p>42</p>
            </div>
            <div className="flex justify-between">
              <p>23. ANEXOS</p>
              <p>43</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>23.1. PLANO DE SITUACIÓN DE LA INSTALACIÓN</p>
              <p>43</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>23.2. DISTRIBUCIÓN DE TUBERÍAS Y CANALIZACIONES</p>
              <p>45</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>23.3. ESQUEMAS FRIGORÍFICOS DE PRINCIPIO</p>
              <p>50</p>
            </div>
            <div className="flex justify-between ml-8">
              <p>23.3.1. ESQUEMA FRIGORÍFICO CENTRAL POSITIVA</p>
              <p>50</p>
            </div>
            <div className="flex justify-between ml-8">
              <p>23.3.2. ESQUEMA FRIGORÍFICO CENTRAL NEGATIVA</p>
              <p>50</p>
            </div>
            <div className="flex justify-between ml-8">
              <p>23.3.3. ESQUEMA FRIGORÍFICO SERVICIOS</p>
              <p>50</p>
            </div>
            <div className="flex justify-between ml-4">
              <p>23.4. FICHA DE SEGURIDAD REFRIGERANTE (FDS)</p>
              <p>52</p>
            </div>
          </div>
          
          {/* Numeración de página */}
          <div className="absolute bottom-5 right-5">
            <p className="text-xs text-gray-500">Pág. {currentPage + 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaPreview;
