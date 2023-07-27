import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const followTeacher = async (teacherId, userData) => {
    const token = getToken();
    try {
        const { data } = await client.post(`/follow/teacher/${teacherId}`, userData,{
            headers: {
                authorization: "Bearer " + token,
            },
        });
        return data;
    } catch (error) {
        return catchError(error);
    }
};
export const followSchool = async (teacherId, userData) => {
    const token = getToken();
    try {
        const { data } = await client.post(`/follow/school/${teacherId}`, userData,{
            headers: {
                authorization: "Bearer " + token,
            },
        });
        return data;
    } catch (error) {
        return catchError(error);
    }
};
export const followUser = async (userId, userData) => {
    const token = getToken();
    try {
        const { data } = await client.post(`/follow/user/${userId}`, userData,{
            headers: {
                authorization: "Bearer " + token,
            },
        });
        return data;
    } catch (error) {
        return catchError(error);
    }
};  

