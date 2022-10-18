import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import RefreshLatestButton from './components/RefreshLatestButton';
import Header from './Header';
import { useAuthFetch } from './hooks/useAuthFetch';
import LoadingContent from './LoadingContent';
import User from './User';

export default function UserFromRoute() {
    const { username } = useParams();
    const { isHeader } = useOutletContext() || {};
    const { fetchLatestPhotosByUsername } = useAuthFetch();
    const [user, setUser] = useState(null);

    const { isFetching, refetch } = useQuery(
        ['fetchUser', username],
        () => fetchLatestPhotosByUsername(username),
        {
            refetchOnWindowFocus: false,
            onSuccess: setUser
        }
    );

    if (isHeader) {
        return (
            <Header isFetching={isFetching}>
                <RefreshLatestButton fetchFunc={refetch} />
                <Button size="small" variant="outlined" sx={{ width: 'fit-content' }}>
                    <Link to="/feed" style={{ textDecoration: 'none' }}>
                        Go Back to Feed
                    </Link>
                </Button>
            </Header>
        );
    }

    return (
        <LoadingContent isFetching={isFetching}>
            <User isFetching={isFetching} user={user} />
        </LoadingContent>
    );
}
