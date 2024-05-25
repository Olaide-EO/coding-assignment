import { useSelector, useDispatch } from "react-redux";
import watchLaterSlice from "../data/watchLaterSlice";
import Movie from "./Movie";
import ActionButton from "./ActionButton";
import EmptyState from "./EmptyState";
import "../styles/starred.scss";

const WatchLater = ({ viewTrailer }) => {
  const state = useSelector((state) => state);
  const { watchLater } = state;
  const { remveAllWatchLater } = watchLaterSlice.actions;
  const dispatch = useDispatch();

  const handleRemoveAllWatchLater = () => dispatch(remveAllWatchLater());

  return (
    <div className="starred" data-testid="watch-later-div">
      {watchLater.watchLaterMovies.length > 0 && (
        <div data-testid="watch-later-movies" className="starred-movies">
          <h6 className="header">Watch Later List</h6>
          <div className="row movie-list">
            {watchLater.watchLaterMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>
          <ActionButton
            buttonText="Empty list"
            onClick={handleRemoveAllWatchLater}
          />
        </div>
      )}

      {watchLater.watchLaterMovies.length === 0 && (
        <EmptyState description="You have no movies saved to watch later." />
      )}
    </div>
  );
};

export default WatchLater;
