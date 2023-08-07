import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addAlertsSchool = async (userId, reviewData, ) => {
    const token = getToken();
    
    try {
      const { data } = await client.post(`/post/add/${userId}`, reviewData, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
export const getAlertsSchool = async (userId, userData) => {
  const token = getToken();
  try {
    const { data } = await client(`/post/${userId}`, userData,{
      headers: {
          authorization: "Bearer " + token,
          },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const deleteReview = async (alertId) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/post/delete/${alertId}`, {
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
export const addComment = async (alertId, query) => {

  const token = getToken();
  try {
    const { data } = await client.post(`/post/addcomment/${alertId}`, query, {
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
      const { data } = await client.post(`/post/addlike/${alertId}`, {}, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
}