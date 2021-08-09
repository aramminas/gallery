import {ADD_IMAGE, REMOVE_IMAGE, ADD_ALL_IMAGES} from "../constants";
import api from "../../api/api";
import { v4 as uuidv4 } from 'uuid';
import {toggle_loader} from "./loaderAction";

export const add_image = data => async dispatch => {
    const imageData = {
        id: uuidv4(),
        url: data
    };
    const result = await api.addImage(imageData);
    const resData = await result;
    if(resData.status){
        dispatch({type: ADD_IMAGE, payload : imageData});
        dispatch(toggle_loader(''));
    }
}

export const remove_image = id => async dispatch => {
    const result = await api.removeImage(id);
    const resData = await result;
    if(resData.status){
        dispatch({type: REMOVE_IMAGE, payload : id});
    }
}

export const add_all_images = () => async dispatch => {
    const result = await api.getAllImages();
    const resData = await result;
    if(resData.status && resData.data.length > 0){
        dispatch({type: ADD_ALL_IMAGES, payload : resData.data});
    }
}
