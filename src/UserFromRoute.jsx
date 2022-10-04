import React, { useEffect, useMemo, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useAuthFetch } from './hooks/useAuthFetch';
import User from './User';

export default function UserFromRoute() {
    const { username } = useParams();
    const { fetchLatestPhotosByUsername } = useAuthFetch();
    const {
        loading: [loading, setLoading],
        fetchLatestContent: [fetchLatestContent]
    } = useOutletContext();
    const [user, setUser] = useState();
    const cookies = useMemo(() => new Cookies(), []);

    useEffect(() => {
        setLoading(true);

        fetchLatestPhotosByUsername(username, fetchLatestContent.cached)
            .then((user) => setUser(user))
            .finally(() => setLoading(false));
    }, [fetchLatestContent, cookies, username, setLoading, fetchLatestPhotosByUsername]);

    return !loading && <User user={user} />;
}
