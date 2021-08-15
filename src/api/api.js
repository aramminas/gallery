import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getEndpoint = (e) => `${API_URL}/${e}`;

/* get all images from database */
const getAllImages = async (limit, offset) => {
    const response = await axios.get( getEndpoint('all'), {params: {limit, offset}});
    const {status, data} = response;

    if(status){
        return data;
    }
}

/* add new image */
const addImage = async (data) => {
    const response = await axios.post( getEndpoint('add'), data);
    const {status} = response;

    return { status:  !!status };
}

/* remove image */
const removeImage = async (id) => {
    const response = await axios.post( getEndpoint('delete'), {id: id});
    const {status} = response;

    return { status: !!status };
}

/* get image by id */
const getImageById = async (id) => {
    const response = await axios.get( getEndpoint('image'), {params: {id}});
    return response.data;
}

/* save crop and blur data */
const saveImageInfo = async (data) => {
    const response = await axios.post( getEndpoint('image/info'), data);
    const {status} = response;

    return { status: !!status };
}

/* get image last info (from history) */
const getLastImageInfoById = async (id, type) => {
    const response = await axios.get( getEndpoint('image/last/info'), {params: {id, type}});
    const {status, data} = response;

    return { status: !!status , data};
}

/* get image logs history */
const getImageLogsById = async (id) => {
    const response = await axios.get( getEndpoint('image/logs'), {params: {id}});
    const {data, statusText} = response;

    if(data){
        const {status , logs, image, message} = data;
        return { status: !!status , logs, image, message};
    }

    return { status: false , message: statusText};
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