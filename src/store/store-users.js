import create from 'zustand';

export const useUsersStore = create((set) => ({
    users: [],
    setAllUsers: (users) =>
        set((state) => ({
            users
        })),
    sortUsersByName: () =>
        set((state) => ({
            users: [...state.users].sort((a, b) => {
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
            users: [...state.users].sort(
                (a, b) => (b.photos[0]?.takenAt || 0) - (a.photos[0]?.takenAt || 0)
            )
        }))
}));
