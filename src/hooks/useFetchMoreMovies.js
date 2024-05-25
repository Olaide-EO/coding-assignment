import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesUrl, getSearchMoviesUrl } from "../urls/movies";
import { authCall } from "../data/moviesSlice";

const useFetchMoreMovies = (movies) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setData(movies?.results);
    setPage(movies?.page + 1);
    setTotalPages(movies?.total_pages);
  }, [movies]);

  const getMoreMovies = useCallback(async () => {
    if (page >= totalPages) return;
    setLoading(true);

    let URL = searchQuery
      ? getSearchMoviesUrl(page, searchQuery)
      : getMoviesUrl(page);
    try {
      const moviesData = await (await authCall(URL)).json();

      if (moviesData?.results) {
        setData((prevData) => [...prevData, ...moviesData.results]);
        setPage(moviesData?.page + 1);
        setTotalPages(moviesData?.total_pages);
      }
    } catch (error) {
      console.error("Error fetching more movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, totalPages]);

  const hasMorePages = data?.length > 0 && totalPages > page

  return { getMoreMovies, isLoading, data, page, totalPages, hasMorePages };
};

export default useFetchMoreMovies;
