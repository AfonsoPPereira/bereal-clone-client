import PropTypes from 'prop-types';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

FilterSection.propTypes = {
    users: PropTypes.array.isRequired
};

export default function FilterSection({ users: [users, setUsers] }) {
    const [filter, setFilter] = useState(null);
    const [selectOpen, setSelectOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useLocalStorage('filtered-users', []);
    const usersFilterOptions = useMemo(
        () => (!users?.length ? [] : users.map((user) => user.username).sort()),
        [users]
    );

    useEffect(() => {
        if (!users?.length || selectOpen) return;

        setUsers(
            users.filter(
                (user) =>
                    !!user.photos.length &&
                    (!selectedOptions?.length || selectedOptions.includes(user.username))
            )
        );
    }, [selectedOptions, setUsers, users, selectOpen]);

    const sortByName = () => {
        setFilter('sortByName');
    };

    const sortByLatestDate = () => {
        setFilter('sortByDate');
    };

    useEffect(() => {
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
    }, [filter, setUsers]);

    return (
        <div className="filter-div">
            <Button variant="outlined" onClick={sortByName}>
                Sort By Name
            </Button>
            <Button variant="outlined" onClick={sortByLatestDate}>
                Sort By Latest Date
            </Button>
            <Autocomplete
                multiple
                disableCloseOnSelect
                onOpen={() => setSelectOpen(true)}
                onClose={() => setSelectOpen(false)}
                limitTags={2}
                sx={{ minWidth: 200 }}
                options={usersFilterOptions}
                renderInput={(params) => <TextField {...params} label="Filter Users" />}
                value={selectedOptions}
                onChange={(event, value) => setSelectedOptions(value)}
            />
        </div>
    );
}
