import {CHANGE_TOTAL, SET_TOTAL, CHANGE_LIMIT, CHANGE_OFFSET} from "../constants";

export const changeTotal = (data) => {
    return {type: CHANGE_TOTAL, payload : data};
}

export const setTotal = (data) => {
    return {type: SET_TOTAL, payload : data};
}

export const changeLimit = (data) => {
    return {type: CHANGE_LIMIT, payload : data};
}

export const changeOffset = (data) => {
    return {type: CHANGE_OFFSET, payload : data};
}