import React, { useMemo } from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useModalStore } from './store/store-modal';
import DownloadImgButton from './components/DownloadImgButton';
import ReactImageGallery from 'react-image-gallery';
import { useUsersStore } from './store/store-users';
import { useRef } from 'react';
import { compressImg } from './utils';

export default function ModalGallery() {
    const filteredUsers = useUsersStore((state) => state.filteredUsers);
    const open = useModalStore((state) => state.open);
    const url = useModalStore((state) => state.url);
    const setOpen = useModalStore((state) => state.setOpen);
    const galleryRef = useRef();

    const selectedUserId = useMemo(
        () => url?.match(/^https?:\/\/.+\/Photos\/(.*?)\//i)?.[1],
        [url]
    );
    const photos = useMemo(
        () => filteredUsers?.find((user) => user.id === selectedUserId)?.photos,
        [filteredUsers, selectedUserId]
    );
    const items = useMemo(
        () =>
            photos
                ?.map((photo) => {
                    const compressedPhotoURL = compressImg(photo.photoURL);
                    const compressedSecondaryPhotoURL = compressImg(photo.secondaryPhotoURL);

                    return [
                        {
                            original: compressedPhotoURL,
                            thumbnail: compressedPhotoURL,
                            originalTitle: photo.caption,
                            thumbnailTitle: photo.caption
                        },
                        {
                            original: compressedSecondaryPhotoURL,
                            thumbnail: compressedSecondaryPhotoURL,
                            originalTitle: photo.caption,
                            thumbnailTitle: photo.caption
                        }
                    ];
                })
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
