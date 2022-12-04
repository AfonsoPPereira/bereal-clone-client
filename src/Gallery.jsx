import PropTypes from 'prop-types';
import PhotosByDate from './PhotosByDate';
import IsFeed from './isFeed';

Gallery.propTypes = {
    photos: PropTypes.array.isRequired
};

export default function Gallery({ photos }) {
    return (
        <div className={`photo-container ${IsFeed() ? '' : 'photo-container-user'}`}>
            {!!photos.length &&
                photos.map((photo) => <PhotosByDate key={photo.id} photo={photo} />)}
        </div>
    );
}
