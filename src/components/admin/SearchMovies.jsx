import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovieForAdmin, searchTvForAdmin } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieListItem from "../MovieListItem";
import NotFoundText from "../NotFoundText";

export default function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);

  const [resultNotFound, setResultNotFound] = useState(false);
  const [resultNotFoundTv, setResultNotFoundTv] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const { updateNotification } = useNotification();

  const searchMovies = async (val) => {
    const { error, results } = await searchMovieForAdmin(val);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResultNotFound(true);
      return setMovies([]);
    }

    setResultNotFound(false);
    setMovies([...results]);
  };
  const searchTv = async (val) => {
    const { error, results } = await searchTvForAdmin(val);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResultNotFoundTv(true);
      return setTv([]);
    }

    setResultNotFoundTv(false);
    setTv([...results]);
  };

  const handleAfterDelete = (movie) => {
    const updatedMovies = movies.filter((m) => m.id !== movie.id);
    setMovies([...updatedMovies]);
  };

  const handleAfterUpdate = (movie) => {
    const updatedMovies = movies.map((m) => {
      if (m.id === movie.id) return movie;
      return m;
    });
    setMovies([...updatedMovies]);
  };

  useEffect(() => {
    if (query.trim()) searchMovies(query);
  }, [query]);

  useEffect(() => {
    if (query.trim()) searchTv(query);
  }, [query]);
  

  return (<>
    <div className="p-5 space-y-3">
    <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-4">
         Search Results for Movies.....</h1>
      <NotFoundText text="Record not found!" visible={resultNotFound} />
      {!resultNotFound &&
        movies.map((movie) => {
          return (
            <MovieListItem
              movie={movie}
              key={movie.id}
              afterDelete={handleAfterDelete}
              afterUpdate={handleAfterUpdate}
            />
          );
        })}
    </div>
    <div className="p-5 space-y-3">
    <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-4">
         Search Results for Tv Series.....</h1>
    <NotFoundText text="Record not found!" visible={resultNotFoundTv} />
    {!resultNotFoundTv &&
      tv.map((t) => {
        return (
          <MovieListItem
            movie={t}
            key={t.id}
            afterDelete={handleAfterDelete}
            afterUpdate={handleAfterUpdate}
          />
        );
      })}
  </div>
  </>
  );
}
