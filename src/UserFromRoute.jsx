import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RefreshLatestButton from './components/RefreshLatestButton';
import Header from './Header';
import { useAuthFetch } from './hooks/useAuthFetch';
import { isDataEqual } from './utils';
import MainLayout from './layouts/MainLayout';
import LoadingContent from './LoadingContent';
import User from './User';
import { useUsersStore } from './store/store-users';

export default function UserFromRoute() {
    const { username } = useParams();
    const { fetchLatestPhotosByUsername } = useAuthFetch();
    const setFilteredUsers = useUsersStore((state) => state.setFilteredUsers);

    const {
        data: user,
        isFetching,
        refetch
    } = useQuery(['fetchUser', username], () => fetchLatestPhotosByUsername(username), {
        refetchOnWindowFocus: false,
        isDataEqual,
        onSuccess: (data) => {
            setFilteredUsers([data]);
        }
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
