import { catchError} from "../utils/helper";
import client from "./client";

export const getUpcomingMovies = async () => {
    
    try {
      const { data } = await client("/movie1/upcoming");
      return data;
      
    } catch (error) {
      return catchError(error);
    }
  };
export const getNowPlaying = async () => {

  try {
    const { data } = await client("/movie1/nowPlaying");
    
    return data;
    
  } catch (error) {
    return catchError(error);
  }
};

export const getPopularMovies = async () => {
  try {
      const { data } = await client("/movie1/popular");
      
      return data;
      
    } catch (error) {
      return catchError(error);
    }
  };

export const getSingleMovie = async (id) => {
  try {
    const { data } = await client("/movie1/single/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const getRelatedMovies = async (id) => {
  try {
    const { data } = await client("/movie1/related/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const searchPublicMovies = async (title) => {
  try {
    const { data } = await client("/movie1/search-public?title=" + title);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const getPopularTv = async () => {
  try {
      const { data } = await client("/movie1/popularTv");
      
      return data;
      
    } catch (error) {
      return catchError(error);
    }
  };
export const getSingleTv = async (id) => {
  try {
    const { data } = await client("/movie1/singleTv/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const searchTv = async (title) => {
  try {
    const { data } = await client("/movie1/searchTv?title=" + title);
    return data;
  } catch (err) {
    return catchError(err)
  }
};
export const getRelatedTv = async (id) => {
  try {
    const { data } = await client("/movie1/relatedTv/" + id);
    
    return data;
  } catch (error) {
    return catchError(error);
  }
};