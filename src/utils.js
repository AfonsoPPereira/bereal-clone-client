import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchApi } from './config';

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

export const fetchAuthApi = (url, options) => fetchApi(url, { ...options, credentials: 'include' });

export const downloadImage = async (url) => {
    try {
        const response = await fetchAuthApi(`/download?${new URLSearchParams({ url })}`);
        if (!response.ok) throw new Error();

        const data = await response.blob();

        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(data);
        a.download = `${url.match(/^.+\/(.+)\.\w+$/).pop()}.png`;
        a.click();
    } catch (error) {}
};

export const isInteger = (val) => String(val).match(/\d+/);

const getLatestTakenAt = (data) => (data?.[0] ?? data)?.photos?.[0]?.takenAt;

export const isDataEqual = (oldData, newData) => {
    if (!oldData || !newData) return;

    const lastTakenAtOld = getLatestTakenAt(oldData);
    const lastTakenAtNew = getLatestTakenAt(newData);

    if (lastTakenAtOld && lastTakenAtOld === lastTakenAtNew) {
        appToast('Up to date.');
    }
};
