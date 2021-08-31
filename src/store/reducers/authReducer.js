import {TOGGLE_AUTHORIZATION, ADD_NEW_USER} from "../constants";

const initState = {
    user: {},
    isAuth: false,
};

const authReducer = (state= initState, {type, payload}) => {
    switch (type) {
        case TOGGLE_AUTHORIZATION:
            const newState = {...state, isAuth: payload};
            return {...newState};
        case ADD_NEW_USER:
            const userState = {isAuth: true, user: {...payload}};
            return {...userState};
        default:
            return state
    }
};

export default authReducer;