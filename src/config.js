const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

const defaultOptions = () => ({
    cache: 'no-store',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': localStorage.getItem('be-real-api-key')
    }
});

export const fetchApi = (path, options) =>
    fetch(`${API_URL}${path}`, { ...defaultOptions(), ...options });
