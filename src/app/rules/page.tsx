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
          Club Rules & Safety Guidelines
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Our principles for safe, respectful, and unforgettable adventures.
          Please read carefully before your first trip.
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              Safety First: Your Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Know Your Limits:</strong> Always choose hikes that
                match your fitness level and experience. It's okay to turn back.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>The Ten Essentials:</strong> Always carry navigation,
                sun protection, insulation, illumination, first-aid, fire
                starter, repair tools, nutrition, hydration, and an emergency
                shelter.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Check the Weather:</strong> Always check the forecast
                before you leave. Be prepared for sudden changes, especially at
                high altitudes. Use our Weather Center!
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Communicate:</strong> Inform someone of your hiking
                plan, including your route and expected return time. Stick to
                the plan.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Mountain className="h-6 w-6 text-primary" />
              Leave No Trace: 7 Core Principles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. Plan Ahead and Prepare</AccordionTrigger>
                <AccordionContent>
                  Know the regulations and special concerns for the area you'll
                  visit. Travel in small groups and repackage food to minimize
                  waste.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  2. Travel and Camp on Durable Surfaces
                </AccordionTrigger>
                <AccordionContent>
                  Stay on established trails and campsites. Avoid creating new
                  paths. Good campsites are found, not made.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>3. Dispose of Waste Properly</AccordionTrigger>
                <AccordionContent>
                  Pack it in, pack it out. This includes all trash, leftover
                  food, and litter.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>4. Leave What You Find</AccordionTrigger>
                <AccordionContent>
                  Preserve the past: observe, but do not touch, cultural or
                  historic structures and artifacts. Leave rocks, plants, and
                  other natural objects as you find them.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>5. Minimize Campfire Impacts</AccordionTrigger>
                <AccordionContent>
                  Use a lightweight stove for cooking. Where fires are
                  permitted, use established fire rings, and keep fires small.
                  Burn all wood and coals to ash, put out campfires completely,
                  then scatter cool ashes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>6. Respect Wildlife</AccordionTrigger>
                <AccordionContent>
                  Observe wildlife from a distance. Never feed animals. Store
                  food and trash securely.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>
                  7. Be Considerate of Other Visitors
                </AccordionTrigger>
                <AccordionContent>
                  Yield to other users on the trail. Take breaks and camp away
                  from trails and other visitors. Let nature's sounds prevail;
                  avoid loud voices and noises.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary" />
              Group Etiquette & Club Conduct
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
             <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Be Punctual:</strong> Respect the trip leader and other members by arriving on time for all meetups.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Stay Together:</strong> Hike at a pace the whole group can manage. Keep the person behind you in sight and don't get too far ahead of the group.
              </p>
            </div>
             <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p>
                <strong>Inclusive Community:</strong> We are committed to fostering a welcoming and inclusive environment for everyone. Harassment and exclusionary behavior will not be tolerated.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
