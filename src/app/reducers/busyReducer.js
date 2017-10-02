import clone from "clone";

const initialState = {
    isBusy: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'BUSY': {
            const newState = clone(state);
            newState.isBusy = payload;
            return newState;
        }
    }
    return state;
}