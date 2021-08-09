import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk';

// Reducers
import imagesReducer from "../store/reducers/imagesReducer";
import modalReducer from "../store/reducers/modalReducer";
import loaderReducer from "./reducers/loaderReducer";

const AllReducers = combineReducers({
    images: imagesReducer,
    modal: modalReducer,
    loader: loaderReducer,
});

const InitialState = {};
const middleware = [thunk];

const store = createStore(
    AllReducers,
    InitialState,
    compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
);

export default store;