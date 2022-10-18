import PropTypes from 'prop-types';
import { useContext } from 'react';
import AuthUserContext from '../context/AuthUserContext';
import { useEffect, useRef, useState } from 'react';
import LoggedInUser from '../LoggedInUser';
import ScrollToTop from 'react-scroll-to-top';
import ModalContext from '../context/ModalContext';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import ModalGallery from '../ModalGallery';
import ReactImageGallery from 'react-image-gallery';
import DownloadImgButton from '../components/DownloadImgButton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default function PrivateRoute({ children }) {
    const [authUser] = useContext(AuthUserContext);
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
    const location = useLocation();

    useEffect(() => {
        if (modal.open && !modal.loading) {
            setCurrImgUrl(modal.items[galleryRef.current?.state?.currentIndex]?.original);
        }
    }, [modal.items, modal.open, modal.loading]);

    if (location.pathname === '/') {
        return <Navigate to="/feed" />;
    }

    if (!authUser) {
        return <Navigate to="/login" />;
    }

    if (children) {
        return children;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <header>
                <div className="header">
                    <Outlet context={{ isHeader: true }} />
                    <LoggedInUser />
                </div>
            </header>
            <main id="content">
                <ModalContext.Provider value={[modal, setModal]}>
                    <Outlet />
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
            <ScrollToTop
                smooth
                viewBox="0 0 24 24"
                // eslint-disable-next-line max-len
                svgPath="M8.12 14.71 12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71a.9959.9959 0 0 0-1.41 0L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.38 1.03.39 1.42 0z"
            />
        </QueryClientProvider>
    );
}
