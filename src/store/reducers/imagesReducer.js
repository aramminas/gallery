import {ADD_IMAGE, REMOVE_IMAGE, ADD_ALL_IMAGES} from "../constants";

const initState = [];

// const initState = [
//     {
//         id: "196308f3-7d3f-4a1e-be5d-4514ca23b895",
//         url: "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg"
//     },
//     {
//         id: "3efe0699-4696-4c33-b1a4-ddc672be37ad",
//         url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9R6WVd7lIJePzBBD2MiZRy511oh9ONh0H_w&usqp=CAU"
//     },
//     {
//         id:"42d1d9ec-cb7e-460c-b4f4-6f9b80e17a1a",
//         url:"https://i.gadgets360cdn.com/large/Moon_image_prathamesh_jaju_instagram_1621246168466.jpg"
//     }
// ];

const newsReducer = (state= initState, {type, payload}) => {
    switch (type) {
        case ADD_IMAGE:
            const newState = [...state];
            newState.push(payload);
            return [...newState];
        case ADD_ALL_IMAGES:
            return [...payload];
        case REMOVE_IMAGE:
            return state.filter(item => item.id !== payload);
        default:
            return state
    }
};

export default newsReducer;