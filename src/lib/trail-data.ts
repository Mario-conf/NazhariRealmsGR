export type StravaEmbed = {
  type: 'route' | 'activity';
  id: string;
  units?: 'metric' | 'imperial';
  style?: 'standard' | 'satellite';
  mapHash?: string;
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
  stravaEmbed?: StravaEmbed;
};

export type Review = {
  id: string;
  trailId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
};
