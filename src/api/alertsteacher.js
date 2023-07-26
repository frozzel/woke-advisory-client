import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addAlertsTeacher = async (teacherId, reviewData, ) => {
    const token = getToken();
    try {
      const { data } = await client.post(`/alertsteacher/add/${teacherId}`, reviewData, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const getAlertsTeacher = async (teacherId) => {
    try {
      const { data } = await client(`/alertsteacher/${teacherId}`);
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const deleteReview = async (alertId) => {
    const token = getToken();
    try {
      const { data } = await client.delete(`/alertsteacher/delete/${alertId}`, {
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
      const { data } = await client.patch(`/reviewteacher/${reviewId}`, reviewData, {
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
export const addComment = async (alertId, query) => {

  const token = getToken();
  try {
    const { data } = await client.post(`/alertsteacher/addcomment/${alertId}`, query, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
}

export const likeAlert = async (alertId) => {
  
    const token = getToken();
    try {
      const { data } = await client.post(`/alertsteacher/addlike/${alertId}`, {}, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
}