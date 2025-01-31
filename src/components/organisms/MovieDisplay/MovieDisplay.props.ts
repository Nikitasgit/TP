import { IMovie } from "@/types/movieType";

export interface IMovieDisplayProps extends Omit<IMovie, "id"> {
  genres: { id: number; name: string }[];
  homepage?: string;
  production_companies?: {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[];
}
