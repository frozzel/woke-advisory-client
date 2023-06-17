import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPublicMovies, searchTv } from "../../api/movie1";
import { useNotification } from "../../hooks";
import Container from "../Container";
import NotFoundText from "../NotFoundText";
import MovieList from "./MovieList";
import TvList from "./TvList";

export default function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);
  const [tv, setTv] = useState([]);
  const [resultNotFoundTv, setResultNotFoundTv] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const { updateNotification } = useNotification();

  const searchMovies = async (val) => {
    const { error, movies } = await searchPublicMovies(val);
    if (error) return updateNotification("error", error);
    if (!movies.length) {
      setResultNotFound(true);

      return setMovies([]);
    }
  
    setResultNotFound(false);
    setMovies([...movies]);
  };
  const searchPublicTv = async (val) => {
    const { err, tv } = await searchTv(val);
    if (err) return updateNotification("error", err);
    if (!tv.length) {
      setResultNotFoundTv(true);
      return setTv([]);
    }
    setResultNotFoundTv(false);
    setTv([...tv]);
  };

  useEffect(() => {
    if (query.trim()) searchMovies(query);
  }, [query]);

  useEffect(() => {
    if (query.trim()) searchPublicTv(query);
  }, [query]);

  return (<>
    <div className="dark:bg-primary bg-white min-h-screen py-8">
      <Container className="px-2 xl:p-0">
         <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-4">
         Search Results for Movies.....</h1>
        <NotFoundText text="Record not found!" visible={resultNotFound} />
        <MovieList movies={movies} />
      </Container>
  
    <Container className="px-2 xl:p-0">
    <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-4 mt-4">
         Search Results for TV.....</h1>
      <NotFoundText text="Record not found!" visible={resultNotFoundTv} />
      <TvList movies={tv} />
    </Container>
  </div>
  </>
  );
}
