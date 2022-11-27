import PropTypes from 'prop-types';
import PhotosByDate from './PhotosByDate';
import { useLocation } from 'react-router-dom';

Gallery.propTypes = {
    photos: PropTypes.array.isRequired
};

export default function Gallery({ photos }) {
    const location = useLocation();

    return (
        <div
            className={`photo-container ${
                location.pathname === '/feed' ? '' : 'photo-container-user'
            }`}
        >
            {!!photos.length &&
                photos.map((photo) => <PhotosByDate key={photo.id} photo={photo} />)}
        </div>
    );
}
