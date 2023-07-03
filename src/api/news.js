import { catchError } from "../utils/helper";
import client from "./client";

export const getNews = async () => {
   
    try {
      const { data } = await client(`/news/relevant`);
      return data;
    } catch (error) {
      return catchError(error);
    }
  };

export const getImage = async () => {
   
    try {
      const { data } = await client(`/news/images`);
      return data;
    } catch (error) {
      return catchError(error);
    }
  }