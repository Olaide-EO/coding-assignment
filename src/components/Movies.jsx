import Movie from "./Movie";
import useFetchMoreMovies from "../hooks/useFetchMoreMovies";
import "../styles/movies.scss";

const Movies = ({ movies, viewTrailer, closeCard }) => {
  const { data, loaderRef } = useFetchMoreMovies(movies?.results);

  if (!movies?.results) return null;

  return (
    <div data-testid="movies">
      <div className="movie-list">
        {data?.map((movie) => {
          return (
            <Movie
              movie={movie}
              key={movie.id}
              viewTrailer={viewTrailer}
              closeCard={closeCard}
            />
          );
        })}
      </div>

      <div ref={loaderRef}><div>loading...</div></div>
    </div>
  );
};

export default Movies;
