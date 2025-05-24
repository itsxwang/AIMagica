import { useState, useEffect } from 'react';

function loadFromStorage<T>(key: string, initialValue: T | (() => T) ) {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue) {
        return JSON.parse(localStorageValue);
    }
    return initialValue instanceof Function ? initialValue() : initialValue;
}

export default function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => loadFromStorage(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}