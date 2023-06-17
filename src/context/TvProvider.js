import React, { useState, createContext } from "react";
import { getTv } from "../api/movie";
import { useNotification } from "../hooks";

export const TvContext = createContext();

const limit = 10;
let currentPageNo = 0;

const TvProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [latestUploads, setLatestUploads] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const { updateNotification } = useNotification();

  const fetchLatestUploads = async (qty = 5) => {
    const { error, movies } = await getTv(0, qty);
    if (error) return updateNotification("error", error);

    setLatestUploads([...movies]);
  };

  const fetchMovies = async (pageNo = currentPageNo) => {
    const { error, movies } = await getTv(pageNo, limit);
    if (error) updateNotification("error", error);

    if (!movies.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setMovies([...movies]);
  };

  const fetchNextPage = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchMovies(currentPageNo);
  };

  const fetchPrevPage = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo -= 1;
    fetchMovies(currentPageNo);
  };

  return (
    <TvContext.Provider
      value={{
        movies,
        latestUploads,
        fetchLatestUploads,
        fetchMovies,
        fetchNextPage,
        fetchPrevPage,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};

export default TvProvider;