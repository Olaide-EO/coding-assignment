import { useEffect, useRef } from "react";

const useFetchMoreMovies = (initialData, getMoreMovies) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const monitorRef = loaderRef.current;
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        initialData?.length > 0
      ) {
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
  }, [loaderRef, getMoreMovies, initialData]);

  return { loaderRef };
};

export default useFetchMoreMovies;
