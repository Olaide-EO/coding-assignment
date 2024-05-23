import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../data/moviesSlice";
import Movie from "./Movie";
import { getMoviesUrl, getSearchMoviesUrl } from "../urls/movies";
import useFetchMoreMovies from "../hooks/useFetchMoreMovies";
import "../styles/movies.scss";

const Movies = ({ movies, viewTrailer }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const { page } = useSelector((state) => state.movies);

  const getMoreMovies = useCallback(() => {
    let URL = searchQuery
      ? getSearchMoviesUrl(page, searchQuery)
      : getMoviesUrl(page);

    dispatch(fetchMovies(URL));
  }, [searchQuery, page, dispatch]);

  const { loaderRef } = useFetchMoreMovies(movies, getMoreMovies);

  return (
    <div data-testid="movies">
      <div className="movie-list">
        {movies?.map((movie, index) => {
          return (
            <Movie
              movie={movie}
              key={movie.id}
              viewTrailer={viewTrailer}
              testid={`movie-card-${index}`}
            />
          );
        })}
      </div>

      {movies.length > 0 && (
        <div ref={loaderRef}>
          <div>loading...</div>
        </div>
      )}
    </div>
  );
};

export default Movies;
