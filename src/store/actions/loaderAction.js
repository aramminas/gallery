import {TOGGLE_LOADER} from "../constants";

export const toggleLoader = data => {
    return {type: TOGGLE_LOADER, payload : data};
}