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