import User from './User';
import { useAuthFetch } from './hooks/useAuthFetch';
import { useQuery } from '@tanstack/react-query';
import RefreshLatestButton from './components/RefreshLatestButton';
import { useEffect, useState } from 'react';
import Header from './Header';
import LoadingContent from './LoadingContent';
import FilterSection from './FilterSection';
import MainLayout from './layouts/MainLayout';
import { isDataEqual } from './utils';

export default function Feed() {
    const { fetchLatestPhotos } = useAuthFetch();
    const [users, setUsers] = useState(null);

    const {
        data: allUsers,
        isFetching,
        refetch
    } = useQuery(['feed'], fetchLatestPhotos, {
        refetchOnWindowFocus: false,
        isDataEqual
    });

    return (
        <MainLayout
            header={
                <Header isFetching={isFetching}>
                    <RefreshLatestButton fetchFunc={refetch} />
                </Header>
            }
        >
            <FilterSection users={[allUsers, setUsers]} />
            <LoadingContent isFetching={isFetching}>
                {!isFetching && users !== null && !users?.length && <h2>Empty Feed</h2>}
                {users?.map((user) => (
                    <User key={user.id} user={user} />
                ))}
            </LoadingContent>
        </MainLayout>
    );
}
