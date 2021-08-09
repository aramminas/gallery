import {TOGGLE_LOADER} from "../constants";

export const toggle_loader = data => {
    return {type: TOGGLE_LOADER, payload : data};
}