/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { fetchMovies, fetchSingleMovie } from "./data/moviesSlice";
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import Modal from "./components/Modal";
import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [videoKey, setVideoKey] = useState();
  const [isOpen, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  const getSearchResults = (query) => {
    if (query) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}?query=${query}`));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
    }
  };

  const getMovies = () => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}?query=${searchQuery}`));
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}`));
    }
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id);
    setOpen(true);
  };

  const getMovie = async (id) => {
    setVideoKey(null);
    const res = await fetchSingleMovie(id);
    if (res) setVideoKey(res);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header
        searchMovies={getSearchResults}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {isOpen && (
        <Modal onClose={closeModal}>
          <YouTubePlayer videoKey={videoKey} />
        </Modal>
      )}
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Movies movies={movies} viewTrailer={viewTrailer} />}
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
