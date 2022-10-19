import User from './User';
import { useAuthFetch } from './hooks/useAuthFetch';
import { useQuery } from '@tanstack/react-query';
import RefreshLatestButton from './components/RefreshLatestButton';
import { useState } from 'react';
import Header from './Header';
import LoadingContent from './LoadingContent';
import FilterSection from './FilterSection';
import MainLayout from './layouts/MainLayout';
import { useFeedChangedContent } from './hooks/useFeedChangedContent';

export default function Feed() {
    const { fetchLatestPhotos } = useAuthFetch();
    const [users, setUsers] = useState([]);
    const { checkIfUpToDate } = useFeedChangedContent();

    const { data, isFetching, refetch } = useQuery(['feed'], fetchLatestPhotos, {
        refetchOnWindowFocus: false,
        onSuccess: checkIfUpToDate
    });

    return (
        <MainLayout
            header={
                <Header isFetching={isFetching}>
                    <RefreshLatestButton fetchFunc={refetch} />
                </Header>
            }
        >
            <FilterSection isFetching={isFetching} users={[data, setUsers]} />
            <LoadingContent isFetching={isFetching}>
                {!!users.length && users.map((user) => <User key={user.id} user={user} />)}
            </LoadingContent>
        </MainLayout>
    );
}
