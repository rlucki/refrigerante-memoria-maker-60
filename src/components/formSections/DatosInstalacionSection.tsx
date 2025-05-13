import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface DatosInstalacionSectionProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatosInstalacionSection = ({ onChange }: DatosInstalacionSectionProps) => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">4.- DATOS INSTALACIÓN</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="direccion_instalacion">Dirección de la instalación</Label>
            <Input 
              id="direccionInstalacion" 
              placeholder="Dirección de la instalación" 
              defaultValue="AVDA. BLAS PÉREZ GONZÁLEZ, 4"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="poblacion_instalacion">Población</Label>
            <Input 
              id="poblacion_instalacion" 
              placeholder="Población" 
              defaultValue="PUERTO DE LA CRUZ"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="provincia_instalacion">Provincia</Label>
            <Input 
              id="provincia_instalacion" 
              placeholder="Provincia" 
              defaultValue="SANTA CRUZ DE TENERIFE"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cp_instalacion">C.P.</Label>
            <Input 
              id="cp_instalacion" 
              placeholder="Código postal" 
              defaultValue="35610"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telefono_instalacion">Teléfono</Label>
            <Input 
              id="telefono_instalacion" 
              placeholder="Teléfono" 
              defaultValue="922443768"
            />
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="num_inscripcion">Número de inscripción de la instalación</Label>
            <Input 
              id="num_inscripcion" 
              placeholder="Número de inscripción" 
              defaultValue="IF202400127"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fecha_inscripcion">Fecha</Label>
            <Input 
              id="fecha_inscripcion" 
              placeholder="Fecha" 
              type="date"
              defaultValue="2024-09-23"
            />
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <h3 className="text-lg font-medium mb-4">5.- AUTOR DEL PROYECTO / DIRECTOR TÉCNICO</h3>
        
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">Autor</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="autor_nombre">Autor</Label>
              <Input 
                id="autor_nombre" 
                placeholder="Nombre del autor" 
                defaultValue="-"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="autor_dni">DNI</Label>
              <Input 
                id="autor_dni" 
                placeholder="DNI" 
                defaultValue="-"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="titulo_proyecto">Título del proyecto</Label>
              <Input 
                id="titulo_proyecto" 
                placeholder="Título del proyecto" 
                defaultValue="-"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="colegio_profesional">Colegio Profesional</Label>
              <Input 
                id="colegio_profesional" 
                placeholder="Colegio Profesional" 
                defaultValue="-"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="n_colegiado">Nº colegiado</Label>
              <Input 
                id="n_colegiado" 
                placeholder="Nº colegiado" 
                defaultValue="-"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="autor_email">Email</Label>
              <Input 
                id="autor_email" 
                placeholder="Email" 
                type="email"
                defaultValue="-"
              />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div>
          <h4 className="text-md font-medium mb-3">Técnico</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tecnico_nombre">Técnico</Label>
              <Input 
                id="tecnico_nombre" 
                placeholder="Nombre del técnico" 
                defaultValue="-"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tecnico_dni">DNI</Label>
              <Input 
                id="tecnico_dni" 
                placeholder="DNI" 
                defaultValue="-"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="titulacion">Titulación Universitaria</Label>
              <Input 
                id="titulacion" 
                placeholder="Titulación" 
                defaultValue="-"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="n_colegiado_tecnico">Nº de colegiado (si procede)</Label>
              <Input 
                id="n_colegiado_tecnico" 
                placeholder="Nº colegiado" 
                defaultValue="-"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tecnico_email">Email</Label>
              <Input 
                id="tecnico_email" 
                placeholder="Email" 
                type="email"
                defaultValue="-"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DatosInstalacionSection;
