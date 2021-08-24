import {SET_CURRENT_PARAMETERS, RESET_ALL_PARAMETERS} from "../constants";

const initState = {
    crop: {},
    blur: {},
    resize: {},
};

const ongoingParametersReducer = (state= initState, {type, payload}) => {
    switch (type) {
        case SET_CURRENT_PARAMETERS:
            const {paramsType, data} = payload;
            const newState = {...state, [paramsType]: {...data}};
            return {...newState};
        case RESET_ALL_PARAMETERS:
            return {...initState};
        default:
            return state
    }
};

export default ongoingParametersReducer;