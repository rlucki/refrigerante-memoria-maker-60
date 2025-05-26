import { useState } from "react";
import DatosTitularSection from "./formSections/DatosTitularSection";

interface MemoriaTecnicaFormProps {
  onSubmit: () => void;
  onChange?: (field: string, value: any) => void;
  onWordTemplateUploaded?: (file: File) => void;
  onGenerateWordDocument?: () => void;
  hasWordTemplate?: boolean;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
}

/**
 * Formulario principal. A partir de ahora **solo existe** un campo real
 * para el dato de gases fluorados → `gasFluorado`.
 * Cualquier otra casilla de apoyo debe leer ese valor o ser eliminada.
 */
const MemoriaTecnicaForm = ({
  onSubmit,
  onChange,
  onCalculationsChange,
  onExcelUpload,
}: MemoriaTecnicaFormProps) => {
  /* -------------------------------------------------------------------- */
  /* Handlers                                                             */
  /* -------------------------------------------------------------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  /** Adapter para inputs estándar */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | { id: string; value: string }
  ) => {
    if (!onChange) return;

    if ("target" in e) {
      onChange(e.target.id, e.target.value);
    } else {
      onChange(e.id, e.value);
    }
  };

  /** Cambios procedentes de secciones de normativa, Excel, etc. */
  const handleNormativaChange = (field: string, value: any) => {
    onChange?.(field, value);
  };

  /**
   * Cambios del selector de gas fluorado.
   * Sólo actualizamos **gasFluorado**.  Cualquier casilla espejo debe leer
   * este valor en modo read-only; NO mantenemos más campos duplicados.
   */
  const handleGasFluoradoChange = (field: string, value: string) => {
    if (!onChange) return;

    if (field === "gasFluorado") {
      onChange("gasFluorado", value);
      console.log("MemoriaTecnicaForm → gasFluorado cambiado a", value);
    }
  };

  /* -------------------------------------------------------------------- */
  /* Render                                                               */
  /* -------------------------------------------------------------------- */
  return (
    <form onSubmit={handleSubmit}>
      <DatosTitularSection
        onChange={handleInputChange}
        onNormativaChange={handleNormativaChange}
        onCalculationsChange={onCalculationsChange}
        onExcelUpload={onExcelUpload}
        onGasFluoradoChange={handleGasFluoradoChange}
      />
    </form>
  );
};

export default MemoriaTecnicaForm;
