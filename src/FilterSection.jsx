import PropTypes from 'prop-types';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useUsersStore } from './store/store-users';

FilterSection.propTypes = {
    filterSection: PropTypes.array.isRequired,
    selectOpen: PropTypes.array.isRequired
};

export default function FilterSection({
    filterSection: [filterSection, setFilterSection],
    selectOpen: [, setSelectOpen]
}) {
    const sortUsersByName = useUsersStore((state) => state.sortUsersByName);
    const sortUsersByDate = useUsersStore((state) => state.sortUsersByDate);
    const users = useUsersStore((state) => state.users);

    const [filter, setFilter] = useState(null);

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
        () => `Filter Users (${filterSection.options.length || filterSection.totalUsers})`,
        [filterSection.totalUsers, filterSection.options.length]
    );

    useEffect(() => {
        switch (filterSection.sortBy) {
        case 'name':
            sortUsersByName();
            break;
        case 'latestDate':
            sortUsersByDate();
            break;
        }
    }, [filterSection.sortBy, sortUsersByName, sortUsersByDate]);

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
                onClick={() => setFilterSection((state) => ({ ...state, sortBy: 'latestDate' }))}
            >
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
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={filterSection.options}
                onChange={(event, value) =>
                    setFilterSection((state) => ({ ...state, options: value }))
                }
            />
        </div>
    );
}
