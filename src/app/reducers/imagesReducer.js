import clone from "clone";

const initialState = {
    settings: {
        template: "",
        length: 2,
        total: 1,
        list: [],
    },
    index: 0,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "SETTINGS_CHANGED": {
            const newState = clone(state);
            newState.settings = payload;
            newState.index = 0;
            return newState;
        }
        case "SETTINGS_LIST_CHANGED": {
            const newState = clone(state);
            newState.settings.list = payload;
            newState.index = 0;
            return newState;
        }
    }
    return state;
}