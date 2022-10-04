import User from './User';
import Button from '@mui/material/Button';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthFetch } from './hooks/useAuthFetch';

export default function Feed() {
    const {
        users: [users, setUsers],
        loading: [, setLoading],
        fetchLatestContent: [fetchLatestContent]
    } = useOutletContext();
    const { fetchLatestPhotos } = useAuthFetch();

    const includeUsers = [
        /* 'martaffaneves',
        'mariaferreirapires',
        'mafmafs',
        'joanaqm' */
    ];
    const excludeUsers = [
        /* 'afonsoppereira' */
    ];

    useEffect(() => {
        setLoading(true);
        fetchLatestPhotos(fetchLatestContent.cached)
            .then((users) => setUsers(users))
            .finally(() => setLoading(false));
    }, [fetchLatestContent, setLoading, setUsers, fetchLatestPhotos]);

    const sortByName = () => {
        setUsers(
            [...users].sort((a, b) => {
                if (a.username > b.username) {
                    return 1;
                }
                if (a.username < b.username) {
                    return -1;
                }

                return 0;
            })
        );
    };

    const sortByLatestDate = () => {
        setUsers(
            [...users].sort((a, b) => (b.photos[0]?.takenAt || 0) - (a.photos[0]?.takenAt || 0))
        );
    };

    return (
        <>
            {users.length && (
                <div className="filter-div">
                    <Button variant="outlined" onClick={sortByName}>
                        Sort By Name
                    </Button>
                    <Button variant="outlined" onClick={sortByLatestDate}>
                        Sort By Latest Date
                    </Button>
                </div>
            )}
            {users.length &&
                users.map(
                    (user) =>
                        !excludeUsers.includes(user.username) &&
                        (!includeUsers.length || includeUsers.includes(user.username)) &&
                        !!user.photos.length && <User key={user.id} user={user} />
                )}
        </>
    );
}
