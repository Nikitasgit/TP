import CustomImage from "@atoms/CustomImage/CustomImage";
import Text from "@atoms/Text/Text";

import { useMovieById } from "@hooks/queries";
import "./MoviePage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { FaStar, FaLink } from "react-icons/fa";
import Button from "@atoms/Button/Button";
const Movie = () => {
  const { id } = useParams();
  const { data: movie, isLoading } = useMovieById(Number(id));
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <section className="movie-page">
          <div>
            <h2>{movie.title}</h2>
            <CustomImage
              path={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="movie-page_text">
            <span>
              {movie.vote_average.toFixed(1)} <FaStar />
            </span>
            <ul className="genres-list">
              {movie.genres.map((genre: { id: number; name: string }) => (
                <li>{genre.name}</li>
              ))}
            </ul>
            <Text text={movie.overview} />
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
              Lien <FaLink />
            </a>
            <h5>{movie.release_date}</h5>
            <h4>Produit par:</h4>
            <ul className="production-companies">
              {movie.production_companies?.map(
                (production: {
                  id: number;
                  name: string;
                  logo_path: string;
                  origin_country: string;
                }) => (
                  <li>
                    <h6> {production.name}</h6>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${production.logo_path}`}
                      alt={production.name}
                    />
                  </li>
                )
              )}
            </ul>
            <Button label="Retour" onClick={() => navigate(-1)} />
          </div>
        </section>
      )}
    </>
  );
};

export default Movie;
