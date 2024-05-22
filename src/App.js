import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { fetchMovies } from "./data/moviesSlice";
import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import Modal from "./components/Modal";
import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, fetchStatus } = useSelector((state) => state.movies);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [videoKey, setVideoKey] = useState();
  const [isOpen, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  const getSearchResults = (query) => {
    if (query !== "") {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}?query=${query}`));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate("/");
    getSearchResults(query);
  };

  const getMovies = () => {
    if (fetchStatus === "loading") return;
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}?query=${searchQuery}&page=1`));
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}?page=1`));
    }
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id);
    if (!videoKey) setOpen(true);
    setOpen(true);
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    try {
      const videoData = await fetch(URL).then((response) => response.json());

      if (videoData.videos && videoData.videos.results.length) {
        const trailer = videoData.videos.results.find(
          (vid) => vid.type === "Trailer"
        );
        setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    getMovies();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
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
