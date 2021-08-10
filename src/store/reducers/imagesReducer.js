import {ADD_IMAGE, REMOVE_IMAGE, GET_ALL_IMAGES} from "../constants";

const initState = [];

const newsReducer = (state= initState, {type, payload}) => {
    switch (type) {
        case ADD_IMAGE:
            const newState = [...state];
            newState.push(payload);
            return [...newState];
        case GET_ALL_IMAGES:
            return [...payload];
        case REMOVE_IMAGE:
            return state.filter(item => item.id !== payload);
        default:
            return state
    }
};

export default newsReducer;