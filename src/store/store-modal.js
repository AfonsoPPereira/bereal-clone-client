import create from 'zustand';

export const useModalStore = create((set) => ({
    open: false,
    url: null,
    setOpen: (open) =>
        set((state) => ({
            ...state,
            open
        })),
    setUrl: (url) =>
        set((state) => ({
            ...state,
            url
        }))
}));
