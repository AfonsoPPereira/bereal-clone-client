import PropTypes from 'prop-types';
import PhotosByDate from './PhotosByDate';
import { useContext, useEffect, useMemo } from 'react';
import ModalContext from './context/ModalContext';

Gallery.propTypes = {
    photos: PropTypes.array.isRequired
};

export default function Gallery({ photos }) {
    const [modal, setModal] = useContext(ModalContext);

    const items = useMemo(
        () =>
            photos
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
                .flatMap((val) => val),
        [photos]
    );

    useEffect(() => {
        if (modal.open && photos.some((e) => e.id === modal.photoId)) {
            setModal((state) => ({
                ...state,
                loading: false,
                items,
                startIndex: items.findIndex((e) => e.original === state.photoUrl)
            }));
        }
    }, [items, modal.open, modal.photoId, photos, setModal]);

    return (
        <>
            <div className="photo-container">
                {!!photos.length &&
                    photos.map((photo) => <PhotosByDate key={photo.id} photo={photo} />)}
            </div>
        </>
    );
}
