export function busy(isBusy) {
    return {
        type: "BUSY",
        payload: isBusy,
    }
}