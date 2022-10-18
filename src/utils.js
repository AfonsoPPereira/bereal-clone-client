import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function appToast(msg, type = 'success', options = {}) {
    return toast(msg, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        pauseOnFocusLoss: false,
        progress: undefined,
        ...options,
        type
    });
}

export const downloadImage = async (url) => {
    try {
        const response = await fetchApi(`/download?${new URLSearchParams({ url })}`);
        if (!response.ok) throw new Error();

        const data = await response.blob();

        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(data);
        a.download = `${url.match(/^.+\/(.+)\.\w+$/).pop()}.png`;
        a.click();
    } catch (error) {}
};

export const isInteger = (val) => String(val).match(/\d+/);
