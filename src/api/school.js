import { catchError } from "../utils/helper";
import client from "./client";

export const getSingleSchool = async (schoolId) => {
    try {
      const { data } = await client("/school/single/" + schoolId);
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
export const searchPublicSchools = async (val) => {
    try {
      const { data } = await client("/school/search?SchoolName=" + val);
      
      return data;
    } catch (error) {
      return catchError(error);
    }
  };