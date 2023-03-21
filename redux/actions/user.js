import { SET_USER, SET_INTERVIEWER } from "../constants";

export const setUser = (data) => {
    return {
        type: SET_USER,
        data
    };
};

export const setInterviewer = (data) => {
    return {
        type: SET_INTERVIEWER,
        data
    };
};