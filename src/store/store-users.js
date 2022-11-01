import create from 'zustand';

export const useUsersStore = create((set) => ({
    users: [],
    filteredUsers: [],
    setAllUsers: (users) =>
        set((state) => ({
            users
        })),
    setFilteredUsers: (selectedOptions) =>
        set((state) => ({
            filteredUsers: state.users.filter(
                (user) =>
                    user?.photos?.length &&
                    (!selectedOptions?.length || selectedOptions.includes(user.username))
            )
        })),
    sortUsersByName: () =>
        set((state) => ({
            filteredUsers: [...state.filteredUsers].sort((a, b) => {
                if (a.username > b.username) {
                    return 1;
                }
                if (a.username < b.username) {
                    return -1;
                }

                return 0;
            })
        })),
    sortUsersByDate: () =>
        set((state) => ({
            filteredUsers: [...state.filteredUsers].sort(
                (a, b) => (b.photos[0]?.takenAt || 0) - (a.photos[0]?.takenAt || 0)
            )
        }))
}));
