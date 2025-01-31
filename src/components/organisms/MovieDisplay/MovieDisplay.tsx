import Button from "@atoms/Button/Button";
import { IMovieDisplayProps } from "./MovieDisplay.props";
import { useNavigate } from "react-router-dom";
import CustomImage from "@atoms/CustomImage/CustomImage";
import { FaLink, FaStar } from "react-icons/fa";
import Text from "@atoms/Text/Text";
import "./MovieDisplay.scss";
const MovieDisplay: React.FC<IMovieDisplayProps> = ({
  title,
  overview,
  poster_path,
  release_date,
  vote_average,
  genres,
  homepage,
  production_companies,
}) => {
  const navigate = useNavigate();
  return (
    <section className="movie-display">
      <div>
        <h2>{title}</h2>
        <CustomImage
          path={
            poster_path
              ? `https://image.tmdb.org/t/p/w400/${poster_path}`
              : "/assets/popcorn.jpg"
          }
          alt={title}
        />
      </div>
      <div className="movie-page_text">
        <span>
          {vote_average.toFixed(1)} <FaStar />
        </span>
        <ul className="genres-list">
          {genres.map((genre: { id: number; name: string }) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <Text text={overview} />
        <a href={homepage} target="_blank" rel="noopener noreferrer">
          Lien <FaLink />
        </a>
        <h5>{release_date}</h5>
        <h4>Produit par:</h4>
        <ul className="production-companies">
          {production_companies?.map((production) => (
            <li key={production.id}>
              <h6> {production.name}</h6>
              <img
                src={
                  production.logo_path
                    ? `https://image.tmdb.org/t/p/w200/${production.logo_path}`
                    : "/assets/popcorn.jpg"
                }
                alt={production.name}
              />
            </li>
          ))}
        </ul>
        <Button label="Retour" onClick={() => navigate(-1)} />
      </div>
    </section>
  );
};

export default MovieDisplay;
