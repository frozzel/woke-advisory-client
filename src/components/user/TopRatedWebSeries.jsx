import React, { useState, useEffect } from "react";

import { getPopularTv } from "../../api/movie1";
import { useNotification } from "../../hooks";
import TvList from "./TvList";

export default function TopRatedWebSeries() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async (signal) => {
    const { error, movies } = await getPopularTv(signal);
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();

    fetchMovies(ac.signal);
    return () => {
      ac.abort();
    };
  }, []);

  return <TvList movies={movies} title="Popular TV (TV Series)" />;
}
