import { createList } from "./helpers/listHelper"

export function templateChanged(settings) {
    const { template, length, total } = settings
    settings.list = createList(template, total, length);
    return {
        type: "SETTINGS_CHANGED",
        payload: settings
    }
}

export function listTextChanged(text) {
    const list = text.trim().split("\n").map(_ => _.replace(/[\",]/g, "").trim())
    settings.list = list
    return { type: "SETTINGS_CHANGED", payload: settings }
}