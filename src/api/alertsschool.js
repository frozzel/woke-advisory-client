import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addAlertsSchool = async (schoolId, reviewData, ) => {
    const token = getToken();
    try {
      const { data } = await client.post(`/alertsschool/add/${schoolId}`, reviewData, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const getAlertsSchool = async (schoolId) => {
    try {
      const { data } = await client(`/alertsschool/${schoolId}`);
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
  export const deleteReview = async (alertId) => {
    const token = getToken();
    try {
      const { data } = await client.delete(`/alertsschool/delete/${alertId}`, {
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