import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { token } from "../constants";
import { getSingleMovieUrl } from "../urls/movies";

const authCall = async (apiUrl) =>
  await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl) => {
  const response = await authCall(apiUrl);
  return response.json();
});

export const fetchSingleMovie = async (id) => {
  const apiUrl = getSingleMovieUrl(id);
  try {
    const videoData = await (await authCall(apiUrl)).json();

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      return trailer ? trailer.key : videoData.videos.results[0].key;
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    fetchStatus: "",
    page: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies =
          action.payload.page === 1
            ? action.payload.results
            : [...state.movies, ...action.payload.results];
        state.page = action.payload.page + 1;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export default moviesSlice;
