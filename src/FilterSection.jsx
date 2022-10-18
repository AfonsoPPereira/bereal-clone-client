import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

FilterSection.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
};

export default function FilterSection({ isFetching, users: [users, setUsers] }) {
    const [filter, setFilter] = useState(null);

    const includeUsers = useMemo(
        () => [
            /* 'martaffaneves', 'mariaferreirapires', 'mafmafs', 'joanaqm' */
        ],
        []
    );
    const excludeUsers = useMemo(
        () => [
            /* 'afonsoppereira' */
        ],
        []
    );

    useEffect(() => {
        if (!users || !users.length) return;

        setUsers(
            users.filter(
                (user) =>
                    !excludeUsers.includes(user.username) &&
                    (!includeUsers.length || includeUsers.includes(user.username)) &&
                    !!user.photos.length
            )
        );
    }, [excludeUsers, includeUsers, setUsers, users]);

    const sortByName = () => {
        setFilter('sortByName');
    };

    const sortByLatestDate = () => {
        setFilter('sortByDate');
    };

    useEffect(() => {
        if (isFetching) return;

        switch (filter) {
        case 'sortByName':
            setUsers((users) =>
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
            break;
        case 'sortByDate':
            setUsers((users) =>
                [...users].sort(
                    (a, b) => (b.photos[0]?.takenAt || 0) - (a.photos[0]?.takenAt || 0)
                )
            );
            break;
        }
    }, [filter, isFetching, setUsers]);

    return (
        <div className="filter-div">
            <Button variant="outlined" onClick={sortByName}>
                Sort By Name
            </Button>
            <Button variant="outlined" onClick={sortByLatestDate}>
                Sort By Latest Date
            </Button>
        </div>
    );
}
