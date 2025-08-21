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
  },
];
