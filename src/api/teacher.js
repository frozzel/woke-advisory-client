import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const createTeacher = async (schoolId, teacherData, ) => {
  const token = getToken();
  try {
    const { data } = await client.post(`/teacher/create/${schoolId}`, teacherData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const getReviewByMovie = async (movieId) => {
  try {
    const { data } = await client(`/review/get-reviews-by-movie/${movieId}`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const deleteReview = async (reviewId) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/review/${reviewId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const updateReview = async (reviewId, reviewData) => {
  const token = getToken();
  try {
    const { data } = await client.patch(`/review/${reviewId}`, reviewData, {
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
    const { data } = await client(`/review/get-reviews-by-user/${userId}`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const getSingleTeacher = async (teacherId) => {
  try {
    const { data } = await client("/teacher/single/" + teacherId);
    return data;
  } catch (error) {
    return catchError(error);
  }
};