import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';

// Reducers
import imagesReducer from "./reducers/imagesReducer";
import modalReducer from "./reducers/modalReducer";
import loaderReducer from "./reducers/loaderReducer";
import paginationReducer from "./reducers/paginationReducer";
import ongoingParametersReducer from "./reducers/ongoingParametersReducer";
import authReducer from "./reducers/authReducer";

const AllReducers = combineReducers({
    images: imagesReducer,
    modal: modalReducer,
    loader: loaderReducer,
    pagination: paginationReducer,
    parameters: ongoingParametersReducer,
    auth: authReducer,
});

const InitialState = {};
const middleware = [thunk];

const store = createStore(
    AllReducers,
    InitialState,
    compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
);

export default store;