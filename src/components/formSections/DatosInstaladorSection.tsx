
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const DatosInstaladorSection = () => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">2.- DATOS INSTALADOR Y MANTENEDOR</h3>
        
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">Empresa frigorista que realiza la instalación</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="empresa_instalacion">Empresa frigorista</Label>
              <Input 
                id="empresa_instalacion" 
                placeholder="Empresa frigorista que realiza la instalación" 
                defaultValue="GESTÉCNICA INTEGRAL 10. S.L."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cif_instalacion">CIF</Label>
              <Input 
                id="cif_instalacion" 
                placeholder="CIF" 
                defaultValue="B76501931"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="n_registro_instalacion">Nº inscripción registro Empresas Frigoristas (Ref)</Label>
              <Input 
                id="n_registro_instalacion" 
                placeholder="Nº registro" 
                defaultValue="38020755"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="direccion_instalacion">Dirección</Label>
              <Input 
                id="direccion_instalacion" 
                placeholder="Dirección" 
                defaultValue="C/ ISAAC PERAL, Nº 3, NAVE 5"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="poblacion_instalacion">Población</Label>
              <Input 
                id="poblacion_instalacion" 
                placeholder="Población" 
                defaultValue="EL ROSARIO"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cp_instalacion">C.P.</Label>
              <Input 
                id="cp_instalacion" 
                placeholder="Código postal" 
                defaultValue="38109"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefono_instalacion">Teléfono</Label>
              <Input 
                id="telefono_instalacion" 
                placeholder="Teléfono" 
                defaultValue="922618202"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mail_instalacion">Email</Label>
              <Input 
                id="mail_instalacion" 
                placeholder="Email" 
                type="email"
                defaultValue="gestecnicaintegral10@gestecnicaintegral10.es"
              />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">Empresa frigorista encargada mantenimiento</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="empresa_mantenimiento">Empresa frigorista</Label>
              <Input 
                id="empresa_mantenimiento" 
                placeholder="Empresa frigorista encargada mantenimiento" 
                defaultValue="GESTÉCNICA INTEGRAL 10. S.L."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cif_mantenimiento">CIF</Label>
              <Input 
                id="cif_mantenimiento" 
                placeholder="CIF" 
                defaultValue="B76501931"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="n_registro_mantenimiento">Nº inscripción registro Empresas Frigoristas (Ref)</Label>
              <Input 
                id="n_registro_mantenimiento" 
                placeholder="Nº registro" 
                defaultValue="38020755"
              />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div>
          <h4 className="text-md font-medium mb-3">3.- FRIGORISTA HABILITADO EMPRESA INSTALADORA</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="frigorista_nombre">D/Dª</Label>
              <Input 
                id="frigorista_nombre" 
                placeholder="Nombre del frigorista" 
                defaultValue="PEDRO ROBERTO MENESES ALONSO"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="frigorista_dni">DNI</Label>
              <Input 
                id="frigorista_dni" 
                placeholder="DNI" 
                defaultValue="45705298C"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DatosInstaladorSection;
