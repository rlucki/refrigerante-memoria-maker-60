
import React from "react";

interface MemoriaClasificacionLocalProps {
  data: {
    categoriaLocal?: string;
  };
}

const MemoriaClasificacionLocal: React.FC<MemoriaClasificacionLocalProps> = ({ data }) => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        <div className="mb-6">
          {/* Sección 10.2 - CLASIFICACIÓN DEL LOCAL */}
          <div className="mt-4 mb-6">
            <h4 className="text-base font-bold">10.2. CLASIFICACIÓN DEL LOCAL</h4>
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
        </div>
      </div>
    </div>
  );
};

export default MemoriaClasificacionLocal;
