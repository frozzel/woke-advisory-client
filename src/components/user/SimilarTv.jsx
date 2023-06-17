import React, { useState, useEffect } from "react";

import { getRelatedTv } from "../../api/movie1";
import { useNotification } from "../../hooks";
import TvList from "./TvList";

export default function SimilarTv({ movieId}) {
  const [tv, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async () => {
    const { error, tv } = await getRelatedTv(movieId);
    if (error) return updateNotification("error", error);

    setMovies([...tv]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return <TvList movies={tv} title="Related TV (TV Series)" />;
}
