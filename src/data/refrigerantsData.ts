import type { RefrigeranteData } from "./refrigerantTypes";
import { refrigerantesDataPart1 } from "./refrigerantsData.part1";
import { refrigerantesDataPart2 } from "./refrigerantsData.part2";

export const refrigerantesData: Record<string, RefrigeranteData> = {
  ...refrigerantesDataPart1,
  ...refrigerantesDataPart2,
};

export const refrigerantes = Object.keys(refrigerantesData);

export const inflamabilidadOpciones = [
  { value: "Grupo 1", label: "Grupo 1 (Refrigerante no inflamable)" },
  { value: "Grupo 2L", label: "Grupo 2L (Refrigerante ligeramente inflamable)" },
  { value: "Grupo 2", label: "Grupo 2 (Refrigerante inflamable)" },
  { value: "Grupo 3", label: "Grupo 3 (Refrigerante muy inflamable)" },
];

export const toxicidadOpciones = [
  { value: "Grupo A", label: "Grupo A (Refrigerante de acción tóxica ligera o nula)" },
  { value: "Grupo B", label: "Grupo B (Refrigerante tóxico)" },
];
