import clone from "clone";

const localStorageSettings = window.localStorage.settings ? JSON.parse(window.localStorage.settings) : null;
const localStorageIndex = window.localStorage.index ? parseInt(window.localStorage.index) : 0;

const initialState = {
    settings: localStorageSettings || {
        template: "",
        length: 2,
        total: 1,
        list: [],
    },
    index: localStorageIndex || 0
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "SETTINGS_CHANGED": {
            const newState = clone(state);
            newState.settings = payload;
            newState.index = 0;
            window.localStorage.settings = JSON.stringify(payload);
            window.localStorage.index = 0;
            return newState;
        }
    }
    return state;
}