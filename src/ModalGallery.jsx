import React, { useMemo } from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useModalStore } from './store/store-modal';
import DownloadImgButton from './components/DownloadImgButton';
import ReactImageGallery from 'react-image-gallery';
import { useUsersStore } from './store/store-users';
import { useRef } from 'react';

export default function ModalGallery() {
    const users = useUsersStore((state) => state.users);
    const open = useModalStore((state) => state.open);
    const url = useModalStore((state) => state.url);
    const setOpen = useModalStore((state) => state.setOpen);
    const galleryRef = useRef();

    const selectedUserId = useMemo(
        () => url?.match(/^https?:\/\/.+\/Photos\/(.*?)\//i)?.[1],
        [url]
    );
    const photos = useMemo(
        () => users?.find((user) => user.id === selectedUserId)?.photos,
        [users, selectedUserId]
    );
    const items = useMemo(
        () =>
            photos
                ?.map((photo) => [
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
                .flatMap((val) => val) ?? [],
        [photos]
    );
    const startIndex = useMemo(() => {
        const index = items?.findIndex((photo) => photo.original === url);
        if (!index || index < 0) return 0;

        return index;
    }, [items, url]);

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0.95)',
                    bgcolor: 'white',
                    width: '95%',
                    p: 4
                }}
                border="none"
            >
                <ReactImageGallery
                    showPlayButton={false}
                    items={items}
                    ref={galleryRef}
                    startIndex={startIndex}
                    thumbnailPosition="left"
                    renderCustomControls={() => <DownloadImgButton ref={galleryRef} />}
                />
            </Box>
        </Modal>
    );
}
