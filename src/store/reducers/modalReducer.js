import {TOGGLE_MODAL} from "../constants";

const initState = {
    state: false,
    id: '',
};

const modalReducer = (state= initState, {type, payload}) => {
    switch (type) {
        case TOGGLE_MODAL:
            return {
                state: !state.state,
                id: payload,
            };
        default:
            return state
    }
};

export default modalReducer;