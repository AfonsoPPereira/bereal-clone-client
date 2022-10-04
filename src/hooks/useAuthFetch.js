import { useCallback, useContext } from 'react';
import Cookies from 'universal-cookie';
import AuthUserContext from '../context/AuthUserContext';
import { fetchApi } from '../config';
import appToast from '../utils';

export const useAuthFetch = () => {
    const [authUser, setAuthUser] = useContext(AuthUserContext);

    const authFetchApi = useCallback(
        async (url, options, handleErrorStatus = null) => {
            try {
                const response = await fetchApi(url, { ...options, credentials: 'include' });
                if (!response.ok) throw new Error(response.status);

                return (await response?.json()) ?? response;
            } catch (error) {
                if (handleErrorStatus && error?.message == handleErrorStatus) return;

                if (!authUser) appToast('User not logged in!', 'error');

                setAuthUser(null);
                const cookies = new Cookies();
                cookies.remove('bereal-user-info');
                cookies.remove('bereal-auth');
            }
        },
        [authUser, setAuthUser]
    );

    const fetchLatestPhotos = useCallback(
        async (cached = false) => {
            return await authFetchApi('/feed', {
                cache: cached ? 'force-cache' : 'reload'
            });
        },
        [authFetchApi]
    );

    const fetchLatestPhotosByUsername = useCallback(
        async (username, cached = false) => {
            return await authFetchApi(
                `/user/${username}`,
                {
                    cache: cached ? 'force-cache' : 'reload'
                },
                404
            );
        },
        [authFetchApi]
    );

    const logout = useCallback(async () => {
        return await authFetchApi('/logout', {
            method: 'POST'
        });
    }, [authFetchApi]);

    const downloadImage = async (url) => {
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

    return {
        fetchLatestPhotos,
        fetchLatestPhotosByUsername,
        logout,
        downloadImage
    };
};
