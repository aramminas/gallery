import {TOGGLE_AUTHORIZATION, ADD_NEW_USER} from "../constants";
import api from "../../api/api";

export const signUpUser = data => async dispatch => {
    const resData = await api.signUpUser(data);
    if(resData && (resData.status || resData.user)){
        dispatch({type: ADD_NEW_USER, payload : resData.user});
        dispatch({type: TOGGLE_AUTHORIZATION, payload : true});
        return false;
    }

    return resData;
}

export const signInUser = data => async dispatch => {
    const resData = await api.signInUser(data);
    if(resData && (resData.status || resData.user)){
        dispatch({type: ADD_NEW_USER, payload : resData.user});
        dispatch({type: TOGGLE_AUTHORIZATION, payload : true});
        return false;
    }

    return resData;
}

export const signOutUser = () => async dispatch => {
    localStorage.clear();
    dispatch({type: ADD_NEW_USER, payload : {}});
    dispatch({type: TOGGLE_AUTHORIZATION, payload : false});
    return false;
}

export const checkToken = () => async dispatch => {
    const resData = await api.checkToken();

    if(resData && (resData.status || resData.user)){
        dispatch({type: ADD_NEW_USER, payload : resData.user});
        dispatch({type: TOGGLE_AUTHORIZATION, payload : true});
        return false;
    }

    return resData;
}