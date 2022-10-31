import User from './User';
import { useAuthFetch } from './hooks/useAuthFetch';
import { useQuery } from '@tanstack/react-query';
import RefreshLatestButton from './components/RefreshLatestButton';
import { useState } from 'react';
import Header from './Header';
import LoadingContent from './LoadingContent';
import FilterSection from './FilterSection';
import MainLayout from './layouts/MainLayout';
import { appToast, isDataEqual } from './utils';
import { useStore } from './store/store';

export default function Feed() {
    const { fetchLatestPhotos } = useAuthFetch();
    const setAllUsers = useStore((state) => state.setAllUsers);
    const filteredUsers = useStore((state) => state.filteredUsers);

    const { isFetching, refetch } = useQuery(['feed'], fetchLatestPhotos, {
        refetchOnWindowFocus: false,
        isDataEqual,
        onSuccess: setAllUsers
    });

    return (
        <MainLayout
            header={
                <Header isFetching={isFetching}>
                    <RefreshLatestButton fetchFunc={refetch} />
                </Header>
            }
        >
            <FilterSection />
            <LoadingContent isFetching={isFetching}>
                {!isFetching && filteredUsers !== null && !filteredUsers?.length && (
                    <h2>Empty Feed</h2>
                )}
                {filteredUsers?.map((user) => (
                    <User key={user.id} user={user} />
                ))}
            </LoadingContent>
        </MainLayout>
    );
}
