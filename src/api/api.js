import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getEndpoint = (e) => `${API_URL}/${e}`;

const handleError = error => ({status: false, error: error.message});

/* get all images from database */
const getAllImages = async (limit, offset) => {
    const response = await axios.get( getEndpoint('all'), {params: {limit, offset}}).catch(handleError);
    const {status, error, data} = response;

    return {status, error, ...data};
}

/* add new image */
const addImage = async (data) => {
    const response = await axios.post( getEndpoint('add'), data).catch(handleError);
    const {status, error} = response;

    return {status: !!status, error};
}

/* remove image */
const removeImage = async (id) => {
    const response = await axios.post( getEndpoint('delete'), {id: id}).catch(handleError);
    const {status, error} = response;

    return { status: !!status, error };
}

/* get image by id */
const getImageById = async (id) => {
    const response = await axios.get( getEndpoint('image'), {params: {id}}).catch(handleError);
    const {status, error, data} = response;

    return {status, error, ...data};
}

/* save crop and blur data */
const saveImageInfo = async (data) => {
    const response = await axios.post( getEndpoint('image/info'), data).catch(handleError);
    const {status, error} = response;
    return { status: !!status, error};
}

/* get image last info (from history) */
const getLastImageInfoById = async (id, type) => {
    const response = await axios.get( getEndpoint('image/last/info'), {params: {id, type}}).catch(handleError);
    const {status, data, error} = response;

    return { status: !!status , data, error};
}

/* get image logs history */
const getImageLogsById = async (id, limit, offset) => {
    const response = await axios.get( getEndpoint('image/logs'), {params: {id, limit, offset}}).catch(handleError);
    const {data, statusText, error} = response;

    if(data){
        const {status , logs, image, message} = data;
        return { status: !!status , logs, image, message};
    }

    return { status: false , message: statusText, error};
}

const api = {
    addImage,
    getAllImages,
    removeImage,
    getImageById,
    saveImageInfo,
    getLastImageInfoById,
    getImageLogsById,
};

export default api;