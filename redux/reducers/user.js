import { SET_USER } from "../constants";
import { SET_INTERVIEWER } from "../constants";

const initialState = {
    interviewer: "",
    user: ""
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.data,
            };
        case SET_INTERVIEWER:
            return {
                ...state,
                interviewer: action.data
            };
        default:
            return state;
    }
}