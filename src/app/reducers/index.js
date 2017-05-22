import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import images from "./imagesReducer";
import settings from "./settingsReducer";

export default combineReducers({
    images,
    settings,
    routing: routerReducer
});