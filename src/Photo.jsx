import PropTypes from 'prop-types';
import LazyImg from './components/LazyImg';
import { useModalStore } from './store/store-modal';

Photo.propTypes = {
    url: PropTypes.string,
    caption: PropTypes.string
};

export default function Photo({ url, caption }) {
    const setUrl = useModalStore((state) => state.setUrl);
    const setOpen = useModalStore((state) => state.setOpen);

    return (
        <LazyImg
            width="12em"
            height="256px"
            className="photo"
            src={url}
            alt={caption}
            threshold={0.2}
            onClick={() => {
                setUrl(url);
                setOpen(true);
            }}
        />
    );
}
