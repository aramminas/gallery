import axios from "axios";
import {accessTokenC, refreshTokenC} from "../helpers/constants";

const API_URL = process.env.REACT_APP_API_URL;

const getEndpoint = (e) => `${API_URL}/${e}`;

const handleError = error => ({status: false, error: error.message});

const getHeaders = () => ({
    headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem(accessTokenC),
    }
});

const getTokenHeaders = () => ({
    headers: {
        'Content-Type': 'application/json',
        'refresh': localStorage.getItem(refreshTokenC),
    }
});

/* get all images from database */
const getAllImages = async (limit, offset) => {
    const response = await axios.get( getEndpoint('all'), {params: {limit, offset}, ...getHeaders()}).catch(handleError);
    const {status, error, data} = response;

    return {status, error, ...data};
}

/* add new image */
const addImage = async (data) => {
    const response = await axios.post( getEndpoint('add'), data, getHeaders()).catch(handleError);
    const {status, error} = response;

    return {status: !!status, error};
}

/* remove image */
const removeImage = async (id) => {
    const response = await axios.post( getEndpoint('delete'), {id}, getHeaders()).catch(handleError);
    const {status, error} = response;

    return { status: !!status, error };
}

/* get image by id */
const getImageById = async (id) => {
    const response = await axios.get( getEndpoint('image'), {params: {id}, ...getHeaders()}).catch(handleError);
    const {status, error, data} = response;

    return {status, error, ...data};
}

/* save crop and blur data */
const saveImageInfo = async (data) => {
    const response = await axios.post( getEndpoint('image/info'), data, getHeaders()).catch(handleError);
    const {status, error} = response;
    return { status: !!status, error};
}

/* get image last info (from history) */
const getLastImageInfoById = async (id, type) => {
    const response = await axios.get( getEndpoint('image/last/info'), {params: {id, type}, ...getHeaders()}).catch(handleError);
    const {status, data, error} = response;

    return { status: !!status , data, error};
}

/* get image logs history */
const getImageLogsById = async (id, limit, offset) => {
    const response = await axios.get( getEndpoint('image/logs'), {params: {id, limit, offset}, ...getHeaders()}).catch(handleError);
    const {data, statusText, error} = response;

    if(data){
        const {status , logs, image, message} = data;
        return { status: !!status , logs, image, message};
    }

    return { status: false , message: statusText, error};
}

/* add new user */
const signUpUser = async (data) => {
    const response = await axios.post( getEndpoint('auth/sign/up'), data, getHeaders()).catch(handleError);
    const {status, error, data: userData} = response;
    if(userData){
        const {status , message, user, accessToken, refreshToken} = userData;
        localStorage.setItem(accessTokenC, accessToken);
        localStorage.setItem(refreshTokenC, refreshToken);

        return { status: !!status, error: message, user};
    }

    return { status: !!status, error};
}

/* sign in user */
const signInUser = async (data) => {
    const response = await axios.post( getEndpoint('auth/sign/in'), data, getHeaders()).catch(handleError);

    let {status, error, data: userData, message} = response;

    if(userData){
        const {status , message, user, accessToken, refreshToken} = userData;
        localStorage.setItem(accessTokenC, accessToken);
        localStorage.setItem(refreshTokenC, refreshToken);
        return { status: !!status, error: message, user};
    }

    message = message ? message : error;
    return { status: !!status, error: message};
}

/* sign out user */
const checkToken = async () => {
    const response = await axios.post( getEndpoint('auth/token'),  {}, getTokenHeaders()).catch(handleError);
    let {status, error, data: userData, message} = response;

    if(userData){
        const {status , user, message, accessToken, refreshToken} = userData;

        if(accessToken) localStorage.setItem(accessTokenC, accessToken);
        if(refreshToken) localStorage.setItem(refreshTokenC, refreshToken);

        return { status: !!status, user, error: message};
    }

    message = message ? message : error;
    return { status: !!status, error: message};
}

const api = {
    addImage,
    getAllImages,
    removeImage,
    getImageById,
    saveImageInfo,
    getLastImageInfoById,
    getImageLogsById,
    signUpUser,
    signInUser,
    checkToken,
};

export default api;