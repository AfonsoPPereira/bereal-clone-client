import { Autocomplete, Button, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import useStorage from './hooks/useStorage';
import { useUsersStore } from './store/store-users';

export default function FilterSection() {
    const setFilteredUsers = useUsersStore((state) => state.setFilteredUsers);
    const sortUsersByName = useUsersStore((state) => state.sortUsersByName);
    const sortUsersByDate = useUsersStore((state) => state.sortUsersByDate);
    const users = useUsersStore((state) => state.users);

    const [filter, setFilter] = useState(null);
    const [selectOpen, setSelectOpen] = useState(false);
    const [filterUsersOptions, setFilterUsersOptions] = useStorage('filtered-users', {
        total: 0,
        users: []
    });

    const usersFilterOptions = useMemo(
        () => (Array.isArray(users) ? users?.map((user) => user.username)?.sort() : []),
        [users]
    );
    const filterUsersLabel = useMemo(
        () => `Filter Users (${users?.length || filterUsersOptions.total || 0})`,
        [users.length, filterUsersOptions.total]
    );

    useEffect(() => {
        if (selectOpen || !Array.isArray(users)) return;

        setFilteredUsers(filterUsersOptions.users);
    }, [filterUsersOptions.users, setFilteredUsers, users, selectOpen]);

    useEffect(() => {
        switch (filter) {
        case 'sortByName':
            sortUsersByName();
            break;
        case 'sortByDate':
            sortUsersByDate();
            break;
        }
    }, [filter, sortUsersByName, sortUsersByDate]);

    return (
        <div className="filter-div">
            <Button variant="outlined" onClick={() => setFilter('sortByName')}>
                Sort By Name
            </Button>
            <Button variant="outlined" onClick={() => setFilter('sortByDate')}>
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
                renderInput={(params) => <TextField {...params} label={filterUsersLabel} />}
                value={filterUsersOptions.users}
                onChange={(event, value) =>
                    setFilterUsersOptions((state) => ({
                        ...state,
                        total: users?.length || 0,
                        users: value
                    }))
                }
            />
        </div>
    );
}
