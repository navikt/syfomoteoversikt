export const hentLocalStorageState = (stateName, defaultState) => {
    try {
        const serializedState = localStorage.getItem(stateName);
        if (serializedState === null) {
            return defaultState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return defaultState;
    }
};
export const lagreState = (stateName, state) => {
    try {
        localStorage.setItem(stateName, JSON.stringify(state));
    } catch (err) {
        //
    }
};
