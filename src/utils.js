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

const getFileName = (url) => url.match(/.*\/(\w+\.\w+)$/).pop();

export const downloadImage = async (url) => {
    try {
        const response = await fetchAuthApi(`/download?${new URLSearchParams({ url })}`);
        if (!response.ok) throw new Error();

        const data = await response.blob();

        const a = document.createElement('a');
        a.href = URL.createObjectURL(data);
        a.download = getFileName(url);
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

export const imgStyle = {
    width: 192,
    height: 256,
    ratio: 2
};

export const compressImg = (url) =>
    url?.replace(
        /(^https:\/\/.*\/Photos\/)/i,
        `https://storage.bere.al/cdn-cgi/image/width=${imgStyle.width * imgStyle.ratio},height=${
            imgStyle.height * imgStyle.ratio
        }/Photos/`
    );

export const uncompressImg = (url) =>
    url?.replace(
        /(^https:\/\/.+\/width=.+,height=.+\/Photos\/)/i,
        'https://cdn.bereal.network/Photos/'
    );
