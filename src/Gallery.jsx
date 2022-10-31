import PropTypes from 'prop-types';
import PhotosByDate from './PhotosByDate';
import { useContext, useEffect, useMemo } from 'react';
import ModalContext from './context/ModalContext';
import { useStore } from './store/store';

Gallery.propTypes = {
    photos: PropTypes.array.isRequired,
    userId: PropTypes.string
};

export default function Gallery({ photos, userId }) {
    /* const items = useMemo(
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
    ); */
    /* const open = useStore((state) => state.open);
    const photoId = useStore((state) => state.photoId);
    const setItems = useStore((state) => state.setItems); */

    /* useEffect(() => {
        if (open && photos.some((e) => e.id === photoId)) {
            setItems(
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
                    .flatMap((val) => val)
            );
        }
    }, [open, photoId, photos, setItems]); */

    return (
        <div className="photo-container">
            {!!photos.length &&
                photos.map((photo) => (
                    <PhotosByDate key={photo.id} photo={photo} userId={userId} />
                ))}
        </div>
    );
}
