import PropTypes from 'prop-types';
import PhotosByDate from './PhotosByDate';
import { useMemo } from 'react';
import ModalContext from './context/ModalContext';
import { Box, Modal } from '@mui/material';
import ReactImageGallery from 'react-image-gallery';
import DownloadImgButton from './components/DownloadImgButton';
import { useRef } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

Gallery.propTypes = {
    photos: PropTypes.array.isRequired
};

export default function Gallery({ photos }) {
    const location = useLocation();
    const [modal, setModal] = useState({
        open: false,
        currImgUrl: null
    });
    const galleryRef = useRef();

    const items = useMemo(
        () =>
            modal.open
                ? photos
                    .map((photo) => [
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
                : [],
        [photos, modal.open]
    );
    const startIndex = useMemo(() => {
        const index = items.findIndex((photo) => photo.original === modal.currImgUrl);
        if (index <= 0) return 0;

        return index;
    }, [items, modal.currImgUrl]);

    return (
        <>
            <ModalContext.Provider value={[modal, setModal]}>
                <div
                    className={`photo-container ${
                        location.pathname === '/feed' ? '' : 'photo-container-user'
                    }`}
                >
                    {!!photos.length &&
                        photos.map((photo) => <PhotosByDate key={photo.id} photo={photo} />)}
                </div>
            </ModalContext.Provider>
            {modal.open && (
                <Modal
                    open={modal.open}
                    onClose={() => setModal((state) => ({ ...state, open: false }))}
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
                            startIndex={startIndex}
                            ref={galleryRef}
                            thumbnailPosition="left"
                            renderCustomControls={() => <DownloadImgButton ref={galleryRef} />}
                        />
                    </Box>
                </Modal>
            )}
        </>
    );
}
