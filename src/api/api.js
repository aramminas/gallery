import axios from "axios";
const API_URL = "http://localhost:3050";


const getData = async () => {
    const response = await fetch('/database.json');
    return await response.json();
}

/* get all images from database */
const getAllImages = async () => {
    const response =  await axios.get(API_URL +'/all');
    const {status, data} = await response;
    if(status){
        return await data;
    }
}

/* add new image */
const addImage = async (data) => {
    const response = await axios.post(API_URL +'/add', data);
    const {status} = await response;
    if(status){
        return { status: true };
    }
    return { status: false };
}

/* remove image */
const removeImage = async (id) => {
    const response = await axios.post(API_URL +'/delete', {id: id});
    const {status} = await response;
    if(status){
        return { status: true };
    }
    return { status: false };
}

const api = {
    getData,
    addImage,
    getAllImages,
    removeImage
};

export default api;