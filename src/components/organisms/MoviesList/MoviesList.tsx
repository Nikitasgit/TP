import MovieCard from "@molecules/MovieCard/MovieCard";
import { IMovieListProps } from "./MoviesList.props";
import "./MoviesList.scss";
import { useAddUserMovie, useRemoveUserMovie } from "@hooks/mutations";
import { useAuth } from "store/useAuth";
import Modal from "@molecules/Modal/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const MoviesList: React.FC<IMovieListProps> = ({ movies }) => {
  const { user } = useAuth();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { mutate: addMovieToUser, isPending: addingPending } =
    useAddUserMovie();
  const { mutate: removeMovieToUser, isPending: removingPending } =
    useRemoveUserMovie();
  const handleModalClick = () => {
    navigate("/users/newAccount");
  };
  const handleAddFavorite = (movieId: number) => {
    if (user && user.movies.includes(movieId)) {
      return removeMovieToUser({ movieId, user });
    }
    if (user) {
      return addMovieToUser({ movieId, user });
    }
    setModal(true);
  };
  return (
    <section className="movies-list">
      {modal && (
        <Modal
          title="Commencez par vous inscrire!"
          text="Pour ajouter à vos favoris, inscrivez-vous d'abord"
          buttonLabel="S'inscrire"
          onClose={() => setModal(false)}
          onClick={handleModalClick}
        />
      )}
      {movies.map((movie) => (
        <MovieCard
          id={movie.id}
          isFavourite={user?.movies?.includes(movie.id)}
          key={movie.id}
          isPending={addingPending || removingPending}
          title={movie.title}
          description={movie.overview}
          img={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
              : "/assets/popcorn.jpg"
          }
          vote={movie.vote_average}
          onClick={() => handleAddFavorite(movie.id)}
        />
      ))}
    </section>
  );
};

export default MoviesList;
