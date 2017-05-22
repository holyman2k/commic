export function onSettingsChange(settings) {
    return {
        type: "SETTINGS_CHANGED",
        payload: settings,
    }
}