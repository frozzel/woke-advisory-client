import client from "./client";
import { getToken } from "../utils/helper";
import { catchError } from "../utils/helper";

export const getProfile = async (userId) => {
    const token = getToken();
    try {
        const { data } = await client("/user/profile/"+ userId,{
            headers: {
                authorization: "Bearer " + token,
            },
        });
        return data;
    } catch (error) {
        return catchError(error);
    }
};