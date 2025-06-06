
import React from "react";

interface MemoriaSecciones1a9Props {
  data: {
    titular?: string;
    nif?: string;
    direccion?: string;
    poblacion?: string;
    provincia?: string;
    cp?: string;
    direccionInstalacion?: string;
    poblacionInstalacion?: string;
    cpInstalacion?: string;
    provinciaInstalacion?: string;
    instalador?: string;
    tipoInstalacion?: string;
    nombreProyecto?: string;
    
    // Datos para notificaciones
    direccionNotif?: string;
    poblacionNotif?: string;
    provinciaNotif?: string;
    cpNotif?: string;
    telefonoNotif?: string;
    
    // Teléfonos
    telefono?: string;
    telefonoInstalacion?: string;
  };
}

const MemoriaSecciones1a9: React.FC<MemoriaSecciones1a9Props> = ({ data }) => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Sección 1 - OBJETO */}
        <div className="mb-6">
          <h3 className="text-lg font-bold" data-heading="&&1. OBJETO">1. OBJETO</h3>
          <p className="text-sm mt-2 text-justify">
            El objeto de este proyecto es el de describir la instalación frigorífica dedicada a la conservación
            de productos perecederos en un {data.tipoInstalacion || "supermercado"}, del que es su titular {data.titular || "DINOSOL SUPERMERCADOS, S.L."},
            y que está situada en la localidad de {data.nombreProyecto || "Costa del Silencio (Arona)"}, de modo que quede
            incorporada en el Registro de Instalaciones Frigoríficas del Gobierno de Canarias.
          </p>
        </div>

        {/* Sección 2 - ALCANCE */}
        <div className="mb-6">
          <h3 className="text-lg font-bold" data-heading="&&2. ALCANCE">2. ALCANCE</h3>
          <p className="text-sm mt-2 text-justify">
            Queda fuera del alcance de este proyecto las instalaciones de que dispone la industria y que
            intervienen de forma directa o indirecta en el funcionamiento de los equipos objeto de este proyecto,
            de las cuales las más importantes son:
          </p>
          <ul className="text-sm mt-2 list-disc pl-6">
            <li>Instalaciones de alta y baja tensión.</li>
            <li>Instalaciones de climatización (ámbito RITE)</li>
          </ul>
        </div>

        {/* Sección 3 - ANTECEDENTES */}
        <div className="mb-6">
          <h3 className="text-lg font-bold" data-heading="&&3. ANTECEDENTES">3. ANTECEDENTES</h3>
          <p className="text-sm mt-2 text-justify">
            No existen antecedentes administrativos de la instalación objeto de este proyecto y,
            por lo tanto, se tramitará como nueva instalación.
          </p>
        </div>

        {/* Sección 4 - TITULAR */}
        <div className="mb-6">
          <h3 className="text-lg font-bold" data-heading="&&4. TITULAR">4. TITULAR</h3>
          <div className="text-sm mt-2">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Titular:</td>
                  <td>{data.titular || "DINOSOL SUPERMERCADOS, S.L."}</td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">CIF:</td>
                  <td>{data.nif || "B61742565"}</td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Domicilio social:</td>
                  <td>
                    <div>{data.direccion || "Carretera del Rincón, s/n, 4ª Planta"}</div>
                    <div>Edif. Anexo C.C. Las Arenas</div>
                    <div>{data.cp || "35010"} {data.poblacion || "LAS PALMAS DE GRAN CANARIA"} ({data.provincia || "LAS PALMAS"})</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección 5 - DOMICILIO A EFECTOS DE NOTIFICACIONES */}
        <div className="mb-6">
          <h3 className="text-lg font-bold" data-heading="&&5. DOMICILIO A EFECTOS DE NOTIFICACIONES">5. DOMICILIO A EFECTOS DE NOTIFICACIONES</h3>
          <div className="text-sm mt-2">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Dirección:</td>
                  <td>
                    <div>{data.direccionNotif || "C/ Luis Correa Medina, 9"}</div>
                    <div>{data.cpNotif || "35013"} {data.poblacionNotif || "LAS PALMAS DE GRAN CANARIA"} ({data.provinciaNotif || "LAS PALMAS"})</div>
                  </td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Teléfono:</td>
                  <td>{data.telefonoNotif || "928303600"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección 6 - UBICACIÓN DE LA INSTALACIÓN */}
        <div className="mb-6">
          <h3 className="text-lg font-bold" data-heading="&&6. UBICACIÓN DE LA INSTALACIÓN">6. UBICACIÓN DE LA INSTALACIÓN</h3>
          <div className="text-sm mt-2">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Dirección:</td>
                  <td>
                    <div>{data.direccionInstalacion || "Avda. José Antonio Tavío, 2"}</div>
                    <div>Costa del Silencio</div>
                    <div>{data.cpInstalacion || "38630"} {data.poblacionInstalacion || "ARONA"} ({data.provinciaInstalacion || "SANTA CRUZ DE TENERIFE"})</div>
                  </td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Teléfono:</td>
                  <td>{data.telefonoInstalacion || "666666666"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección 7 - TÉCNICO AUTOR DEL PROYECTO */}
        <div className="mb-6">
          <h3 className="text-lg font-bold" data-heading="&&7. TÉCNICO AUTOR DEL PROYECTO">7. TÉCNICO AUTOR DEL PROYECTO</h3>
          <div className="text-sm mt-2">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Ingeniero:</td>
                  <td>JUAN MUNNÉ MANSÓ</td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">DNI:</td>
                  <td>52405996C</td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">N.º de colegiado:</td>
                  <td>24.033</td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Colegio:</td>
                  <td>Colegio de Ingenieros Técnicos Industriales de Barcelona (CETIB)</td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Domicilio profes.:</td>
                  <td>
                    <div>C/ Pablo Iglesias, 63, Planta 1ª, Local 13</div>
                    <div>Pol. Ind. Pla d'en Boet</div>
                    <div>08302 MATARÓ (BARCELONA)</div>
                  </td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Teléfono:</td>
                  <td>649341169</td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Email:</td>
                  <td>jmunne@coldsulting.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección 8 - EMPRESA INSTALADORA */}
        <div className="mb-6">
          <h3 className="text-lg font-bold" data-heading="&&8. EMPRESA INSTALADORA">8. EMPRESA INSTALADORA</h3>
          <div className="text-sm mt-2">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Nombre:</td>
                  <td>{data.instalador || "GESTÉCNICA INTEGRAL 10, S.L."}</td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">NIF:</td>
                  <td>B76501931</td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Domicilio Social:</td>
                  <td>
                    <div>C/ Isaac Peral, 3, Nave 5</div>
                    <div>38109 EL ROSARIO (SANTA CRUZ DE TENERIFE)</div>
                  </td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Teléfono:</td>
                  <td>922618202</td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">Email:</td>
                  <td>gestecnicaintegral10@gestecnicaintegral10.es</td>
                </tr>
                <tr>
                  <td className="pr-4 align-top whitespace-nowrap">N.º REIF:</td>
                  <td>38020755</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección 9 - ACTIVIDAD */}
        <div className="mb-6">
          <h3 className="text-lg font-bold" data-heading="&&9. ACTIVIDAD">9. ACTIVIDAD</h3>
          <p className="text-sm mt-2 text-justify">
            Supermercado para la venta al público de productos alimentarios perecederos, así como otros productos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoriaSecciones1a9;
