import User from './User';
import { useAuthFetch } from './hooks/useAuthFetch';
import { useQuery } from '@tanstack/react-query';
import RefreshLatestButton from './components/RefreshLatestButton';
import Header from './Header';
import LoadingContent from './LoadingContent';
import FilterSection from './FilterSection';
import MainLayout from './layouts/MainLayout';
import { isDataEqual } from './utils';
import { useUsersStore } from './store/store-users';
import { useMemo, useState } from 'react';
import useStorage from './hooks/useStorage';
import { useEffect } from 'react';
import LazyLoad from 'react-lazyload';

export default function Feed() {
    const { fetchLatestPhotos } = useAuthFetch();
    const users = useUsersStore((state) => state.users);
    const setAllUsers = useUsersStore((state) => state.setAllUsers);

    const [filteredUsersId, setFilteredUsersId] = useState([]);
    const [filterSection, setFilterSection] = useStorage('filtered-users', {
        totalUsers: 0,
        sortBy: 'latestDate',
        options: []
    });
    const [selectOpen, setSelectOpen] = useState(false);

    const filteredUsers = useMemo(
        () =>
            !filteredUsersId?.length
                ? users
                : users?.filter((user) => filteredUsersId.includes(user.id)) || [],
        [filteredUsersId, users]
    );

    const { isFetching, refetch } = useQuery(['feed'], fetchLatestPhotos, {
        refetchOnWindowFocus: false,
        isDataEqual,
        onSuccess: (data) => {
            setFilterSection((state) => ({ ...state, totalUsers: data.length }));
            setAllUsers(data);
        }
    });

    useEffect(() => {
        if (!selectOpen) {
            setFilteredUsersId(filterSection.options?.map((user) => user.id) || []);
        }
    }, [filterSection.options, selectOpen]);

    return (
        <MainLayout
            header={
                <Header isFetching={isFetching}>
                    <RefreshLatestButton fetchFunc={refetch} />
                </Header>
            }
        >
            <FilterSection
                filterSection={[filterSection, setFilterSection]}
                selectOpen={[selectOpen, setSelectOpen]}
            />
            <LoadingContent isFetching={isFetching}>
                {!isFetching && !filteredUsers?.length && <h2>Empty Feed</h2>}
                {filteredUsers?.map((user) => (
                    <LazyLoad key={user.id} height={200} offset={100}>
                        <User user={user} />
                    </LazyLoad>
                ))}
            </LoadingContent>
        </MainLayout>
    );
}
