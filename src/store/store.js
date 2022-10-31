import create from 'zustand';

export const useStore = create((set) => ({
    modal: {
        open: false,
        items: [],
        photoId: null,
        photoUrl: null,
        startIndex: 0,
        setOpen: (photo, url) =>
            set((state) => ({
                modal: {
                    ...state.modal,
                    open: true,
                    photoId: photo.id,
                    photoUrl: url,
                    startIndex: state.modal.items.findIndex((e) => e.original === url)
                }
            })),
        setClose: () => set((state) => ({ modal: { ...state.modal, open: false } })),
        setItems: (userId) =>
            set((state) => ({
                modal: {
                    ...state.modal,
                    items: state.users
                        ?.find((user) => user.id === userId)
                        ?.photos.map((photo) => [
                            {
                                original: photo.photoURL,
                                thumbnail: photo.photoURL,
                                originalTitle: photo.caption,
                                thumbnailTitle: photo.caption
                            },
                            {
                                original: photo.secondaryPhotoURL,
                                thumbnail: photo.secondaryPhotoURL,
                                originalTitle: photo.caption,
                                thumbnailTitle: photo.caption
                            }
                        ])
                        .flatMap((val) => val)
                }
            }))
    },
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
