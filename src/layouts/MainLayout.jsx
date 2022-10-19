import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';
import DownloadImgButton from '../components/DownloadImgButton';
import ModalContext from '../context/ModalContext';
import LoggedInUser from '../LoggedInUser';
import ModalGallery from '../ModalGallery';

MainLayout.propTypes = {
    header: PropTypes.node,
    children: PropTypes.node
};

export default function MainLayout({ header, children }) {
    const [modal, setModal] = useState({
        open: false,
        loading: false,
        items: [],
        photoId: null,
        photoUrl: null,
        startIndex: 0
    });
    const [currImgUrl, setCurrImgUrl] = useState(null);
    const galleryRef = useRef(null);

    useEffect(() => {
        if (modal.open && !modal.loading) {
            setCurrImgUrl(modal.items[galleryRef.current?.state?.currentIndex]?.original);
        }
    }, [modal.items, modal.open, modal.loading]);

    return (
        <>
            <header>
                <div className="header">
                    {header}
                    <LoggedInUser />
                </div>
            </header>
            <main id="content">
                <ModalContext.Provider value={[modal, setModal]}>
                    {children}
                    <ModalGallery>
                        <ReactImageGallery
                            showPlayButton={false}
                            items={modal.items}
                            startIndex={modal.startIndex}
                            thumbnailPosition="left"
                            ref={galleryRef}
                            onSlide={(index) => setCurrImgUrl(modal.items[index]?.original)}
                            renderCustomControls={() => <DownloadImgButton url={currImgUrl} />}
                        />
                    </ModalGallery>
                </ModalContext.Provider>
            </main>
        </>
    );
}
