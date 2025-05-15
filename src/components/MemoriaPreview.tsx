import React from "react";
import { Card } from "@/components/ui/card";
import MemoriaPreviewNormativa from "./MemoriaPreviewNormativa";

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
  // Use the correct COLDsulting logo
  const companyLogo = "/lovable-uploads/02dc6811-1655-4701-81f9-bad03d948d87.png";
  
  return (
    <div className="memoria-preview-container">
      {/* Portada */}
      <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
        {/* Content container with padding at bottom to prevent overlap with footer */}
        <div className="pb-20">
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
        </div>
      </div>
      
      {/* Segunda página - Índice */}
      <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
        {/* Content container with padding at bottom to prevent overlap with footer */}
        <div className="pb-20">
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
            <div className="flex justify-between">
              <p>10. DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA</p>
              <p>12</p>
            </div>
            <div className="flex justify-between">
              <p>14. INSTALACIÓN ELÉCTRICA</p>
              <p>15</p>
            </div>
            <div className="flex justify-between">
              <p>15. TUBERÍAS Y AISLAMIENTO</p>
              <p>16</p>
            </div>
            <div className="flex justify-between">
              <p>15.1. TUBERÍAS</p>
              <p>16</p>
            </div>
            <div className="flex justify-between">
              <p>15.2. SUPORTACIONES</p>
              <p>17</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tercera página - Contenido de secciones 1-7 */}
      <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
        {/* Content container with padding at bottom to prevent overlap with footer */}
        <div className="pb-20">
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
        </div>
      </div>

      {/* Cuarta página - NORMATIVA DE APLICACIÓN */}
      <MemoriaPreviewNormativa 
        data={data}
      />
      
      {/* Quinta página - Sección 9: CLASIFICACIÓN DE LA INSTALACIÓN */}
      <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
        {/* Content container with padding at bottom to prevent overlap with footer */}
        <div className="pb-20">
          {/* Sección 9 - CLASIFICACIÓN DE LA INSTALACIÓN */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">9. CLASIFICACIÓN DE LA INSTALACIÓN</h3>
            
            {/* Sección 9.1 - CLASIFICACIÓN DEL SISTEMA */}
            <div className="mt-4 mb-6">
              <h4 className="text-base font-bold">9.1. CLASIFICACIÓN DEL SISTEMA</h4>
              <p className="text-sm mt-2">
                Según lo especificado en el Artículo 6 del Capítulo II del Reglamento de Seguridad de Instalaciones 
                Frigoríficas (RSIF), existen dos grupos de clasificación:
              </p>
              
              <div className="mt-3 text-sm">
                <p className="font-medium">1.- Atendiendo al método de extracción de calor (enfriamiento) o cesión de calor (calentamiento) a la atmósfera o al medio a tratar:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Sistemas directos:</span> cuando el evaporador o el condensador del sistema 
                    de refrigeración está en contacto directo con el medio que se enfría o calienta.
                  </li>
                  <li>
                    <span className="font-medium">Sistemas indirectos:</span> cuando el evaporador o el condensador del sistema 
                    de refrigeración, situado fuera del local en donde se extrae o cede calor al medio a tratar, enfría o 
                    calienta un fluido secundario que se hace circular por unos intercambiadores para enfriar o calentar el medio citado.
                  </li>
                </ul>
              </div>
              
              <div className="mt-4 text-sm">
                <p className="font-medium">2.- Atendiendo a criterios de seguridad, los sistemas de refrigeración se clasifican en los siguientes tipos, según cuál sea su emplazamiento:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Tipo 1:</span> Sistema de refrigeración con todas las partes que contengan 
                    refrigerante situadas en un espacio ocupado por personas.
                  </li>
                  <li>
                    <span className="font-medium">Tipo 2:</span> Sistema de refrigeración con los compresores, recipientes y 
                    condensadores situados en una sala de máquinas no ocupada por personas o al aire libre. Los enfriadores, 
                    las tuberías y las válvulas pueden estar situados en espacios ocupados por personas.
                  </li>
                  <li>
                    <span className="font-medium">Tipo 3:</span> Sistema de refrigeración con todas las partes que contienen 
                    refrigerante situado en una sala de máquinas no ocupada por personas o al aire libre.
                  </li>
                  <li>
                    <span className="font-medium">Tipo 4:</span> Sistema de refrigeración en el que todas las partes que contienen 
                    refrigerante están situadas en el interior de una envolvente ventilada.
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 text-sm border-t pt-4">
                <p className="font-medium">En esta instalación, la clasificación en función de los dos grupos es:</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <p className="font-medium">Atendiendo al método de enfriamiento:</p>
                  </div>
                  <div>
                    <p>{data.metodoEnfriamiento || "Sistema directo"}</p>
                  </div>
                  <div>
                    <p className="font-medium">Atendiendo a los criterios de seguridad del sistema:</p>
                  </div>
                  <div>
                    <p>{data.seguridadSistema || "Tipo 2"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sección 9.2 - CLASIFICACIÓN DEL LOCAL */}
            <div className="mt-4 mb-6">
              <h4 className="text-base font-bold">9.2. CLASIFICACIÓN DEL LOCAL</h4>
              <p className="text-sm mt-2">
                Los locales están clasificados según el acceso público y la seguridad de las personas, según lo establecido en la IF-01 del R.S.I.F.
              </p>
              
              <div className="mt-3 text-sm">
                <p className="font-medium">Categorías:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Categoría A:</span> Locales, no abiertos habitualmente al público donde:
                    <ul className="list-[circle] pl-6 mt-1 space-y-1">
                      <li>Sólo tienen acceso personas autorizadas que conocen las medidas de seguridad generales del establecimiento.</li>
                      <li>Se fabrican, procesan o almacenan productos.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-medium">Categoría B:</span> Locales, zonas o edificios abiertos al público, donde:
                    <ul className="list-[circle] pl-6 mt-1 space-y-1">
                      <li>Se permite que las personas pernocten.</li>
                      <li>Los movimientos son restringidos.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-medium">Categoría C:</span> Locales, zonas o edificios abiertos al público, donde:
                    <ul className="list-[circle] pl-6 mt-1 space-y-1">
                      <li>Se permite que las personas permanezcan.</li>
                      <li>Un número significativo de personas tienen libertad de movimiento.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-medium">Categoría D:</span> Locales, zonas o edificios abiertos al público, donde:
                    <ul className="list-[circle] pl-6 mt-1 space-y-1">
                      <li>Se permite que las personas accedan con libertad de movimiento.</li>
                      <li>Las personas no pueden evacuar por sí mismas sin ayuda.</li>
                    </ul>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 text-sm border-t pt-4">
                <p className="font-medium">En esta instalación, la clasificación del local es:</p>
                <div className="mt-2">
                  <p><span className="font-medium">Categoría del local:</span> {data.categoriaLocal || "Categoría A"}</p>
                </div>
              </div>
            </div>
            
            {/* Sección 9.3 - CLASIFICACIÓN DEL GAS REFRIGERANTE */}
            <div className="mt-4 mb-6">
              <h4 className="text-base font-bold">9.3. CLASIFICACIÓN DEL GAS REFRIGERANTE</h4>
              <p className="text-sm mt-2">
                Según el apartado 4 de la IF-02 del RSIF, los refrigerantes se clasifican según el grado de seguridad
                en función de su inflamabilidad y toxicidad, dentro de los siguientes grupos:
              </p>
              
              <div className="mt-3 text-sm">
                <p className="font-medium">INFLAMABILIDAD</p>
                <p className="mt-1">
                  Los refrigerantes deberán incluirse dentro de una de las tres categorías, 1, 2 y 3 basándose en lo siguiente:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Categoría 1:</span> Refrigerantes que no muestran propagación de llama cuando se ensayan a +60ºC y 101,3 kPa
                  </li>
                  <li>
                    <span className="font-medium">Categoría 2:</span> Refrigerantes que cumplan las tres condiciones siguientes: Muestran propagación de llama cuando se ensayan a +60 °C y 101,3 kPa; tienen un límite inferior de inflamabilidad, cuando forman una mezcla con el aire, igual o superior al 3,5% en volumen (V/V); y tienen un calor de combustión menor de 19.000 kJ/kg.
                    <p className="mt-1">
                      Dentro de este grupo la norma ISO 817 ha introducido el criterio de la disminución de riesgo a causa de la baja velocidad de propagación de la llama de ciertas sustancias, estableciendo la Categoría 2L, el cual además de satisfacer las tres condiciones anteriores presenta una velocidad de propagación de la llama inferior a 10 cm/s.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Categoría 3:</span> Refrigerantes que cumplan las tres condiciones siguientes: Muestran propagación de llama cuando se ensayan a +60 °C y 101,3 kPa; tienen un límite inferior de inflamabilidad, cuando forman una mezcla con el aire, Inferior al 3,5% en volumen (V/V); y tienen un calor de combustión mayor o igual a 19.000 kJ/kg.
                  </li>
                </ul>
              </div>
              
              <div className="mt-4 text-sm">
                <p className="font-medium">TOXICIDAD</p>
                <p className="mt-1">
                  Los refrigerantes deberán incluirse dentro de una de las categorías A y B basándose en su toxicidad:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Categoría A:</span> Refrigerantes cuya concentración media en el tiempo no tiene efectos adversos para la mayoría de los trabajadores que pueden estar expuestos al refrigerante durante una jornada laboral de 8 horas diarias y 40 horas semanales y cuyo valor es igual o superior a una concentración media de 400 ml/m³ [400 ppm. (V/V)].
                  </li>
                  <li>
                    <span className="font-medium">Categoría B:</span> Refrigerantes cuya concentración media en el tiempo no tiene efectos adversos para la mayoría de los trabajadores que puedan estar expuestos al refrigerante durante una jornada laboral de 8 horas diarias y 40 horas semanales y cuyo valor es inferior a una concentración media de 400 ml/m³ [400 ppm. (V/V)].
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 text-sm border-t pt-4">
                <p className="font-medium">En esta instalación, los datos del refrigerante utilizado son:</p>
                <div className="mt-3 space-y-2">
                  <p><span className="font-medium">Refrigerante:</span> {data.refrigerante || "R-434A"}</p>
                  <p><span className="font-medium">Composición:</span> {data.composicionRefrigerante || "(63,2% R-125 / 18% R-143a / 16% R-134a / 2,8% R-600a)"}</p>
                  <p><span className="font-medium">Clasificación en función de su inflamabilidad:</span> {data.inflamabilidad || "Grupo 1"}</p>
                  <p><span className="font-medium">Clasificación en función de su toxicidad:</span> {data.toxicidad || "Grupo A"}</p>
                  <p><span className="font-medium">Grupo de seguridad:</span> {data.grupoSeguridad || "A1"}</p>
                  <p><span className="font-medium">Clasificación según Reglamento Equipos a Presión:</span> {data.directivaEquipos || "2"}</p>
                  <p><span className="font-medium">Potencial de Calentamiento Atmosférico (PCA):</span> {data.pca || "3245"}</p>
                  <p><span className="font-medium">Potencial de Agotamiento de la capa de Ozono (PAO):</span> {data.agotamientoOzono || "0"}</p>
                  <p><span className="font-medium">Límite Práctico (kg/m³):</span> {data.limitePractico || "0.32 kg/m³"}</p>
                  <p><span className="font-medium">ATEL/ODL (kg/m³):</span> {data.atelOdl || "0.32 kg/m³"}</p>
                  <p><span className="font-medium">Límite Inferior de Inflamabilidad:</span> {data.limiteInflamabilidad || "NF"}</p>
                  <p><span className="font-medium">Temperatura de autoignición:</span> {data.temperaturaAutoignicion || "ND"}</p>
                  <p><span className="font-medium">Gas Fluorado:</span> {data.gasFluorado || "SI"}</p>
                </div>
              </div>
            </div>

            {/* Sección 9.4 - CLASIFICACIÓN DE LA INSTALACIÓN */}
            <div className="mt-4 mb-6">
              <h4 className="text-base font-bold">9.4. CLASIFICACIÓN DE LA INSTALACIÓN</h4>
              <p className="text-sm mt-2">
                Según lo especificado en el Artículo 8 del Capítulo II del Reglamento de Seguridad de Instalaciones Frigoríficas (RSIF), las instalaciones frigoríficas se clasifican en función del riesgo potencial en las categorías siguientes:
              </p>
              
              <div className="mt-3 text-sm">
                <p className="font-medium">Nivel 1.</p>
                <p className="mt-1 text-justify">
                  Instalaciones formadas por uno o varios sistemas frigoríficos independientes entre sí con una potencia eléctrica instalada en los compresores por cada sistema inferior o igual a 30 kW siempre que la suma total de las potencias eléctricas instaladas en los compresores frigoríficos, de todos los sistemas, no exceda de 100 kW, o por equipos o sistemas compactos de cualquier potencia, con condensador incorporado (no remoto), siempre que se trate de unidades enfriadoras de agua, de fluidos secundarios, bombas de calor, o que formen parte de las mismas y que en ambos casos utilicen refrigerantes de alta seguridad (L1), y que no refrigeren cámaras de atmósfera artificial de cualquier volumen, o conjuntos de las mismas.
                </p>
              </div>
              
              <div className="mt-3 text-sm">
                <p className="font-medium">Nivel 2.</p>
                <p className="mt-1 text-justify">
                  Instalaciones formadas por uno o varios sistemas frigoríficos independientes entre sí con una potencia eléctrica instalada en los compresores superior a 30 kW en alguno de los sistemas, o que la suma total de las potencias eléctricas instaladas en los compresores frigoríficos exceda de 100 kW, o que enfríen cámaras de atmósfera artificial, o que utilicen refrigerantes de media y baja seguridad (L2 y L3).
                </p>
              </div>
              
              <div className="mt-3 text-sm">
                <p className="mt-1 text-justify">
                  Diferentes sistemas de refrigeración configuran la misma instalación frigorífica cuando tienen en común alguno de los siguientes elementos o componentes:
                </p>
                <ul className="list-[lower-latin] pl-8 mt-2 space-y-1">
                  <li>Equipos ubicados en una misma sala de máquinas o que atienden a un mismo espacio, como cámaras frigoríficas, salas de proceso, etc.</li>
                  <li>Circuito de condensación</li>
                </ul>
              </div>
            </div>
            
            {/* Sección 9.5 - SALA DE MÁQUINAS */}
            <div className="mt-4 mb-6">
              <h4 className="text-base font-bold">9.5. SALA DE MÁQUINAS</h4>
              <p className="text-sm mt-2">
                Atendiendo la definición que da el Reglamento de Seguridad de Instalaciones Frigoríficas (RSIF), en el apartado 3.2 de su instrucción IF-01, (terminología):
              </p>
              
              <div className="mt-3 text-sm">
                <p className="font-medium">Sala de Máquinas</p>
                <p className="mt-1 text-justify">
                  Espacio o recinto cerrado, ventilado por ventilación mecánica, sellado y aislado respecto a las zonas públicas y no accesible al público, destinado a la instalación de componentes del sistema de refrigeración o del sistema completo. Pueden instalarse otros equipos si son compatibles con los requisitos de seguridad del sistema de refrigeración. No tendrá consideración de espacio, local o recinto habitado a los efectos de establecer la carga máxima de refrigerante en la instalación frigorífica.
                </p>
              </div>
              
              <div className="mt-3 text-sm">
                <p className="font-medium">Sala de Máquinas Específica</p>
                <p className="mt-1 text-justify">
                  Sala de máquinas prevista exclusivamente para la instalación de componentes, consumibles y herramientas necesarias para partes de los sistemas de refrigeración o de los sistemas completos. Es accesible solamente a personal autorizado para necesidades de mantenimiento y reparación.
                </p>
              </div>
              
              <div className="mt-3 text-sm">
                <p className="mt-1 text-justify">
                  Ambas centrales frigoríficas se encuentran ubicadas en una sala de máquinas no específica. Por lo tanto, la presente instalación dispone de sala de máquinas.
                </p>
              </div>
            </div>
            
            {/* Sección 9.6 - RESUMEN */}
            <div className="mt-4 mb-6">
              <h4 className="text-base font-bold">9.6. RESUMEN</h4>
              <div className="mt-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-medium">Clasificación sistema:</p>
                  <p>{data.metodoEnfriamiento || "Sistema directo"}</p>
                  <p className="font-medium">Tipo:</p>
                  <p>{data.seguridadSistema || "Tipo 2"}</p>
                  <p className="font-medium">Clasificación del local:</p>
                  <p>{data.categoriaLocal || "Categoría A"}</p>
                  <p className="font-medium">Clasificación Refrigerante:</p>
                  <p>{data.grupoSeguridad || "A1"}</p>
                  <p className="font-medium">Clasificación Instalación:</p>
                  <p>{data.nivelInstalacion || "Nivel 1"}</p>
                  <p className="font-medium">Sala de Máquinas:</p>
                  <p>Específica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sexta página - Sección 10: DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA */}
      <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
        {/* Content container with padding at bottom to prevent overlap with footer */}
        <div className="pb-20">
          {/* Sección 10 - DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">10. DESCRIPCIÓN DE LA INSTALACIÓN FRIGORÍFICA</h3>
            
            <div className="mt-4 text-sm text-justify">
              <p className="whitespace-pre-line">{data.descripcionInstalacion}</p>
            </div>
          </div>
        </div>

        {/* Footer with logos and page number */}
        <div className="absolute bottom-6 left-0 w-full px-6">
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
            <p className="text-xs text-gray-500">Página {currentPage + 5} de 64</p>
          </div>
        </div>
      </div>

      {/* Séptima página - Sección 14: INSTALACIÓN ELÉCTRICA */}
      <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
        {/* Content container with padding at bottom to prevent overlap with footer */}
        <div className="pb-20">
          {/* Sección 14 - INSTALACIÓN ELÉCTRICA */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">14. INSTALACIÓN ELÉCTRICA</h3>
            
            <div className="mt-4 text-sm text-justify">
              <p className="mb-3">
                Las líneas eléctricas de potencia que parten del panel de control están constituidas por cable debidamente seleccionado, según la intensidad eléctrica que tenga que circular por ellos, la distancia, la temperatura ambiente y la tensión de alimentación de 400 V III, siendo las máximas caídas de tensión admitidas:
              </p>

              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>6% máximo total en las líneas de alimentación a los motores eléctricos.</li>
                <li>4% máximo total en las líneas de control.</li>
              </ul>
              
              <p className="mb-3">Características principales de la instalación eléctrica:</p>
              
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Los cables están posicionados en las canales portacables a una distancia regular y oportunamente fijados. Los cables están adecuadamente protegidos y anclados entre el canal portacables y el elemento a conexionar.</li>
                <li>Los pasajes en las paredes (pasamuros) están sellados adecuadamente. Cuando de forma puntual los pasajes sean a través de las paredes frías, estos serán herméticamente cerrados y sucesivamente aislados con poliuretano expandido para evitar al máximo las transmisiones térmicas y los fenómenos de condensación.</li>
                <li>Canalización mediante bandeja metálica.</li>
              </ul>
              
              <p className="mb-4">
                Todos los circuitos eléctricos disponen de su conductor de protección correspondiente, los cuales confluyen en placa de cobre del cuadro correspondiente desde donde se conectará a la red de tierra general de la instalación. 
              </p>

              <p className="mb-4">
                Los circuitos eléctricos de alimentación de los sistemas frigoríficos se instalan de forma que la corriente se establezca o interrumpa independientemente de la alimentación de otras partes de la instalación, en especial, de la red de alumbrado (normal y de emergencia), dispositivos de ventilación y sistemas de alarma.
              </p>
              
              <p className="mb-3">
                A efectos de lo dispuesto por el Reglamento Electrotécnico para Baja Tensión, y sus Instrucciones técnicas complementarias MIE-BT 029 y MIE-BT 030, se considerarán:
              </p>
              
              <p className="mb-2">Locales húmedos: Las cámaras y antecámaras frigoríficas.</p>
              
              <p className="mb-2">Locales mojados: La fabricación de hielo en tanques de salmuera y sus cámaras y antecámaras frigoríficas, salas de condensadores (excepto los condensadores enfriados por aire o por agua en circuitos cerrados) y torres de refrigeración.</p>
              
              <p className="mb-3">Locales con riesgo de explosión o incendio: locales con instalaciones que utilicen refrigerantes inflamables pertenecientes a los grupos L2 o L3, salvo con el refrigerante amoníaco según lo dispuesto en el apartado 3.4 de esta instrucción.</p>
              
              <p className="mb-4">Por lo que las cámaras frigoríficas descritas en esta memoria se consideran locales húmedos.</p>
              
              <p className="mb-4">
                Además de lo indicado anteriormente, para las instalaciones con cámaras a una temperatura inferior a -20ºC (cámaras negativas), se ha aplicado lo que exige al respecto el REBT y el apartado 6 de la Instrucción técnica complementaria BT-30.
              </p>
            </div>
          </div>
        </div>

        {/* Footer with logos and page number */}
        <div className="absolute bottom-6 left-0 w-full px-6">
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
            <p className="text-xs text-gray-500">Página {currentPage + 6} de 64</p>
          </div>
        </div>
      </div>

      {/* Octava página - Sección 15: TUBERÍAS Y AISLAMIENTO */}
      <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
        {/* Content container with padding at bottom to prevent overlap with footer */}
        <div className="pb-20">
          {/* Sección 15 - TUBERÍAS Y AISLAMIENTO */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">15. TUBERÍAS Y AISLAMIENTO</h3>
            
            {/* Subsección 15.1 - TUBERÍAS */}
            <div className="mt-4 mb-6">
              <h4 className="text-base font-bold">15.1. TUBERÍAS</h4>
              <div className="mt-3 text-sm text-justify">
                <p className="mb-3">
                  Se ha instalado la tubería de interconexión necesaria entre las centrales y los demás componentes de la instalación. 
                  El material utilizado ha sido cobre deshidratado, de calidad frigorífica, cumpliendo siempre la normativa vigente, en especial las normas UNE-EN 12735-1 y UNE-EN 14276-2.
                </p>
                
                <p className="mb-3">
                  Toda la red de tuberías está clasificada como artículo 4.3 según la Directiva de Equipos a Presión (2014/68/UE), y ha sido realizada siguiendo las "buenas prácticas de Ingeniería".
                </p>
                
                <p className="mb-4">
                  Todo el trazado de tuberías se ha diseñado siguiendo los criterios técnicos que minimicen las pérdidas de carga y, por lo tanto, el consumo eléctrico, 
                  garantizando a la vez el retorno de aceite al compresor, con especial cuidado en los tramos verticales generales, en los que se han diseñado dobles montantes 
                  para garantizar velocidades mínimas a cargas parciales.
                </p>
                
                <div className="mt-4 mb-4">
                  <table className="border-collapse border border-gray-300 w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Tipo</th>
                        <th className="border border-gray-300 p-2">Velocidad</th>
                        <th className="border border-gray-300 p-2">Pérdida de Carga máxima</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">Aspiración</td>
                        <td className="border border-gray-300 p-2">5 - 10 m/s</td>
                        <td className="border border-gray-300 p-2">1,5 K</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Líquido</td>
                        <td className="border border-gray-300 p-2">0,5 – 1,0 m/s</td>
                        <td className="border border-gray-300 p-2">0,5 K</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Caída Líquido</td>
                        <td className="border border-gray-300 p-2">0,2 – 0,4 m/s</td>
                        <td className="border border-gray-300 p-2">0,2 K</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Descarga</td>
                        <td className="border border-gray-300 p-2">5 - 10 m/s</td>
                        <td className="border border-gray-300 p-2">1,0 K</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with logos and page number */}
        <div className="absolute bottom-6 left-0 w-full px-6">
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
            <p className="text-xs text-gray-500">Página {currentPage + 7} de 64</p>
          </div>
        </div>
      </div>

      {/* Novena página - Sección 15.2: SUPORTACIONES */}
      <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
        {/* Content container with padding at bottom to prevent overlap with footer */}
        <div className="pb-20">
          {/* Sección 15.2 - SUPORTACIONES */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">15.2. SUPORTACIONES</h3>
            
            <div className="mt-4 text-sm text-justify space-y-4">
              <p>
                La suportación se ejecuta mediante abrazaderas isofónicas con aislamiento de poliuretano en el caso de todas las tuberías 
                que deban estar aisladas (todas excepto las de alta presión), cuyos diámetros estarán en función del diámetro de la tubería, 
                sobre carrilería metálica atirantada a pared o techo mediante varillas roscadas de 8 mm.
              </p>
              
              <p>
                Las distancias entre soportes estarán en función de los diámetros, pero como norma general no deberán superar los 1,20 m. 
                de distancia entre ellos, debiendo tomar especial atención en los cambios de dirección y previo a conexiones de electroválvulas 
                o válvulas de expansión electrónica.
              </p>
              
              {/* Imágenes en fila */}
              <div className="flex flex-wrap gap-6 my-6 justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex gap-2">
                    <img 
                      src="/lovable-uploads/bd0b74cf-e6fa-4123-8859-2e040a1ccbda.png" 
                      alt="Soporte Armafix FX" 
                      className="h-28 object-contain" 
                    />
                    <img 
                      src="/lovable-uploads/7ffbf5d1-4c03-4acd-b3e6-6723757afd6a.png" 
                      alt="Abrazadera" 
                      className="h-28 object-contain" 
                    />
                  </div>
                  <p className="text-xs text-center mt-2">Soportes Armafix FX + Abrazadera</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <img 
                    src="/lovable-uploads/0611d646-3b17-47f2-b823-4f90dd7b7e72.png" 
                    alt="Antivibradores metálicos" 
                    className="h-28 object-contain" 
                  />
                  <p className="text-xs text-center mt-2">Ejemplo antivibradores metálicos</p>
                </div>
              </div>
              
              {/* Imagen del croquis - Actualizado con la nueva imagen */}
              <div className="flex flex-col items-center my-6">
                <img 
                  src="/lovable-uploads/c9b531ec-42e4-48b7-aa8e-a48641c85444.png" 
                  alt="Croquis suportación techo" 
                  className="max-w-full h-auto object-contain" 
                />
                <p className="text-xs text-center mt-2">Croquis suportación techo</p>
              </div>
              
              <p>
                Los pasos de tuberías a través de paredes y paneles deberán protegerse mediante lámina de polietileno o material equivalente, 
                para evitar el desgaste del aislamiento contra las chapas de los paneles frigoríficos de las cámaras. 
                Así mismo, estos pasos deberán quedar perfectamente sellados mediante inyección de poliuretano para evitar pérdidas no deseables por transmisión.
              </p>
              
              <p>
                Las tuberías se soportan adecuadamente de acuerdo con su tamaño y peso en servicio, con una separación máxima entre soportes según se muestra en la siguiente tabla:
              </p>
              
              {/* Tabla de diámetros y separaciones */}
              <div className="mt-4 mb-4">
                <table className="border-collapse border border-gray-300 w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Diámetro exterior mm (nota)</th>
                      <th className="border border-gray-300 p-2">Separación (m)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">15 a 22 recocido</td>
                      <td className="border border-gray-300 p-2 text-center">2</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">22 a &lt; 54 semiendurecido</td>
                      <td className="border border-gray-300 p-2 text-center">3</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">54 a 56 semiendurecido</td>
                      <td className="border border-gray-300 p-2 text-center">4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p>
                El espacio libre alrededor de la tubería es el suficiente para permitir los trabajos rutinarios de mantenimiento de los componentes, 
                verificación de uniones de las tuberías y reparación de fugas.
              </p>
            </div>
          </div>
        </div>

        {/* Footer with logos and page number */}
        <div className="absolute bottom-6 left-0 w-full px-6">
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
            <p className="text-xs text-gray-500">Página {currentPage + 8} de 64</p>
          </div>
        </div>
      </div>

      {/* Décima página - Sección 18: PROTECCIÓN CONTRA SOBREPRESIONES */}
      <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
        {/* Content container with padding at bottom to prevent overlap with footer */}
        <div className="pb-20">
          {/* Sección 18 - PROTECCIÓN CONTRA SOBREPRESIONES */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">18. PROTECCIÓN CONTRA SOBREPRESIONES</h3>
            
            {/* Subsección 18.1 - VÁLVULAS DE SEGURIDAD */}
            <div className="mt-4 mb-6">
              <h4 className="text-base font-bold">18.1. VÁLVULAS DE SEGURIDAD</h4>
              <div className="mt-3 text-sm text-justify">
                <p className="mb-3">
                  Los recipientes que puedan contener refrigerante líquido en condiciones normales de funcionamiento y puedan ser 
                  independizados de otras partes del sistema de refrigeración, excepto aquellos cuyo diámetro interior sea inferior a 152 mm, 
                  deberán estar protegidos mediante un dispositivo de alivio (por ejemplo, válvula de seguridad).
                </p>
                
                <p className="font-medium mb-3">Equipos con Volumen bruto &lt; 100 dm³</p>
                
                <p className="mb-3">
                  Los equipos a presión con un volumen interior bruto inferior a 100 dm³ deberán tener, como mínimo, 
                  un dispositivo de alivio, bien descargando al sector de baja (véase el apartado 3.4.1.4. del RSIF), 
                  o a un recipiente receptor independiente o a la atmósfera.
                </p>
                
                <p className="mb-3">
                  La capacidad mínima de descarga del dispositivo de alivio requerida por un depósito a presión deberá 
                  ser determinada por la ecuación:
                </p>
                
                {/* Fórmula matemática con estilos para mejorar aspecto */}
                <div className="flex justify-center my-4">
                  <div className="bg-gray-100 px-6 py-3 rounded-md shadow-sm text-lg">
                    <span>Q<sub>m</sub> = </span>
                    <span className="inline-flex flex-col items-center mx-1">
                      <span className="border-b border-black">δ × A</span>
                      <span>h<sub>vap</sub></span>
                    </span>
                    <span> × 3600</span>
                  </div>
                </div>
                
                <p className="mb-2">En dónde:</p>
                <div className="space-y-2 pl-6">
                  <p>
                    <span className="font-medium">Q<sub>m</sub></span>: capacidad mínima de descarga requerida del dispositivo de alivio en kilogramos de refrigerante por hora
                  </p>
                  <p>
                    <span className="font-medium">ϕ</span>: densidad de flujo térmico establecido en 10 kW/m²
                  </p>
                  <p>
                    <span className="font-medium">A</span>: superficie exterior del recipiente en metros cuadrados
                  </p>
                  <p>
                    <span className="font-medium">h<sub>vap</sub></span>: calor latente específico de evaporación del refrigerante, en kilojulios por kilogramo, 
                    calculado a una presión de 1,1 veces la presión de tarado del dispositivo
                  </p>
                </div>
                
                <p className="mt-4 mb-3">
                  El cálculo para dimensionar los dispositivos de alivio de presión y sus tuberías de conexión se realizará 
                  conforme a la Norma UNE-EN 13136:2014+A1:2019 "Sistemas de refrigeración y bombas de calor. Dispositivos de alivio 
                  de presión y sus tuberías de conexión. Métodos de Cálculo".
                </p>
                
                <div className="mt-6 mb-4">
                  <h5 className="font-bold mb-3">Recipiente de Líquido Central Positiva</h5>
                  <table className="border-collapse border border-gray-300 w-full">
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Refrigerante:</td>
                        <td className="border border-gray-300 p-2">R-448A</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Longitud recipiente:</td>
                        <td className="border border-gray-300 p-2">1,588 m</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Diámetro recipiente:</td>
                        <td className="border border-gray-300 p-2">0,159 m</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Volumen interno:</td>
                        <td className="border border-gray-300 p-2">29 dm³</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Superficie exterior calculada:</td>
                        <td className="border border-gray-300 p-2">0,83 m²</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Presión tarado válvula seguridad:</td>
                        <td className="border border-gray-300 p-2">27,5 bar</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Calor latente a P = 1,1 x 27,5 + 1= 31,25 bar:</td>
                        <td className="border border-gray-300 p-2">110,22 kJ/kg</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Capacidad mínima descarga unitaria:</td>
                        <td className="border border-gray-300 p-2">271,1 kg/h</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">N.º de válvulas sencillas instaladas:</td>
                        <td className="border border-gray-300 p-2">1</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Válvula de seguridad:</td>
                        <td className="border border-gray-300 p-2">FAVRE VSR-11</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Capacidad descarga válvula seleccionada:</td>
                        <td className="border border-gray-300 p-2">725 kg/h &gt; Capacidad mínima</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 font-medium">Capacidad descarga ajustada:</td>
                        <td className="border border-gray-300 p-2">580 kg/h</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with logos and page number */}
        <div className="absolute bottom-6 left-0 w-full px-6">
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
            <p className="text-xs text-gray-500">Página {currentPage + 9} de 64</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaPreview;
