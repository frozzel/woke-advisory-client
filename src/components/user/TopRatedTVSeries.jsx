import React, { useState, useEffect } from "react";
import { getPopularMovies } from "../../api/movie1";
import { useNotification } from "../../hooks";
import MovieList from "./MovieList";

export default function TopRatedTVSeries() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async (signal) => {
    const { error, movies } = await getPopularMovies(signal);
    if (error) return updateNotification("error", error);
    // results.splice(0, 10)
    setMovies([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();

    fetchMovies(ac.signal);
    return () => {
      ac.abort();
    };
  }, []);

  return <MovieList movies={movies} title="Popular (Movies)" />;
}
