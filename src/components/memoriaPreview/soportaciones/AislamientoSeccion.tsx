
import React from "react";
import { BlockMath } from "react-katex";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

// Custom KaTeX style with correct TypeScript type for textRendering
const katexStyle: React.CSSProperties = {
  fontFamily: "KaTeX_Main, Times New Roman, serif",
  fontSize: "1.21em",
  lineHeight: "1.2",
  textIndent: 0,
  textRendering: "auto" as const
};

const AislamientoSeccion: React.FC = () => {
  return (
    <div className="space-y-4 text-sm text-justify">
      {/* Sección AISLAMIENTO */}
      <h4 className="text-base font-bold mt-8 mb-2">AISLAMIENTO</h4>
      
      <p>
        El aislamiento térmico de los circuitos de baja temperatura en una
        instalación frigorífica juega un papel muy importante en cuanto al
        rendimiento (consumo energético), hermeticidad, funcionamiento y
        conservación del sistema. A tal efecto los recipientes, intercambiadores
        o tuberías y accesorios que trabajen a temperaturas relativamente bajas
        (t &lt; 15ºC) deberán estar protegidos mediante aislamiento térmico de
        la absorción de calor y de las condensaciones superficiales no esporádicas.
      </p>
      
      <p>
        La calidad del aislamiento viene dada principalmente por su coeficiente
        de conductividad térmica, su baja permeabilidad al vapor de agua, y su
        resistencia al envejecimiento y la eficacia de la barrera de vapor.
      </p>
      
      <p>El espesor del aislante se ha determinado teniendo en cuenta:</p>
      
      <ul className="list-disc pl-6 space-y-1 text-sm">
        <li>
          La temperatura y humedad relativa del aire ambiente en el lugar de
          emplazamiento.
        </li>
        <li>
          La diferencia de temperatura entre la superficie fría a aislar y la
          normal del aire ambiente.
        </li>
        <li>
          La conductividad térmica del material aislante seleccionado.
        </li>
        <li>
          La forma y características del componente a aislar (pared plana o
          diámetro de la tubería).
        </li>
      </ul>

      <p>Los materiales aislantes cumplen los requisitos siguientes:</p>
      
      <ul className="list-disc pl-6 space-y-1 text-sm">
        <li>Coeficiente de conductividad térmica bajo.</li>
        <li>
          Factores de resistencia a la absorción y difusión del vapor de agua
          altos.
        </li>
        <li>
          Buena resistencia a la inflamabilidad, a la descomposición y al
          envejecimiento.
        </li>
        <li>
          Buena resistencia mecánica, especialmente en los puntos de soportación
          de tuberías.
        </li>
        <li>
          Mantienen sus propiedades a temperaturas entre –70 y +120ºC.
        </li>
        <li>
          Cuando el aislamiento discurra a la intemperie, estará debidamente
          protegido.
        </li>
      </ul>

      <p>
        Para su cálculo, es muy importante garantizar la ausencia de condensaciones
        en exterior de la tubería y minimizar las pérdidas por transmisión, de
        ahí que los espesores instalados cubren las necesidades obtenidas a
        partir de la siguiente ecuación:
      </p>

      {/* Fórmula con KaTeX */}
      <div className="my-4 overflow-x-auto" style={katexStyle}>
        <BlockMath
          math={String.raw`
            Q \;=\;
            \frac{\,t_e - t_i\,}
                 {\displaystyle
                   \frac{1}{2\pi}\bigl(
                     \tfrac{1}{h_i r_i}
                     + \tfrac{1}{\lambda}\ln\!\tfrac{r_2}{r_1}
                     + \tfrac{1}{h_e r_2}
                   \bigr)
                 }
            \;=\;
            \frac{\,t_e - t_{se}\,}{2\pi\,h_e\,r_2}
          `}
        />
      </div>

      <p>En donde:</p>
      
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse border border-gray-300 text-sm mb-4">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="border border-gray-300 p-2 text-left">Descripción</TableHead>
              <TableHead className="border border-gray-300 p-2 text-center">Unidades</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border border-gray-300 p-2">Q (flujo de calor)</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">W/m</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell className="border border-gray-300 p-2">
                λ (conductividad aislamiento)
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">W/m·K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-gray-300 p-2">te (temperatura exterior)</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">ºC</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell className="border border-gray-300 p-2">ti (temperatura interior)</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">ºC</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-gray-300 p-2">
                he (coeficiente convección exterior)
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">W/m²·K</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell className="border border-gray-300 p-2">
                hi (coeficiente convección interior)
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">W/m²·K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-gray-300 p-2">
                r2 (radio exterior + aislante)
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">m</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell className="border border-gray-300 p-2">r1 (radio interior)</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">m</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-gray-300 p-2">e (espesor aislamiento)</TableCell>
              <TableCell className="border border-gray-300 p-2 text-center">m</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p>
        Todas las tuberías de aspiración han sido aisladas mediante coquilla
        elastomérica, cuyo espesor mínimo es de 19 mm y está en función del
        fluido y de su temperatura, en aras de evitar la condensación de la
        humedad ambiental.
      </p>
    </div>
  );
};

export default AislamientoSeccion;
