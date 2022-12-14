import create from 'zustand';

const sortUsersByName = (filteredUsers) =>
    [...filteredUsers].sort((a, b) => {
        if (a.username > b.username) {
            return 1;
        }
        if (a.username < b.username) {
            return -1;
        }

        return 0;
    });
const sortUsersByDate = (filteredUsers) =>
    [...filteredUsers].sort((a, b) => (b.photos[0]?.takenAt || 0) - (a.photos[0]?.takenAt || 0));

export const useUsersStore = create((set) => ({
    filteredUsers: [],
    setFilteredUsers: (filteredUsers) =>
        set((state) => ({
            filteredUsers
        })),
    filter: (sortBy) =>
        set((state) => {
            let filteredUsers;

            switch (sortBy) {
            case 'name':
                filteredUsers = sortUsersByName(state.filteredUsers);
                break;
            case 'date':
            default:
                filteredUsers = sortUsersByDate(state.filteredUsers);
                break;
            }

            return {
                filteredUsers
            };
        })
}));
