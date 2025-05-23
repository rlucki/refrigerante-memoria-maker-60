import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { postalCodeRegions, periodoInstalacion } from "./constants/regiones";
import { detectRegionFromPostalCode, getAplicableRegulations } from "./utils/normativaUtils";

// Import sub-components
import DatosGeneralesInstalacion from "./subComponents/DatosGeneralesInstalacion";
import AutorProyectoSection from "./subComponents/AutorProyectoSection";
import NormativaSelectorSection from "./subComponents/NormativaSelectorSection";
import CalculadoraSection from "./subComponents/CalculadoraSection";
import DescripcionInstalacionSection from "./subComponents/DescripcionInstalacionSection";

interface DatosInstalacionSectionProps {
  onChange?: (field: string, value: any) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
}

const DatosInstalacionSection = ({ onChange, onCalculationsChange, onExcelUpload }: DatosInstalacionSectionProps) => {
  const [comunidadAutonoma, setComunidadAutonoma] = useState("CATALUNYA");
  const [instalacionNueva, setInstalacionNueva] = useState("SI");
  const [periodoInstalacionSeleccionado, setPeriodoInstalacionSeleccionado] = useState("nueva");
  const [aplicaLegionela, setAplicaLegionela] = useState("SI");
  const [aplicaGasesFluorados, setAplicaGasesFluorados] = useState("NO");
  const [rsifAplicable, setRsifAplicable] = useState("RD 552/2019");
  const [normativaCompleta, setNormativaCompleta] = useState({});
  const [cpInstalacion, setCpInstalacion] = useState("35610");
  // Add states for refrigerant properties
  const [isRefrigeranteFluorado, setIsRefrigeranteFluorado] = useState(false);
  const [isRefrigeranteNatural, setIsRefrigeranteNatural] = useState(false);
  
  // For calculation section
  const handleSelectChange = (id: string, value: string) => {
    if (onChange) {
      onChange(id, value);
    }
  };
  
  const handleCalcChange = (field: string, value: string) => {
    if (onCalculationsChange) {
      onCalculationsChange(field, value);
    }
  };
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
    
    // If we're changing the postal code, detect the region
    if (e.target.id === "cpInstalacion") {
      setCpInstalacion(e.target.value);
      const detectedRegion = detectRegionFromPostalCode(e.target.value, postalCodeRegions);
      if (detectedRegion) {
        setComunidadAutonoma(detectedRegion);
        console.log(`Detected region from postal code: ${detectedRegion}`);
      }
    }
  };
  
  // Initial detection of region from default postal code
  useEffect(() => {
    const detectedRegion = detectRegionFromPostalCode(cpInstalacion, postalCodeRegions);
    if (detectedRegion) {
      setComunidadAutonoma(detectedRegion);
    }
  }, []);
  
  // Update installation period when the installation status changes
  useEffect(() => {
    if (instalacionNueva === "SI") {
      // If it's a new installation, force the period to "nueva"
      setPeriodoInstalacionSeleccionado("nueva");
      setRsifAplicable("RD 552/2019");
    } else {
      // If it's not a new installation, select the first non-nueva option if "nueva" is currently selected
      if (periodoInstalacionSeleccionado === "nueva") {
        setPeriodoInstalacionSeleccionado("desde_2020");
        setRsifAplicable("RD 552/2019");
      } else {
        // Otherwise set RSIF based on the current period
        const periodo = periodoInstalacion.find(p => p.id === periodoInstalacionSeleccionado);
        if (periodo) {
          setRsifAplicable(periodo.rsif);
        }
      }
    }
  }, [instalacionNueva]);
  
  // Update RSIF when the installation period changes
  useEffect(() => {
    const periodo = periodoInstalacion.find(p => p.id === periodoInstalacionSeleccionado);
    if (periodo) {
      setRsifAplicable(periodo.rsif);
    }
  }, [periodoInstalacionSeleccionado]);
  
  // Update normativa when any input changes
  useEffect(() => {
    const regulations = getAplicableRegulations(
      comunidadAutonoma, 
      instalacionNueva, 
      rsifAplicable, 
      aplicaLegionela, 
      aplicaGasesFluorados
    );
    setNormativaCompleta(regulations);
    
    // Notify parent component about normativa changes
    if (onChange) {
      onChange('normativaCompleta', regulations);
    }
  }, [comunidadAutonoma, instalacionNueva, periodoInstalacionSeleccionado, aplicaLegionela, aplicaGasesFluorados]);
  
  return (
    <Card>
      <div className="p-6">
        <DatosGeneralesInstalacion onChange={handleInputChange} />
        
        <Separator className="my-6" />
        
        <AutorProyectoSection onChange={handleInputChange} />
        
        <Separator className="my-6" />
        
        {/* NORMATIVA SECTION */}
        <NormativaSelectorSection
          comunidadAutonoma={comunidadAutonoma}
          setComunidadAutonoma={setComunidadAutonoma}
          instalacionNueva={instalacionNueva}
          setInstalacionNueva={setInstalacionNueva}
          periodoInstalacionSeleccionado={periodoInstalacionSeleccionado}
          setPeriodoInstalacionSeleccionado={setPeriodoInstalacionSeleccionado}
          rsifAplicable={rsifAplicable}
          aplicaLegionela={aplicaLegionela}
          setAplicaLegionela={setAplicaLegionela}
          aplicaGasesFluorados={aplicaGasesFluorados}
          setAplicaGasesFluorados={setAplicaGasesFluorados}
          isRefrigeranteFluorado={isRefrigeranteFluorado}
          isRefrigeranteNatural={isRefrigeranteNatural}
        />
        
        {/* Hidden input to store the full regulation data for form submission */}
        <input 
          type="hidden" 
          id="normativa_completa" 
          name="normativa_completa" 
          value={JSON.stringify(getAplicableRegulations(
            comunidadAutonoma, 
            instalacionNueva, 
            rsifAplicable, 
            aplicaLegionela, 
            aplicaGasesFluorados
          ))} 
        />
        
        <Separator className="my-6" />
        
        {/* CALCULADORA SECTION */}
        <CalculadoraSection onCalculationsChange={onCalculationsChange} />
        
        <Separator className="my-6" />
        
        {/* DESCRIPCIÓN SECTION */}
        <DescripcionInstalacionSection
          handleInputChange={handleInputChange}
          handleTextareaChange={handleTextareaChange}
          handleSelectChange={handleSelectChange}
          onCalculationsChange={onCalculationsChange}
        />
      </div>
    </Card>
  );
};

export default DatosInstalacionSection;
