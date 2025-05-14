
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para validar valores de pixeles en márgenes
export const validateMargin = (value: number, defaultValue: number = 10): number => {
  if (isNaN(value) || value < 0) {
    return defaultValue;
  }
  return value;
}
