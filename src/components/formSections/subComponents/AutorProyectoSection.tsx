
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AutorProyectoSectionProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutorProyectoSection = ({ onChange }: AutorProyectoSectionProps) => {
  return (
    <>
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
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="autor_dni">DNI</Label>
            <Input 
              id="autor_dni" 
              placeholder="DNI" 
              defaultValue="-"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="titulo_proyecto">Título del proyecto</Label>
            <Input 
              id="titulo_proyecto" 
              placeholder="Título del proyecto" 
              defaultValue="-"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="colegio_profesional">Colegio Profesional</Label>
            <Input 
              id="colegio_profesional" 
              placeholder="Colegio Profesional" 
              defaultValue="-"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="n_colegiado">Nº colegiado</Label>
            <Input 
              id="n_colegiado" 
              placeholder="Nº colegiado" 
              defaultValue="-"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="autor_email">Email</Label>
            <Input 
              id="autor_email" 
              placeholder="Email" 
              type="email"
              defaultValue="-"
              onChange={onChange}
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
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tecnico_dni">DNI</Label>
            <Input 
              id="tecnico_dni" 
              placeholder="DNI" 
              defaultValue="-"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="titulacion">Titulación Universitaria</Label>
            <Input 
              id="titulacion" 
              placeholder="Titulación" 
              defaultValue="-"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="n_colegiado_tecnico">Nº de colegiado (si procede)</Label>
            <Input 
              id="n_colegiado_tecnico" 
              placeholder="Nº colegiado" 
              defaultValue="-"
              onChange={onChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tecnico_email">Email</Label>
            <Input 
              id="tecnico_email" 
              placeholder="Email" 
              type="email"
              defaultValue="-"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AutorProyectoSection;
