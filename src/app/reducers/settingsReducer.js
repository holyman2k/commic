import clone from "clone";


const initialState = {
    expand: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "EXPAND": {
            const newState = clone(state);
            newState.settings = payload;
            newState.expand = true;
            return newState;
        }
        case "COLLAPSE": {
            const newState = clone(state);
            newState.settings = payload;
            newState.expand = false;
            return newState;
        }
    }
    return state;
}