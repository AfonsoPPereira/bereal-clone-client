import { useState } from 'react';

export default function useStorage(key, initialValue, storageType = 'localStorage') {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined' || !window?.[storageType]) {
            return initialValue;
        }

        try {
            const item = window[storageType].getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);

            if (typeof window !== 'undefined' && window?.[storageType]) {
                window[storageType].setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {}
    };

    return [storedValue, setValue];
}
