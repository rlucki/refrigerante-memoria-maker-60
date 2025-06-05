import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface DatosTitularFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatosTitularForm: React.FC<DatosTitularFormProps> = ({ handleChange }) => (
  <TabsContent value="titular" className="space-y-6">
          <h3 className="text-lg font-medium mb-4">1.- DATOS TITULAR</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="titular">Titular</Label>
              <Input
                id="titular"
                placeholder="Nombre del titular"
                defaultValue="DINOSOL SUPERMERCADOS S.L."
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nif">NIF</Label>
              <Input
                id="nif"
                placeholder="NIF del titular"
                defaultValue="B61742565"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="direccion">Dirección fiscal</Label>
              <Input
                id="direccion"
                placeholder="Dirección fiscal"
                defaultValue="CTRA. DEL RINCÓN, S/N, 4ª PLANTA Edif. Anexo C.C. Las Arenas"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="poblacion">Población</Label>
              <Input
                id="poblacion"
                placeholder="Población"
                defaultValue="LAS PALMAS DE GRAN CANARIA"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="provincia">Provincia</Label>
              <Input
                id="provincia"
                placeholder="Provincia"
                defaultValue="LAS PALMAS"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cp">C.P.</Label>
              <Input
                id="cp"
                placeholder="Código postal"
                defaultValue="35010"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                placeholder="Teléfono"
                defaultValue="928303600"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                defaultValue="info.supermercado@dinosol.es"
                onChange={handleChange}
              />
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="text-lg font-medium mb-4">5. DOMICILIO A EFECTOS DE NOTIFICACIONES</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="direccionNotif">Dirección</Label>
              <Input
                id="direccionNotif"
                placeholder="Dirección para notificaciones"
                defaultValue="C/ Luis Correa Medina, 9"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="poblacionNotif">Población</Label>
              <Input
                id="poblacionNotif"
                placeholder="Población"
                defaultValue="LAS PALMAS DE GRAN CANARIA"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="provinciaNotif">Provincia</Label>
              <Input
                id="provinciaNotif"
                placeholder="Provincia"
                defaultValue="LAS PALMAS"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpNotif">C.P.</Label>
              <Input
                id="cpNotif"
                placeholder="Código postal"
                defaultValue="35013"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefonoNotif">Teléfono</Label>
              <Input
                id="telefonoNotif"
                placeholder="Teléfono"
                defaultValue="928303600"
                onChange={handleChange}
              />
            </div>
          </div>
  </TabsContent>
);

export default DatosTitularForm;
