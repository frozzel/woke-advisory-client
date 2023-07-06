import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addReviewSchool = async (schoolId, reviewData, ) => {
    const token = getToken();
    try {
      const { data } = await client.post(`/reviewschool/add/${schoolId}`, reviewData, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const getReviewByMovieSchool = async (schoolId) => {
    try {
      const { data } = await client(`/reviewschool/get-reviews-by-school/${schoolId}`);
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const deleteReview = async (reviewId) => {
    const token = getToken();
    try {
      const { data } = await client.delete(`/reviewschool/${reviewId}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const updateReviewSchool = async (reviewId, reviewData) => {
    const token = getToken();
    try {
      const { data } = await client.patch(`/reviewschool/${reviewId}`, reviewData, {
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
    const { data } = await client(`/reviewschool/get-reviews-by-user/${userId}`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};