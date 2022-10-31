import PropTypes from 'prop-types';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import useStorage from './hooks/useStorage';
import { useStore } from './store/store';

export default function FilterSection() {
    const setFilteredUsers = useStore((state) => state.setFilteredUsers);
    const sortUsersByName = useStore((state) => state.sortUsersByName);
    const sortUsersByDate = useStore((state) => state.sortUsersByDate);
    const users = useStore((state) => state.users);

    const [filter, setFilter] = useState(null);
    const [selectOpen, setSelectOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useStorage('filtered-users', []);
    const usersFilterOptions = useMemo(
        () => (Array.isArray(users) ? users?.map((user) => user.username)?.sort() : []),
        [users]
    );

    useEffect(() => {
        if (selectOpen || !Array.isArray(users)) return;

        setFilteredUsers(selectedOptions);
    }, [selectedOptions, setFilteredUsers, users, selectOpen]);

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
                renderInput={(params) => <TextField {...params} label="Filter Users" />}
                value={selectedOptions}
                onChange={(event, value) => setSelectedOptions(value)}
            />
        </div>
    );
}
