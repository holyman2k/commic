import axios from "axios"
import LZString from "lz-string";
import { createList } from "./helpers/listHelper"

export function decompressSettings(text) {
    const json = LZString.decompressFromEncodedURIComponent(text);
    const settings = JSON.parse(json);
    settings.list = settings.list || createList(settings.template, settings.total, settings.length);
    return { type: "SETTINGS_CHANGED", payload: settings };
}

export function fetchSettings(url) {
    return function (dispatch) {
        dispatch({type:"FETCH_SETTINGS", payload: url});
        axios.get(url)
            .then(response => {
                return dispatch({ type: "SETTINGS_CHANGED", payload: response.data });
            })
            .catch(error => {
            });
    }
}