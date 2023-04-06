import { useContext, useEffect, useMemo, useState } from 'react';
import Cookies from 'universal-cookie';
import AuthUserContext from '../context/AuthUserContext';
import { appToast, fetchAuthApi, isInteger } from '../utils';

export const useAuthFetch = () => {
    const [authUser, setAuthUser] = useContext(AuthUserContext);
    const [cached, setCached] = useState(false);
    const cookies = useMemo(() => new Cookies(), []);

    const authFetchApi = async (url, options, handleErrorStatus = null) => {
        try {
            const response = await fetchAuthApi(
                url +
                    `?${new URLSearchParams({
                        ts: cookies?.get('bereal-user-info')?.loggedInAt
                    })}`,
                options
            );
            if (!response.ok) throw new Error(response.status);

            return await (response?.json() ?? response);
        } catch (error) {
            if (!isInteger(error?.message) || error?.message >= 500) {
                return appToast('Something went wrong', 'error');
            }
            if (handleErrorStatus && handleErrorStatus.hasOwnProperty(error?.message)) {
                return handleErrorStatus[error.message]() ?? null;
            }

            if (!authUser) appToast('Session expired', 'error');

            setAuthUser(null);
        }
    };

    const fetchLatestPhotos = async () => {
        return await authFetchApi(
            '/feed',
            {
                cache: cached ? 'force-cache' : 'no-store'
            },
            { 400: () => appToast('Error fetching feed', 'error') }
        );
    };

    const fetchLatestPhotosUsers = async () => {
        return await authFetchApi(
            '/users',
            {
                cache: cached ? 'force-cache' : 'no-store'
            },
            { 400: () => appToast('Error fetching feed', 'error') }
        );
    };

    const fetchLatestPhotosByUsername = async (username) => {
        return await authFetchApi(
            `/user/${username}`,
            {
                cache: cached ? 'force-cache' : 'no-store'
            },
            { 404: null }
        );
    };

    useEffect(() => {
        if (cached) setCached(false);
    }, [cached]);

    useEffect(() => {
        if (!authUser) {
            cookies.remove('bereal-user-info');
            cookies.remove('bereal-auth');
        }
    }, [authUser, cookies]);

    return {
        fetchLatestPhotos,
        fetchLatestPhotosByUsername,
        fetchLatestPhotosUsers
    };
};
