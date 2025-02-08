export interface Content {
  id: number;
  title: { english: string; userPreferred: string };
  coverImage: { large: string };
  genres: string[];
  seasonYear: string;
  episodes: number;
  status: string;
  averageScore: number;
  type: string;
}

export interface Anime {
  id: string;
  subId: string;
  dubId: string;
  isDubAvailable: boolean;
  title: string;
  description: string;
  banner: string;
  cover: string;
  genres: string[];
  tags: string[];
  studio: string;
  trailer: string;
  relatedContent: Anime[];
}
export interface AnimeCard {
  id: number;
  title: string;
  image: string;
  genre: string[]; // Array of strings
  ratings?: number; // Optional property
  status: string;
  episodes: number;
  year: string;
  type?: string; // Optional property
}
export interface Episode {
  id: number;
  title?: string;
  thumbnail?: string;
  number: number; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  video?: any;
}

export interface PageData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
  pageNumber: number;
  perPage: number;
  hasMore: boolean;
}
