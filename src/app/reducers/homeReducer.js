import clone from "clone";

const initialState = {
    greeting: "Welcome",
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "WELCOME": {
            const newState = clone(state);
            newState.greeting = "Welcome, Hello World!";
            return newState;
        }
    }
    return state;
}