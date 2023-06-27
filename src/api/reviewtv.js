import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addReviewTv = async (movieId, reviewData, ) => {
    const token = getToken();
    try {
      const { data } = await client.post(`/reviewTv/add/${movieId}`, reviewData, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const getReviewByMovieTv = async (movieId) => {
    try {
      const { data } = await client(`/reviewTv/get-reviews-by-movie/${movieId}`);
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const deleteReviewTv = async (reviewId) => {
    const token = getToken();
    try {
      const { data } = await client.delete(`/reviewTv/${reviewId}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const updateReviewTv = async (reviewId, reviewData) => {
    const token = getToken();
    try {
      const { data } = await client.patch(`/reviewTv/${reviewId}`, reviewData, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
export const getReviewByUser = async (userId) => {
  try {
    const { data } = await client(`/reviewtv/get-reviews-by-user/${userId}`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};