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

export default function Feed() {
    const { fetchLatestPhotos } = useAuthFetch();
    const setAllUsers = useUsersStore((state) => state.setAllUsers);
    const filteredUsers = useUsersStore((state) => state.filteredUsers);

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
