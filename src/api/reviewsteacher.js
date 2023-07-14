import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addReviewTeacher = async (teacherId, reviewData, ) => {
    const token = getToken();
    try {
      const { data } = await client.post(`/reviewsteacher/add/${teacherId}`, reviewData, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const getReviewByMovieTeacher = async (teacherId) => {
    try {
      const { data } = await client(`/reviewsteacher/get-reviews-by-teacher/${teacherId}`);
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const deleteReview = async (reviewId) => {
    const token = getToken();
    try {
      const { data } = await client.delete(`/reviewsteacher/${reviewId}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const updateReviewTeacher = async (reviewId, reviewData) => {
    const token = getToken();
    try {
      const { data } = await client.patch(`/reviewsteacher/${reviewId}`, reviewData, {
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
    const { data } = await client(`/reviewsteacher/get-reviews-by-user/${userId}`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};