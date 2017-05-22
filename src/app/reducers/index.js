import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import images from "./imagesReducer";

export default combineReducers({
    images,
    routing: routerReducer
});