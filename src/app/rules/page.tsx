import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Shield, Mountain, Heart } from 'lucide-react';

export default function RulesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Reglas del Club y Guías de Seguridad
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Nuestros principios para aventuras seguras, respetuosas e inolvidables. Por favor, lee con atención antes de tu primera salida.
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              La Seguridad es lo Primero: Tus Responsabilidades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Conoce Tus Límites:</strong> Elige siempre rutas que se ajusten a tu nivel de forma física y experiencia. No pasa nada por dar la vuelta.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Los Diez Esenciales:</strong> Lleva siempre navegación, protección solar, ropa de abrigo, iluminación, botiquín, iniciador de fuego, herramientas de reparación, nutrición, hidratación y un refugio de emergencia.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Consulta el Tiempo:</strong> Siempre revisa el pronóstico antes de salir. Prepárate para cambios repentinos, especialmente en altitudes elevadas. ¡Usa nuestro Centro Meteorológico!
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Comunica tu Plan:</strong> Informa a alguien de tu plan de ruta, incluyendo el itinerario y la hora prevista de regreso. Cíñete al plan.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Mountain className="h-6 w-6 text-primary" />
              No Dejes Rastro: 7 Principios Fundamentales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. Planifica y Prepárate con Antelación</AccordionTrigger>
                <AccordionContent>
                  Conoce la normativa y las particularidades de la zona que vas a visitar. Viaja en grupos pequeños y reempaqueta la comida para minimizar residuos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  2. Camina y Acampa en Superficies Resistentes
                </AccordionTrigger>
                <AccordionContent>
                  Mantente en los senderos y campings establecidos. Evita crear nuevos caminos. Los buenos campamentos se encuentran, no se hacen.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>3. Desecha los Residuos Apropiadamente</AccordionTrigger>
                <AccordionContent>
                  Todo lo que va, vuelve. Esto incluye toda la basura, restos de comida y desperdicios.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>4. Deja lo que Encuentres</AccordionTrigger>
                <AccordionContent>
                  Preserva el pasado: observa, pero no toques, estructuras y artefactos culturales o históricos. Deja las rocas, plantas y otros objetos naturales tal como los encuentres.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>5. Minimiza el Impacto de las Hogueras</AccordionTrigger>
                <AccordionContent>
                  Usa un hornillo ligero para cocinar. Donde los fuegos estén permitidos, usa los anillos de fuego establecidos y mantén los fuegos pequeños. Quema toda la madera y carbones hasta que sean cenizas, apaga completamente las hogueras y luego esparce las cenizas frías.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>6. Respeta la Fauna</AccordionTrigger>
                <AccordionContent>
                  Observa la fauna desde la distancia. Nunca alimentes a los animales. Guarda la comida y la basura de forma segura.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>
                  7. Sé Considerado con Otros Visitantes
                </AccordionTrigger>
                <AccordionContent>
                  Cede el paso a otros usuarios en el sendero. Toma los descansos y acampa lejos de los senderos y otros visitantes. Deja que prevalezcan los sonidos de la naturaleza; evita las voces y los ruidos fuertes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary" />
              Etiqueta de Grupo y Conducta del Club
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
             <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Sé Puntual:</strong> Respeta al líder de la excursión y a los demás miembros llegando a tiempo a todos los puntos de encuentro.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Manteneos Juntos:</strong> Camina a un ritmo que todo el grupo pueda gestionar. Mantén a la persona detrás de ti a la vista y no te adelantes demasiado al grupo.
              </p>
            </div>
             <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Comunidad Inclusiva:</strong> Estamos comprometidos a fomentar un ambiente acogedor e inclusivo para todos. El acoso y el comportamiento excluyente no serán tolerados.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
