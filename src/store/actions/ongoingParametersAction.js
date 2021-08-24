import {SET_CURRENT_PARAMETERS, RESET_ALL_PARAMETERS} from "../constants";

export const setCurrentParameters = data => {
    return {
        type: SET_CURRENT_PARAMETERS, payload : {paramsType: data.type, data}
    };
}

export const resetAllParameters = data => {
    return {
        type: RESET_ALL_PARAMETERS, payload : data
    };
}