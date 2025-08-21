import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MountainIcon, StarIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Únete a la Aventura con Alpine-Hike Club
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Descubre rutas impresionantes, conecta con otros aventureros y crea recuerdos inolvidables. Tu próxima aventura en Granada y Andalucía comienza aquí.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">Explorar Rutas</Button>
                <Button size="lg" variant="outline">
                  Únete Ahora
                </Button>
              </div>
            </div>
            <img
              alt="Héroe"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              data-ai-hint="paisaje de montaña"
              src="https://placehold.co/600x600.png"
            />
          </div>
        </div>
      </section>

      <section id="reviews" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
            Lo que dicen nuestros miembros
          </h2>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "¡El mejor club de senderismo del que he formado parte! La comunidad es increíble y las rutas planificadas siempre son espectaculares."
                </p>
                <p className="font-semibold mt-4">- Alejandro García</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "Una experiencia increíble. Desde montañismo hasta relajadas acampadas, hay algo para todos. Muy recomendado."
                </p>
                <p className="font-semibold mt-4">- María Fernández</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "Los guías son expertos y la comunidad muy acogedora. He aprendido mucho y he visto lugares preciosos en Sierra Nevada."
                </p>
                <p className="font-semibold mt-4">- Samuel López</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
            Nuestros valiosos patrocinadores
          </h2>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex justify-center">
              <MountainIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="flex justify-center">
              <MountainIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="flex justify-center">
              <MountainIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ponte en contacto
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              ¿Tienes preguntas o quieres unirte? ¡Envíanos un mensaje!
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="grid gap-4">
              <Input placeholder="Nombre" type="text" />
              <Input placeholder="Correo electrónico" type="email" />
              <Textarea placeholder="Mensaje" />
              <Button type="submit">Enviar mensaje</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
