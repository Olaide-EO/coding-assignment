import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from "../constants";
import { token } from "../data/moviesSlice";

const useFetchMoreMovies = (initialData) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [data, setData] = useState(null);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const loaderRef = useRef(null);

  const getMoreMovies = useCallback(async () => {
    setIsLoading(true);
    let URL;
    if (searchQuery) {
      URL = `${ENDPOINT_SEARCH}?query=${searchQuery}&page=${page}`;
    } else {
      URL = `${ENDPOINT_DISCOVER}?page=${page}`;
    }

    const moviesData = await fetch(URL, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => response.json());

    if (moviesData?.results?.length > 0) {
      setData((prevData) => [...prevData, ...moviesData.results]);
      setPage((state) => state + 1);
    }
    setIsLoading(false);
  },[page, searchQuery])

  useEffect(() => {
    setData(initialData);
    //reset page on new data
    setPage(2);
  }, [initialData]);

  useEffect(() => {
    const monitorRef = loaderRef.current
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && initialData.length > 0 && !isLoading) {
        getMoreMovies();
      }
    });

    if (monitorRef) {
      observer.observe(monitorRef);
    }

    return () => {
      if (monitorRef) {
        observer.unobserve(monitorRef);
      }
    };
  }, [loaderRef, initialData, getMoreMovies, isLoading]);

  return { data, loaderRef, isLoading };
};

export default useFetchMoreMovies;
