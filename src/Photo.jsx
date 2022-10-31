import PropTypes from 'prop-types';
import { useContext } from 'react';
import LazyImg from './components/LazyImg';
import ModalContext from './context/ModalContext';
import { useStore } from './store/store';

Photo.propTypes = {
    url: PropTypes.string,
    photo: PropTypes.any,
    userId: PropTypes.string
};

export default function Photo({ url, photo, userId }) {
    const { setOpen, setItems } = useStore((state) => state.modal);

    return (
        <LazyImg
            width="12em"
            height="256px"
            className="photo"
            src={url}
            alt={photo.caption}
            threshold={0.2}
            onClick={() => {
                setItems(userId);
                setOpen(photo, url);
            }}
        />
    );
}
