import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/*
I generated a new token for this demo.
*/
export const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTUzZGY3Njc0OTE1NDFhODdhYWU1ZDg5MjJmNWQ1NSIsInN1YiI6IjY2NDY3YjA0ZGVmMjcwNTg5Y2E5MGE1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y71quUtq5frJzB8_ojpiStM3z5NevDbF244pVWEN30c";

/*
The endpoint has been updated, it now require {Bearer Token} to be passed in the header
check https://developer.themoviedb.org/reference/discover-movie for more information
*/

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl) => {
  const response = await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    fetchStatus: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
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
