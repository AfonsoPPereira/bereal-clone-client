import PropTypes from 'prop-types';
import User from './User';
import { useOutletContext } from 'react-router-dom';
import { useAuthFetch } from './hooks/useAuthFetch';
import { useQuery } from '@tanstack/react-query';
import RefreshLatestButton from './components/RefreshLatestButton';
import { useState } from 'react';
import Header from './Header';
import LoadingContent from './LoadingContent';
import FilterSection from './FilterSection';

export default function Feed() {
    const { isHeader } = useOutletContext() || {};
    const { fetchLatestPhotos } = useAuthFetch();
    const [users, setUsers] = useState([]);

    const { data, isFetching, refetch } = useQuery(['feed'], fetchLatestPhotos, {
        refetchOnWindowFocus: false
    });

    if (isHeader)
        return (
            <Header isFetching={isFetching}>
                <RefreshLatestButton fetchFunc={refetch} />
            </Header>
        );

    return (
        <>
            <FilterSection isFetching={isFetching} users={[data, setUsers]} />
            <LoadingContent isFetching={isFetching}>
                {!!users.length && users.map((user) => <User key={user.id} user={user} />)}
            </LoadingContent>
        </>
    );
}
