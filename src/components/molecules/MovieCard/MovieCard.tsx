import Button from "@atoms/Button/Button";
import CustomImage from "@atoms/CustomImage/CustomImage";
import Text from "@atoms/Text/Text";
import Title from "@atoms/Title/Title";
import { IMovieProps } from "./MovieCard.props";
import { FaStar } from "react-icons/fa";
import "./MovieCard.scss";
import { Link } from "react-router-dom";
const MovieCard: React.FC<IMovieProps> = ({
  title,
  img,
  description,
  vote,
  isFavourite,
  isPending,
  id,
  onClick,
}) => {
  return (
    <div className="movie-card">
      <Link className="movie-card_link" to={`/movies/${id}`}>
        <Title label={title} />
        <span>
          {String(vote.toFixed(1))} <FaStar />
        </span>
        <CustomImage path={img} alt={title} />
        <Text text={description} className="movie-card-desc" />
      </Link>
      <Button
        disabled={isPending}
        label={isFavourite ? "supprimer des favoris" : "Ajouter aux favoris"}
        onClick={onClick}
      />
    </div>
  );
};

export default MovieCard;
