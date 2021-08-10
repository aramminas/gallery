import {ADD_IMAGE, REMOVE_IMAGE, GET_ALL_IMAGES} from "../constants";
import api from "../../api/api";
import { v4 as uuidv4 } from 'uuid';
import {toggleLoader} from "./loaderAction";
import {changeTotal} from "./paginationAction";

export const addImage = data => async dispatch => {
    const imageData = {
        id: uuidv4(),
        url: data
    };

    const resData = await api.addImage(imageData);

    if(resData.status){
        dispatch({type: ADD_IMAGE, payload : imageData});
        dispatch(toggleLoader(''));
    }
}

export const removeImage = id => async dispatch => {
    const resData = await api.removeImage(id);
    if(resData.status){
        dispatch({type: REMOVE_IMAGE, payload : id});
    }
}

export const getAllImages = (limit, offset) => async dispatch => {
    const resData = await api.getAllImages(limit, offset);
    if(resData.status && resData.data.length > 0){
        dispatch({type: GET_ALL_IMAGES, payload : resData.data});
        dispatch(changeTotal(resData.total));
    }
}

export const getImageById = (id) => async dispatch => {
    const resData = await api.getImageById(id);
    if(resData.status && resData.image){
        dispatch({type: GET_ALL_IMAGES, payload : resData.image});
    }
}
