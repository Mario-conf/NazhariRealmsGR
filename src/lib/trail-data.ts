


export type StravaEmbed = {
  type: 'route' | 'activity';
  id: string;
};

export type Trail = {
  id: number;
  name: string;
  location: string;
  image: string;
  imageHint: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  terrain: 'Mountain' | 'Forest' | 'Coastal' | 'Desert' | 'Montaña' | 'Bosque' | 'Costa' | 'Desierto' | 'Berg' | 'Wald' | 'Küste' | 'Wüste' | 'Montagne' | 'Forêt' | 'Côte' | 'Désert';
  length: number; // in km
  duration: number; // in hours
  rating: number; // 1-5
  description: string;
  mapUrl?: string; // Optional static map image URL
};

export type Review = {
  id: string;
  trailId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
};
