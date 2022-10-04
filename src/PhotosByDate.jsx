import PropTypes from 'prop-types';
import Photo from './Photo';
import Moment from 'react-moment';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';

PhotosByDate.propTypes = {
    photo: PropTypes.object.isRequired
};

export default function PhotosByDate({ photo }) {
    return (
        <div className="photo-container__date">
            <Tooltip
                placement="top"
                title={moment.unix(photo.takenAt).format('DD-MM-YYYY hh:mm:ss')}
            >
                <p className="date-title">
                    <Moment unix fromNow>
                        {photo.takenAt}
                    </Moment>
                </p>
            </Tooltip>
            <div className="photos">
                {[photo.photoURL, photo.secondaryPhotoURL].map((url) => (
                    <Photo key={url} url={url} photo={photo} />
                ))}
            </div>
        </div>
    );
}
