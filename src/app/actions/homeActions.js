export function welcome(greeting) {
    return {
        type: "WELCOME",
        payload: greeting,
    }
}