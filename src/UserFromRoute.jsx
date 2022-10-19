import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RefreshLatestButton from './components/RefreshLatestButton';
import Header from './Header';
import { useAuthFetch } from './hooks/useAuthFetch';
import { useFeedChangedContent } from './hooks/useFeedChangedContent';
import MainLayout from './layouts/MainLayout';
import LoadingContent from './LoadingContent';
import User from './User';

export default function UserFromRoute() {
    const { username } = useParams();
    const { fetchLatestPhotosByUsername } = useAuthFetch();
    const { checkIfUpToDate } = useFeedChangedContent();

    const {
        data: user,
        isFetching,
        refetch
    } = useQuery(['fetchUser', username], () => fetchLatestPhotosByUsername(username), {
        refetchOnWindowFocus: false,
        onSuccess: checkIfUpToDate
    });

    return (
        <MainLayout
            header={
                <Header isFetching={isFetching}>
                    <RefreshLatestButton fetchFunc={refetch} />
                    <Button size="small" variant="outlined" sx={{ width: 'fit-content' }}>
                        <Link to="/feed" style={{ textDecoration: 'none' }}>
                            Go Back to Feed
                        </Link>
                    </Button>
                </Header>
            }
        >
            <LoadingContent isFetching={isFetching}>
                <User isFetching={isFetching} user={user} />
            </LoadingContent>
        </MainLayout>
    );
}
