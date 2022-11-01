import PropTypes from 'prop-types';
import { useContext } from 'react';
import LazyImg from './components/LazyImg';
import ModalContext from './context/ModalContext';

Photo.propTypes = {
    url: PropTypes.string,
    caption: PropTypes.string
};

export default function Photo({ url, caption }) {
    const [, setModal] = useContext(ModalContext);

    return (
        <LazyImg
            width="12em"
            height="256px"
            className="photo"
            src={url}
            alt={caption}
            threshold={0.2}
            onClick={() =>
                setModal((state) => ({
                    ...state,
                    open: true,
                    currImgUrl: url
                }))
            }
        />
    );
}
