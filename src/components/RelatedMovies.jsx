import React, { useEffect, useState } from "react";
import { getRelatedMovies } from "../api/movie1";
import { useNotification } from "../hooks";
import MovieList from "./user/MovieList";

export default function RelatedMovies({ movieId }) {
  const [movies, setMovies] = useState([]);

  const { updateNotification } = useNotification();

  const fetchRelatedMovies = async (signal) => {
    const { error, movies } = await getRelatedMovies(movieId, signal);
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();
    if (movieId) fetchRelatedMovies(ac.signal);
    return () => {
      ac.abort();}
  }, [movieId]);
  return <MovieList movies={movies} title="Related Movies"  />;
}
