import {CHANGE_TOTAL, SET_TOTAL, CHANGE_LIMIT, CHANGE_OFFSET} from "../constants";

const initState = {
    total: 0,
    offset: 0,
    limit: 5,
};

const paginationReducer = (state= initState, {type, payload}) => {
    switch (type) {
        case CHANGE_TOTAL:
            return {
                ...state,
                total: state.total + payload,
            };
        case SET_TOTAL:
            return {
                ...state,
                total: payload,
            };
        case CHANGE_LIMIT:
            return {
                ...state,
                limit: payload,
            };
        case CHANGE_OFFSET:
            return {
                ...state,
                offset: payload,
            };
        default:
            return state
    }
};

export default paginationReducer;