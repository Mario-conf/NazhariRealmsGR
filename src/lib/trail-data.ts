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

export const trails: Trail[] = [
  {
    id: 1,
    name: 'Eagle Peak Ascent',
    location: 'Yosemite, USA',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'mountain valley',
    difficulty: 'Hard',
    terrain: 'Mountain',
    length: 19.3,
    duration: 8,
    rating: 5,
    description:
      'A strenuous but rewarding climb to the top of Eagle Peak, offering unparalleled views of Yosemite Valley. Not for the faint of heart, this trail involves significant elevation gain and some scrambling near the summit.',
    gpxFile: '/gpx/eagle-peak.gpx',
  },
  {
    id: 2,
    name: 'Whispering Pines Trail',
    location: 'Black Forest, Germany',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'pine forest',
    difficulty: 'Easy',
    terrain: 'Forest',
    length: 8.0,
    duration: 2.5,
    rating: 4,
    description:
      'A gentle, family-friendly walk through the dense and mystical Black Forest. The trail is well-marked and relatively flat, making it perfect for a relaxing day out.',
    gpxFile: '/gpx/whispering-pines.gpx',
  },
  {
    id: 3,
    name: 'Cliffs of Moher Coastal Walk',
    location: 'County Clare, Ireland',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'coastal cliffs',
    difficulty: 'Moderate',
    terrain: 'Coastal',
    length: 12.9,
    duration: 4,
    rating: 5,
    description:
      'Experience the raw beauty of the Irish coast with this stunning cliffside walk. The trail can be exposed and windy, so be prepared for changing weather conditions.',
    gpxFile: '/gpx/cliffs-of-moher.gpx',
  },
  {
    id: 4,
    name: 'Valley of Fire Loop',
    location: 'Nevada, USA',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'red desert',
    difficulty: 'Moderate',
    terrain: 'Desert',
    length: 6.4,
    duration: 3,
    rating: 4,
    description:
      'Explore vibrant red Aztec sandstone outcrops and ancient, petrified trees in this otherworldly landscape. Best hiked in the cooler months, as summer temperatures can be extreme.',
    gpxFile: '/gpx/valley-of-fire.gpx',
  },
  {
    id: 5,
    name: 'Mont Blanc Circuit',
    location: 'Chamonix, France',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'snowy mountains',
    difficulty: 'Hard',
    terrain: 'Mountain',
    length: 170.0,
    duration: 110, // ~11 days
    rating: 5,
    description:
      'The legendary Tour du Mont Blanc is a multi-day trek through France, Italy, and Switzerland. This is a serious undertaking requiring significant planning and physical fitness.',
    gpxFile: '/gpx/mont-blanc.gpx',
  },
  {
    id: 6,
    name: 'Redwood Creek Ramble',
    location: 'California, USA',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'tall trees',
    difficulty: 'Easy',
    terrain: 'Forest',
    length: 4.8,
    duration: 1.5,
    rating: 4,
    description:
      'Wander among the tallest trees on Earth in this awe-inspiring old-growth redwood forest. The trail is mostly flat and accessible to hikers of all ages and abilities.',
    gpxFile: '/gpx/redwood-creek.gpx',
  },
  {
    id: 7,
    name: 'Amalfi Coast Path of the Gods',
    location: 'Amalfi, Italy',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'coastal village',
    difficulty: 'Moderate',
    terrain: 'Coastal',
    length: 7.7,
    duration: 3.5,
    rating: 5,
    description:
      'Il Sentiero degli Dei offers divine views of the Amalfi Coast and the island of Capri. The trail runs high above the sea, from the village of Bomerano to Nocelle.',
    gpxFile: '/gpx/path-of-gods.gpx',
  },
  {
    id: 8,
    name: 'The Narrows Bottom-Up',
    location: 'Zion National Park, USA',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'river canyon',
    difficulty: 'Moderate',
    terrain: 'Desert',
    length: 15.1,
    duration: 8,
    rating: 5,
    description:
      'Hike through the Virgin River in one of the most iconic slot canyons in the world. Requires walking in water, so appropriate footwear is essential. A truly unique desert experience.',
    gpxFile: '/gpx/the-narrows.gpx',
  },
];
