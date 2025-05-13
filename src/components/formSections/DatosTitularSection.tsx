
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface DatosTitularSectionProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatosTitularSection = ({ onChange }: DatosTitularSectionProps) => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">1.- DATOS TITULAR</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="titular">Titular</Label>
            <Input 
              id="titular" 
              placeholder="Nombre del titular" 
              defaultValue="DINOSOL SUPERMERCADOS S.L."
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nif">NIF</Label>
            <Input 
              id="nif" 
              placeholder="NIF del titular" 
              defaultValue="B61742565"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="direccion_fiscal">Dirección fiscal</Label>
            <Input 
              id="direccion" 
              placeholder="Dirección fiscal" 
              defaultValue="CTRA. DEL RINCÓN, S/N, 4ª PLANTA Edif. Anexo C.C. Las Arenas"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="poblacion">Población</Label>
            <Input 
              id="poblacion" 
              placeholder="Población" 
              defaultValue="LAS PALMAS DE GRAN CANARIA"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="provincia">Provincia</Label>
            <Input 
              id="provincia" 
              placeholder="Provincia" 
              defaultValue="LAS PALMAS"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cp">C.P.</Label>
            <Input 
              id="cp" 
              placeholder="Código postal" 
              defaultValue="35010"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input 
              id="telefono" 
              placeholder="Teléfono" 
              defaultValue="928303600"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              placeholder="Email" 
              type="email"
              defaultValue="info.supermercado@dinosol.es"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DatosTitularSection;
