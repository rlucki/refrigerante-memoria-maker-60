
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
  // Use the correct COLDsulting logo
  const companyLogo = "/lovable-uploads/02dc6811-1655-4701-81f9-bad03d948d87.png";
  
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
          {/* Título central */}
          <div className="text-center mb-28 mt-32">
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
          
          {/* Footer with logos and page number */}
          <div className="absolute bottom-10 left-0 w-full px-10">
            <div className="flex justify-between items-center">
              <img 
                src={companyLogo} 
                alt="Logo Empresa" 
                className="h-8 object-contain" 
              />
              {data.clienteLogo && (
                <img 
                  src={data.clienteLogo} 
                  alt="Logo Cliente" 
                  className="h-8 object-contain" 
                />
              )}
            </div>
            <div className="text-right mt-2">
              <p className="text-xs text-gray-500">Página {currentPage} de 64</p>
            </div>
          </div>
        </div>
        
        {/* Segunda página - Índice */}
        <div className="mb-12 max-w-[595px] mx-auto bg-white shadow-sm border min-h-[842px] relative p-10">
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
              <p>5. UBICACIÓN DE LA INSTALACIÓN</p>
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
          
          {/* Footer with logos and page number */}
          <div className="absolute bottom-10 left-0 w-full px-10">
            <div className="flex justify-between items-center">
              <img 
                src={companyLogo} 
                alt="Logo Empresa" 
                className="h-8 object-contain" 
              />
              {data.clienteLogo && (
                <img 
                  src={data.clienteLogo} 
                  alt="Logo Cliente" 
                  className="h-8 object-contain" 
                />
              )}
            </div>
            <div className="text-right mt-2">
              <p className="text-xs text-gray-500">Página {currentPage + 1} de 64</p>
            </div>
          </div>
        </div>

        {/* Tercera página - Contenido de secciones 1-7 */}
        <div className="mb-12 max-w-[595px] mx-auto bg-white shadow-sm border min-h-[842px] relative p-10">
          {/* Sección 1 - OBJETO */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">1. OBJETO</h3>
            <p className="text-sm mt-2">
              El objeto de esta memoria es el de describir la instalación frigorífica dedicada a la conservación
              de productos perecederos en un supermercado, del que es su titular DINOSOL SUPERMERCADOS, S.L.,
              y que está situada en la localidad de Puerto de la Cruz (Santa Cruz de Tenerife), de modo que quede
              incorporada en el Registro de Instalaciones Frigoríficas del Gobierno de Canarias.
            </p>
          </div>

          {/* Sección 2 - ANTECEDENTES */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">2. ANTECEDENTES</h3>
            <p className="text-sm mt-2">
              No existen antecedentes administrativos de la instalación objeto de este proyecto y,
              por lo tanto, se tramitará como nueva instalación.
            </p>
          </div>

          {/* Sección 3 - TITULAR */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">3. TITULAR</h3>
            <div className="text-sm mt-2 space-y-1">
              <p><span className="font-medium">Titular:</span> {data.titular || "DINOSOL SUPERMERCADOS S.L."}</p>
              <p><span className="font-medium">CIF:</span> {data.nif || "B61742565"}</p>
              <p><span className="font-medium">Domicilio social:</span> Error! Not a valid link.</p>
            </div>
          </div>

          {/* Sección 4 - DOMICILIO A EFECTOS DE NOTIFICACIONES */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">4. DOMICILIO A EFECTOS DE NOTIFICACIONES</h3>
            <div className="text-sm mt-2 space-y-1">
              <p><span className="font-medium">Dirección:</span> C/ Luis Correa Medina, 9</p>
              <p>35013 LAS PALMAS DE GRAN CANARIA (LAS PALMAS)</p>
              <p><span className="font-medium">Teléfono:</span> 928303600</p>
            </div>
          </div>

          {/* Sección 5 - UBICACIÓN DE LA INSTALACIÓN */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">5. UBICACIÓN DE LA INSTALACIÓN</h3>
            <div className="text-sm mt-2 space-y-1">
              <p><span className="font-medium">Dirección:</span> {data.direccionInstalacion || "AVDA. BLAS PÉREZ GONZÁLEZ, 4"}</p>
              <p>{data.poblacionInstalacion || "PUERTO DE LA CRUZ"}</p>
              <p>{data.provinciaInstalacion || "SANTA CRUZ DE TENERIFE"}</p>
              <p><span className="font-medium">Teléfono:</span> 922443768</p>
              <p><span className="font-medium">Número de inscripción de la instalación:</span></p>
            </div>
          </div>

          {/* Sección 6 - EMPRESA INSTALADORA */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">6. EMPRESA INSTALADORA</h3>
            <div className="text-sm mt-2 space-y-1">
              <p><span className="font-medium">Nombre:</span> {data.instalador || "GESTÉCNICA INTEGRAL 10. S.L."}</p>
              <p><span className="font-medium">NIF:</span> B76501931</p>
              <p><span className="font-medium">Domicilio Social:</span> C/ ISAAC PERAL, Nº 3, NAVE 5</p>
              <p>38109</p>
              <p>EL ROSARIO,</p>
              <p>SANTA CRUZ DE TENERIFE</p>
              <p><span className="font-medium">Teléfono:</span> 922618202</p>
              <p><span className="font-medium">Email:</span> gestecnicaintegral10@gestecnicaintegral10.es</p>
              <p><span className="font-medium">N.º REIF:</span> 38020755</p>
            </div>
          </div>

          {/* Sección 7 - ACTIVIDAD */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">7. ACTIVIDAD</h3>
            <p className="text-sm mt-2">
              Supermercado para la venta al público de productos alimentarios perecederos, así como otros productos.
            </p>
          </div>

          {/* Footer with logos and page number */}
          <div className="absolute bottom-10 left-0 w-full px-10">
            <div className="flex justify-between items-center">
              <img 
                src={companyLogo} 
                alt="Logo Empresa" 
                className="h-8 object-contain" 
              />
              {data.clienteLogo && (
                <img 
                  src={data.clienteLogo} 
                  alt="Logo Cliente" 
                  className="h-8 object-contain" 
                />
              )}
            </div>
            <div className="text-right mt-2">
              <p className="text-xs text-gray-500">Página {currentPage + 2} de 64</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaPreview;
