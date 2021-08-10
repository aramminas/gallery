import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getEndpoint = (e) => `${API_URL}/${e}`;

/* get all images from database */
const getAllImages = async (limit, offset) => {
    const response = await axios.get( getEndpoint('all'), {params: {limit, offset}});
    const {status, data} = await response;
    if(status){
        return data;
    }
}

/* add new image */
const addImage = async (data) => {
    const response = await axios.post( getEndpoint('add'), data);
    const {status} = await response;

    return { status:  !!status };
}

/* remove image */
const removeImage = async (id) => {
    const response = await axios.post( getEndpoint('delete'), {id: id});
    const {status} = await response;

    return { status: !!status };
}

/* get image by id */
const getImageById = async (id) => {
    const response = await axios.get( getEndpoint('image'), {params: {id}});
    return response.data;
}

const api = {
    addImage,
    getAllImages,
    removeImage,
    getImageById,
};

export default api;