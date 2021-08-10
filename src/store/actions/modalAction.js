import {TOGGLE_MODAL} from "../constants";

export const toggleModal = data => {
    return {
        type: TOGGLE_MODAL, payload : data
    };
}