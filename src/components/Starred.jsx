import { useSelector, useDispatch } from "react-redux";
import starredSlice from "../data/starredSlice";
import Movie from "./Movie";
import ActionButton from "./ActionButton";
import EmptyState from "./EmptyState";
import "../styles/starred.scss";

const Starred = ({ viewTrailer }) => {
  const state = useSelector((state) => state);
  const { starred } = state;
  const { clearAllStarred } = starredSlice.actions;
  const dispatch = useDispatch();

  const handleClearAllStared = () => dispatch(clearAllStarred());

  return (
    <div className="starred" data-testid="starred">
      {starred.starredMovies.length > 0 && (
        <div data-testid="starred-movies" className="starred-movies">
          <h6 className="header">Starred movies</h6>
          <div className="row movie-list">
            {starred.starredMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>
          <ActionButton
            buttonText="Remove all starred"
            onClick={handleClearAllStared}
          />
        </div>
      )}

      {starred.starredMovies.length === 0 && (
        <EmptyState description="There are no starred movies." />
      )}
    </div>
  );
};

export default Starred;
