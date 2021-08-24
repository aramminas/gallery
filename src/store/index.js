import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';

// Reducers
import imagesReducer from "./reducers/imagesReducer";
import modalReducer from "./reducers/modalReducer";
import loaderReducer from "./reducers/loaderReducer";
import paginationReducer from "./reducers/paginationReducer";
import ongoingParameters from "./reducers/ongoingParametersReducer";

const AllReducers = combineReducers({
    images: imagesReducer,
    modal: modalReducer,
    loader: loaderReducer,
    pagination: paginationReducer,
    parameters: ongoingParameters,
});

const InitialState = {};
const middleware = [thunk];

const store = createStore(
    AllReducers,
    InitialState,
    compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
);

export default store;