import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NormativaSection from "./NormativaSection";

interface DatosInstalacionSectionProps {
  onChange?: (field: string, value: any) => void;
  onCalculationsChange?: (field: string, value: string) => void;
  onExcelUpload?: (data: any) => void;
  gasFluorado: string;
  codigoPostal: string;
}

const DatosInstalacionSection: React.FC<DatosInstalacionSection
  onChange={onChange}
  onCalculationsChange={onCalculationsChange}
  onExcelUpload={onExcelUpload}
  gasFluorado={formData.gasFluorado}
  codigoPostal={formData.cpInstalacion}
/>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Separator className="my-6" />

      {/* Sección de normativa ligada a gases fluorados y CP */}
      <NormativaSection
        gasFluorado={gasFluorado}
        codigoPostal={codigoPostal}
        onNormativaChange={(field, value) => onChange?.(field, value)}
      />
    </div>
  );
};

export default DatosInstalacionSection;
