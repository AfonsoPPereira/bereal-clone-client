import PropTypes from 'prop-types';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useUsersStore } from './store/store-users';
import useStorage from './hooks/useStorage';
import { forceCheck } from 'react-lazyload';

FilterSection.propTypes = {
    users: PropTypes.array.isRequired,
    dataUpdatedAt: PropTypes.number.isRequired
};

export default function FilterSection({ users, dataUpdatedAt }) {
    const filter = useUsersStore((state) => state.filter);
    const setFilteredUsers = useUsersStore((state) => state.setFilteredUsers);
    const [selectOpen, setSelectOpen] = useState(false);
    const [filterSectionJSON, setFilterSectionJSON] = useState(null);

    const [filterSection, setFilterSection] = useStorage('filtered-users', {
        sortBy: 'date',
        options: []
    });

    const usersFilterOptions = useMemo(
        () =>
            Array.isArray(users)
                ? users
                    ?.map((user) => ({
                        label: user.username,
                        id: user.id
                    }))
                    ?.sort((a, b) => (a.label > b.label ? 1 : -1))
                : [],
        [users]
    );
    const filterUsersLabel = useMemo(
        () => `Filter Users (${filterSection.options.length || usersFilterOptions.length})`,
        [usersFilterOptions.length, filterSection.options.length]
    );
    const filteredUsersId = useMemo(
        () => filterSection.options?.map((user) => user.id) || [],
        [filterSection.options]
    );
    const filteredUsers = useMemo(
        () =>
            !filteredUsersId.length
                ? users
                : users?.filter((user) => filteredUsersId.includes(user.id)) || [],
        [filteredUsersId, users]
    );

    const setSortedUsers = (options) => {
        options.sort((a, b) => {
            if (a.label < b.label) {
                return -1;
            }

            if (b.label < a.label) {
                return 1;
            }

            return 0;
        });

        setFilterSection((state) => ({
            ...state,
            options
        }));
    };

    useEffect(() => {
        if (!selectOpen) {
            setFilteredUsers(filteredUsers);
        }
    }, [selectOpen, setFilteredUsers, filteredUsers]);

    useEffect(() => {
        filter(filterSection.sortBy);
        setTimeout(() => forceCheck(), 500);
    }, [filter, filterSection.sortBy, filterSectionJSON, dataUpdatedAt]);

    return (
        <div className="filter-div">
            <Button
                variant="outlined"
                onClick={() => setFilterSection((state) => ({ ...state, sortBy: 'name' }))}
            >
                Sort By Name
            </Button>
            <Button
                variant="outlined"
                onClick={() => setFilterSection((state) => ({ ...state, sortBy: 'date' }))}
            >
                Sort By Latest Date
            </Button>
            <Autocomplete
                multiple
                disableCloseOnSelect
                onOpen={() => setSelectOpen(true)}
                onClose={() => {
                    setFilterSectionJSON(JSON.stringify(filterSection));
                    setSelectOpen(false);
                }}
                limitTags={2}
                sx={{ minWidth: 200 }}
                options={usersFilterOptions}
                renderInput={(params) => <TextField {...params} label={filterUsersLabel} />}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={filterSection.options}
                onChange={(event, value) => setSortedUsers(value)}
            />
        </div>
    );
}
