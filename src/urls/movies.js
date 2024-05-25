import {
  ENDPOINT,
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  API_KEY,
} from "../constants";

export const getMoviesUrl = (page) => `${ENDPOINT_DISCOVER}?page=${page}`;

export const getSearchMoviesUrl = (page, query) =>
  `${ENDPOINT_SEARCH}?query=${query}&page=${page}`;

export const getSingleMovieUrl = (id) =>
  `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
