import Movie from "./Movie";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useFetchMoreMovies from "../hooks/useFetchMoreMovies";
import "../styles/movies.scss";

const Movies = ({ movies, viewTrailer }) => {
  const { getMoreMovies, data, isLoading, hasMorePages } =
    useFetchMoreMovies(movies);
    
  const { loaderRef } = useInfiniteScroll(
    movies?.results,
    getMoreMovies,
    isLoading
  );

  return (
    <div data-testid="movies">
      <div className="movie-list">
        {data?.map((movie) => {
          return (
            <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
          );
        })}
      </div>

      {hasMorePages && (
        <div ref={loaderRef}>
          <div>loading...</div>
        </div>
      )}
    </div>
  );
};

export default Movies;
