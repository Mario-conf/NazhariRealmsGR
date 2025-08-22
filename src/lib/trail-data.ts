export type ElevationPoint = {
  distance: number; // in meters
  elevation: number; // in meters
};

export type Trail = {
  id: number;
  name: string;
  location: string;
  image: string;
  imageHint: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  terrain: 'Mountain' | 'Forest' | 'Coastal' | 'Desert';
  length: number; // in km
  duration: number; // in hours
  rating: number; // 1-5
  description: string;
  gpxFile: string; // mock path
  elevationProfile: ElevationPoint[];
  routeMapImage: string;
};

export type Review = {
  id: string;
  trailId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
};


export const trails: Trail[] = [
  {
    id: 1,
    name: 'Ascenso al Veleta',
    location: 'Sierra Nevada, Granada',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'pico de montaña nevado',
    difficulty: 'Hard',
    terrain: 'Mountain',
    length: 12.0,
    duration: 6,
    rating: 4.8,
    description:
      'Una subida exigente pero gratificante hasta uno de los picos más altos de la península, ofreciendo vistas inigualables. No es para los débiles de corazón, esta ruta implica una ganancia de elevación significativa y terreno de alta montaña.',
    gpxFile: '/gpx/veleta.gpx',
    elevationProfile: [
        { distance: 0, elevation: 2500 },
        { distance: 1000, elevation: 2650 },
        { distance: 2000, elevation: 2800 },
        { distance: 3000, elevation: 2950 },
        { distance: 4000, elevation: 3100 },
        { distance: 5000, elevation: 3250 },
        { distance: 6000, elevation: 3396 }
    ],
    routeMapImage: 'https://placehold.co/600x400.png',
  },
  {
    id: 2,
    name: 'Sendero de los Cahorros',
    location: 'Monachil, Granada',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'cañón de río puentes colgantes',
    difficulty: 'Easy',
    terrain: 'Forest',
    length: 8.0,
    duration: 3,
    rating: 4.7,
    description:
      'Un paseo familiar y divertido a través de un cañón espectacular con puentes colgantes, túneles y cascadas. El sendero está bien marcado, por lo que es perfecto para un día relajado.',
    gpxFile: '/gpx/cahorros.gpx',
     elevationProfile: [
        { distance: 0, elevation: 800 },
        { distance: 1000, elevation: 850 },
        { distance: 2000, elevation: 870 },
        { distance: 3000, elevation: 900 },
        { distance: 4000, elevation: 920 },
        { distance: 5000, elevation: 910 },
        { distance: 6000, elevation: 880 },
        { distance: 7000, elevation: 850 },
        { distance: 8000, elevation: 800 }
    ],
    routeMapImage: 'https://placehold.co/600x400.png',
  },
  {
    id: 3,
    name: 'Ruta del Cares',
    location: 'Picos de Europa, Asturias/León',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'garganta de montaña',
    difficulty: 'Moderate',
    terrain: 'Mountain',
    length: 22.0,
    duration: 7,
    rating: 4.9,
    description:
      'Experimenta la belleza cruda de los Picos de Europa con este impresionante paseo por la "Garganta Divina". El sendero está excavado en la roca y puede ser expuesto, así que prepárate para vistas vertiginosas.',
    gpxFile: '/gpx/cares.gpx',
    elevationProfile: [
        { distance: 0, elevation: 250 },
        { distance: 2000, elevation: 400 },
        { distance: 4000, elevation: 450 },
        { distance: 6000, elevation: 500 },
        { distance: 8000, elevation: 520 },
        { distance: 10000, elevation: 510 },
        { distance: 11000, elevation: 480 }
    ],
    routeMapImage: 'https://placehold.co/600x400.png',
  },
  {
    id: 4,
    name: 'Desierto de Tabernas',
    location: 'Almería, Andalucía',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'paisaje desértico árido',
    difficulty: 'Moderate',
    terrain: 'Desert',
    length: 10.0,
    duration: 4,
    rating: 4.5,
    description:
      'Explora ramblas y paisajes de otro mundo en el único desierto de Europa. Mejor recorrerlo en los meses más fríos, ya que las temperaturas de verano pueden ser extremas.',
    gpxFile: '/gpx/tabernas.gpx',
    elevationProfile: [
        { distance: 0, elevation: 230 },
        { distance: 2000, elevation: 280 },
        { distance: 4000, elevation: 320 },
        { distance: 6000, elevation: 300 },
        { distance: 8000, elevation: 250 },
        { distance: 10000, elevation: 230 }
    ],
    routeMapImage: 'https://placehold.co/600x400.png',
  },
  {
    id: 5,
    name: 'Trekking de los 3000',
    location: 'Sierra Nevada, Granada',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'crestas de montañas',
    difficulty: 'Hard',
    terrain: 'Mountain',
    length: 45.0,
    duration: 72, // ~3 days
    rating: 5.0,
    description:
      'La legendaria ruta de los "Tresmiles" es una travesía de varios días por las cumbres más altas de Sierra Nevada. Es una empresa seria que requiere una planificación y condición física significativas.',
    gpxFile: '/gpx/tresmiles.gpx',
    elevationProfile: [
        { distance: 0, elevation: 2500 },
        { distance: 5000, elevation: 3000 },
        { distance: 10000, elevation: 3100 },
        { distance: 15000, elevation: 3396 },
        { distance: 20000, elevation: 3100 },
        { distance: 25000, elevation: 3000 },
        { distance: 30000, elevation: 2800 },
        { distance: 35000, elevation: 2600 },
        { distance: 40000, elevation: 2400 },
        { distance: 45000, elevation: 2200 }
    ],
    routeMapImage: 'https://placehold.co/600x400.png',
  },
  {
    id: 6,
    name: 'Parque Natural de Cazorla',
    location: 'Jaén, Andalucía',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'bosque denso río',
    difficulty: 'Easy',
    terrain: 'Forest',
    length: 6.0,
    duration: 2.5,
    rating: 4.6,
    description:
      'Pasea junto al nacimiento del río Guadalquivir en uno de los parques naturales más grandes de España. El sendero es mayormente plano y accesible para excursionistas de todas las edades.',
    gpxFile: '/gpx/cazorla.gpx',
    elevationProfile: [
        { distance: 0, elevation: 1350 },
        { distance: 1000, elevation: 1380 },
        { distance: 2000, elevation: 1400 },
        { distance: 3000, elevation: 1410 },
        { distance: 4000, elevation: 1400 },
        { distance: 5000, elevation: 1380 },
        { distance: 6000, elevation: 1350 }
    ],
    routeMapImage: 'https://placehold.co/600x400.png',
  },
  {
    id: 7,
    name: 'Caminito del Rey',
    location: 'Ardales, Málaga',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'pasarela acantilado',
    difficulty: 'Moderate',
    terrain: 'Coastal',
    length: 7.7,
    duration: 3.5,
    rating: 4.9,
    description:
      'Una ruta espectacular a través de pasarelas colgadas en las paredes del Desfiladero de los Gaitanes. Una experiencia inolvidable con seguridad garantizada.',
    gpxFile: '/gpx/caminito-del-rey.gpx',
    elevationProfile: [
        { distance: 0, elevation: 200 },
        { distance: 1000, elevation: 220 },
        { distance: 2000, elevation: 250 },
        { distance: 3000, elevation: 230 },
        { distance: 4000, elevation: 210 },
        { distance: 5000, elevation: 180 },
        { distance: 6000, elevation: 150 },
        { distance: 7000, elevation: 120 }
    ],
    routeMapImage: 'https://placehold.co/600x400.png',
  },
  {
    id: 8,
    name: 'Torcal de Antequera',
    location: 'Antequera, Málaga',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'formaciones rocosas kársticas',
    difficulty: 'Moderate',
    terrain: 'Mountain',
    length: 4.5,
    duration: 2,
    rating: 4.8,
    description:
      'Camina a través de un paisaje kárstico único en el mundo, formado hace millones de años. Requiere buen calzado ya que el terreno es muy rocoso e irregular. Una experiencia verdaderamente única.',
    gpxFile: '/gpx/torcal.gpx',
    elevationProfile: [
        { distance: 0, elevation: 1100 },
        { distance: 500, elevation: 1150 },
        { distance: 1000, elevation: 1200 },
        { distance: 1500, elevation: 1180 },
        { distance: 2000, elevation: 1220 },
        { distance: 2500, elevation: 1250 },
        { distance: 3000, elevation: 1230 },
        { distance: 3500, elevation: 1180 },
        { distance: 4000, elevation: 1150 },
        { distance: 4500, elevation: 1100 }
    ],
    routeMapImage: 'https://placehold.co/600x400.png',
  },
];
