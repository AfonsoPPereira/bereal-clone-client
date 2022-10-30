import PropTypes from 'prop-types';
import { useContext } from 'react';
import LazyImg from './components/LazyImg';
import ModalContext from './context/ModalContext';

Photo.propTypes = {
    url: PropTypes.string,
    photo: PropTypes.any
};

export default function Photo({ url, photo }) {
    const [modal, setModal] = useContext(ModalContext);

    return (
        <LazyImg
            width="12em"
            height="256px"
            className="photo"
            src={url}
            alt={photo.caption}
            threshold={0.2}
            onClick={() =>
                setModal((state) => ({
                    ...state,
                    open: true,
                    loading: true,
                    photoId: photo.id,
                    photoUrl: url,
                    currImgUrl: url
                }))
            }
        />
    );
}
