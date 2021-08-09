import {TOGGLE_LOADER} from "../constants";

const initState = {
    state: false,
};

const loaderReducer = (state= initState, {type, payload}) => {
    switch (type) {
        case TOGGLE_LOADER:
            return {
                state: !state.state,
            };
        default:
            return state
    }
};

export default loaderReducer;