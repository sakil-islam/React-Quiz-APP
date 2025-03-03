export const loadState = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        console.error("Error saving state to localStorage:", err);
    }
};

export const removeState = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error("Error removing state from localStorage:", err);
    }
};