import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import PlaceholderImg from './components/PlaceholderImg';
import IsFeed from './isFeed';
import { useModalStore } from './store/store-modal';
import { compressImg, imgStyle } from './utils';

Photo.propTypes = {
    url: PropTypes.string,
    caption: PropTypes.string
};

export default function Photo({ url, caption }) {
    const setUrl = useModalStore((state) => state.setUrl);
    const setOpen = useModalStore((state) => state.setOpen);

    return (
        <LazyLoad placeholder={<PlaceholderImg />} overflow={IsFeed()}>
            <img
                width={imgStyle.width}
                height={imgStyle.height}
                className="photo"
                src={compressImg(url)}
                alt={caption}
                onClick={() => {
                    setUrl(url);
                    setOpen(true);
                }}
            />
        </LazyLoad>
    );
}
