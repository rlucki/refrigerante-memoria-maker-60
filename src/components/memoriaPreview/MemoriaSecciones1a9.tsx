
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
    instalador?: string;
  };
}

const MemoriaSecciones1a9: React.FC<MemoriaSecciones1a9Props> = ({ data }) => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
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

        {/* Sección 2 - ALCANCE */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">2. ALCANCE</h3>
          <p className="text-sm mt-2">
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
          <h3 className="text-lg font-bold">3. ANTECEDENTES</h3>
          <p className="text-sm mt-2">
            No existen antecedentes administrativos de la instalación objeto de este proyecto y,
            por lo tanto, se tramitará como nueva instalación.
          </p>
        </div>

        {/* Sección 4 - TITULAR */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">4. TITULAR</h3>
          <div className="text-sm mt-2 space-y-1">
            <p><span className="font-medium">Titular:</span> <span className="bg-yellow-100">{data.titular || "DINOSOL SUPERMERCADOS S.L."}</span></p>
            <p><span className="font-medium">CIF:</span> <span className="bg-yellow-100">{data.nif || "B61742565"}</span></p>
            <p><span className="font-medium">Domicilio social:</span> <span className="bg-yellow-100">{data.direccion || "Carretera del Rincón, s/n, 4ª Planta"}</span></p>
            <p><span className="bg-yellow-100">{data.cp || "35010"} {data.poblacion || "LAS PALMAS DE GRAN CANARIA"} ({data.provincia || "LAS PALMAS"})</span></p>
          </div>
        </div>

        {/* Sección 5 - DOMICILIO A EFECTOS DE NOTIFICACIONES */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">5. DOMICILIO A EFECTOS DE NOTIFICACIONES</h3>
          <div className="text-sm mt-2 space-y-1">
            <p><span className="font-medium">Dirección:</span> <span className="bg-green-100">C/ Luis Correa Medina, 9</span></p>
            <p><span className="bg-green-100">35013 LAS PALMAS DE GRAN CANARIA (LAS PALMAS)</span></p>
            <p><span className="font-medium">Teléfono:</span> <span className="bg-green-100">928303600</span></p>
          </div>
        </div>

        {/* Sección 6 - UBICACIÓN DE LA INSTALACIÓN */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">6. UBICACIÓN DE LA INSTALACIÓN</h3>
          <div className="text-sm mt-2 space-y-1">
            <p><span className="font-medium">Dirección:</span> <span className="bg-green-100">{data.direccionInstalacion || "Avda. José Antonio Tavío, 2"}</span></p>
            <p><span className="bg-green-100">Costa del Silencio</span></p>
            <p><span className="bg-green-100">38630 ARONA (SANTA CRUZ DE TENERIFE)</span></p>
            <p><span className="font-medium">Teléfono:</span> <span className="bg-green-100">666666666</span></p>
          </div>
        </div>

        {/* Sección 7 - TÉCNICO AUTOR DEL PROYECTO */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">7. TÉCNICO AUTOR DEL PROYECTO</h3>
          <div className="text-sm mt-2">
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Ingeniero:</p>
              <p><span className="bg-green-100">JUAN MUNNÉ MANSÓ</span></p>
              <p className="font-medium">DNI:</p>
              <p><span className="bg-green-100">52405996C</span></p>
              <p className="font-medium">N.º de colegiado:</p>
              <p><span className="bg-green-100">24.033</span></p>
              <p className="font-medium">Colegio:</p>
              <p><span className="bg-green-100">Colegio de Ingenieros Técnicos Industriales de Barcelona (CETIB)</span></p>
              <p className="font-medium">Domicilio profes.:</p>
              <p><span className="bg-green-100">C/ Pablo Iglesias, 63, Planta 1ª, Local 13</span></p>
              <p></p>
              <p><span className="bg-green-100">Pol. Ind. Pla d'en Boet</span></p>
              <p></p>
              <p><span className="bg-green-100">08302 MATARÓ (BARCELONA)</span></p>
              <p className="font-medium">Teléfono:</p>
              <p><span className="bg-green-100">649341169</span></p>
              <p className="font-medium">Email:</p>
              <p><span className="bg-green-100">jmunne@coldsulting.com</span></p>
            </div>
          </div>
        </div>

        {/* Sección 8 - EMPRESA INSTALADORA */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">8. EMPRESA INSTALADORA</h3>
          <div className="text-sm mt-2">
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Nombre:</p>
              <p><span className="bg-green-100">{data.instalador || "GESTÉCNICA INTEGRAL 10, S.L."}</span></p>
              <p className="font-medium">NIF:</p>
              <p><span className="bg-green-100">B76501931</span></p>
              <p className="font-medium">Domicilio Social:</p>
              <p><span className="bg-green-100">C/ Isaac Peral, 3, Nave 5</span></p>
              <p></p>
              <p><span className="bg-green-100">38109 EL ROSARIO (SANTA CRUZ DE TENERIFE)</span></p>
              <p className="font-medium">Teléfono:</p>
              <p><span className="bg-green-100">922618202</span></p>
              <p className="font-medium">Email:</p>
              <p><span className="bg-green-100">gestecnicaintegral10@gestecnicaintegral10.es</span></p>
              <p className="font-medium">N.º REIF:</p>
              <p><span className="bg-green-100">38020755</span></p>
            </div>
          </div>
        </div>

        {/* Sección 9 - ACTIVIDAD */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">9. ACTIVIDAD</h3>
          <p className="text-sm mt-2">
            Supermercado para la venta al público de productos alimentarios perecederos, así como otros productos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoriaSecciones1a9;
