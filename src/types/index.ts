export type Difficulty = "Easy" | "Moderate" | "Hard" | "Expert";
export type Terrain = "Mountain" | "Forest" | "Coastal" | "Desert";

export interface Review {
  id: string;
  trailId: string;
  user: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Trail {
  id: string;
  name: string;
  description: string;
  location: string;
  distance: number; // in kilometers
  duration: number; // in hours
  difficulty: Difficulty;
  terrain: Terrain[];
  hasHistoricalElements: boolean;
  imageUrl: string;
  imageHint: string;
  averageRating: number;
}
