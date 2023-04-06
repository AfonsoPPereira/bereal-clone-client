import User from './User';
import { useAuthFetch } from './hooks/useAuthFetch';
import { useQuery } from '@tanstack/react-query';
import RefreshLatestButton from './components/RefreshLatestButton';
import Header from './Header';
import LoadingContent from './LoadingContent';
import FilterSection from './FilterSection';
import MainLayout from './layouts/MainLayout';
import { imgStyle, isDataEqual } from './utils';
import { useUsersStore } from './store/store-users';
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import LoadingSpinner from './components/LoadingSpinner';

export default function Feed() {
    const { fetchLatestPhotos } = useAuthFetch();
    const filteredUsers = useUsersStore((state) => state.filteredUsers);
    const [users, setUsers] = useState([]);

    const { isFetching, refetch, dataUpdatedAt, data } = useQuery(['feed'], fetchLatestPhotos, {
        refetchOnWindowFocus: false,
        isDataEqual,
        onSuccess: (data) => setUsers(!Array.isArray(data) ? [] : data)
    });

    return (
        <MainLayout
            header={
                <Header isFetching={isFetching}>
                    <RefreshLatestButton fetchFunc={refetch} />
                </Header>
            }
        >
            <FilterSection users={users} dataUpdatedAt={dataUpdatedAt} />
            <LoadingContent isFetching={isFetching}>
                {!isFetching && !data?.length && <h2>Empty Feed</h2>}
                {filteredUsers?.map((user) => (
                    <LazyLoad
                        key={user.id}
                        height={imgStyle.height}
                        placeholder={
                            <div
                                className="placeholder-user-gallery"
                                style={{ height: `${imgStyle.height}px` }}
                            >
                                <LoadingSpinner />
                            </div>
                        }
                    >
                        <User user={user} />
                    </LazyLoad>
                ))}
            </LoadingContent>
        </MainLayout>
    );
}
