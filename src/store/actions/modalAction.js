import {TOGGLE_MODAL} from "../constants";

export const toggle_modal = data => {
    return {
        type: TOGGLE_MODAL, payload : data
    };
}