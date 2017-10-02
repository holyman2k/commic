import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import images from "./imagesReducer";
import settings from "./settingsReducer";
import busy from "./busyReducer"

export default combineReducers({
    images,
    settings,
    busy,
    routing: routerReducer
});