
import React from "react";

const MemoriaInstalacionElectrica: React.FC = () => {
  return (
    <div className="mb-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] relative p-6">
      <div className="pb-20">
        {/* Sección 16 - INSTALACIÓN ELÉCTRICA */}
        <div className="mb-6">
          <h3 className="text-lg font-bold">16. INSTALACIÓN ELÉCTRICA</h3>
          
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
    </div>
  );
};

export default MemoriaInstalacionElectrica;
