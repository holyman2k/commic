import {combineReducers} from "redux";
import images from "./imagesReducer";
import settings from "./settingsReducer";
import busy from "./busyReducer"

export default combineReducers({
    images,
    settings,
    busy,
});