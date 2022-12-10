export enum LocalStorageKey {
    CURRENT_USER = "CURRENT_USER",
    TOKEN_DATA = "TOKEN_DATA"
}

export const useLocalStorage = () => {

    const set = <T = string>(key: LocalStorageKey, value: T) => {
        if (typeof window === "undefined") {
            return;
        }
        if (value == null) {
            window.localStorage.removeItem(key.toString());
        } else {
            window.localStorage.setItem(key.toString(), JSON.stringify(value));
        }
    }

    const get = <T = string>(key: LocalStorageKey): T | null => {
        if (typeof window === "undefined") {
            return null;
        }
        const item = window.localStorage.getItem(key.toString());
        if (!item) {
            return null;
        }

        return JSON.parse(item) as T | null;
    }

    return { get, set };
}