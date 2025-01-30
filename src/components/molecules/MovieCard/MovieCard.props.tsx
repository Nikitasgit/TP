export interface IMovieProps {
  title: string;
  description: string;
  vote: number;
  isPending: boolean;
  img: string;
  id: number;
  isFavourite: boolean | undefined;
  onClick: () => void;
}
