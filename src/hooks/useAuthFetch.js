import { useContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import AuthUserContext from '../context/AuthUserContext';
import { appToast, fetchAuthApi, isInteger } from '../utils';

export const useAuthFetch = () => {
    const [authUser, setAuthUser] = useContext(AuthUserContext);
    const [cached, setCached] = useState(true);

    const authFetchApi = async (url, options, handleErrorStatus = null) => {
        try {
            const response = await fetchAuthApi(url, options);
            if (!response.ok) throw new Error(response.status);

            return (await response?.json()) ?? response;
        } catch (error) {
            if (!isInteger(error?.message)) {
                return appToast('Something went wrong', 'error');
            }
            if (handleErrorStatus && error?.message == handleErrorStatus) return;

            if (!authUser) appToast('Session expired', 'error');

            setAuthUser(null);
            const cookies = new Cookies();
            cookies.remove('bereal-user-info');
            cookies.remove('bereal-auth');
        }
    };

    const fetchLatestPhotos = async () => {
        return await authFetchApi('/feed', {
            cache: cached ? 'force-cache' : 'reload'
        });
    };

    const fetchLatestPhotosByUsername = async (username) => {
        return await authFetchApi(
            `/user/${username}`,
            {
                cache: cached ? 'force-cache' : 'reload'
            },
            404
        );
    };

    const logout = async () => {
        return await authFetchApi('/logout', {
            method: 'POST'
        });
    };

    useEffect(() => {
        if (cached) setCached(false);
    }, [cached]);

    return {
        fetchLatestPhotos,
        fetchLatestPhotosByUsername,
        logout
    };
};
