import { fetchApi } from '../config';

export const usePublicFetch = () => {
    const requestCode = async (phoneNumber) => {
        const response = await fetchApi('/request-code', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                phoneNumber
            })
        });

        if (!response.ok) throw new Error();

        return await response.json();
    };

    const login = async (code) => {
        const response = await fetchApi('/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                code
            })
        });

        if (!response.ok) throw new Error();

        return await response.json();
    };

    return {
        requestCode,
        login
    };
};
