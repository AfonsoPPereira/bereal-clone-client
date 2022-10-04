import './App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import Login from './Login';
import LoggedInUser from './LoggedInUser';
import Cookies from 'universal-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import ScrollToTop from 'react-scroll-to-top';
import ModalContext from './context/ModalContext';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ModalGallery from './ModalGallery';
import ReactImageGallery from 'react-image-gallery';
import Header from './Header';
import AuthUserContext from './context/AuthUserContext';
import DownloadImgButton from './components/DownloadImgButton';

export default function App() {
    const cookies = useMemo(() => new Cookies(), []);

    const [loading, setLoading] = useState(false);
    const [authUser, setAuthUser] = useState(cookies.get('bereal-user-info'));
    const [modal, setModal] = useState({
        open: false,
        loading: false,
        items: [],
        photoId: null,
        photoUrl: null,
        startIndex: 0
    });

    const [users, setUsers] = useState({});
    const [currImgUrl, setCurrImgUrl] = useState(null);
    const [fetchLatestContent, setFetchLatestContent] = useState({ cached: true });

    const galleryRef = useRef(null);

    useEffect(() => {
        if (modal.open && !modal.loading) {
            setCurrImgUrl(modal.items[galleryRef.current?.state?.currentIndex]?.original);
        }
    }, [modal.items, modal.open, modal.loading]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!authUser && location.pathname !== '/') {
            return navigate('/', { replace: true });
        }
    }, [location.pathname, authUser, navigate]);

    return (
        <AuthUserContext.Provider value={[authUser, setAuthUser]}>
            <div className="App">
                {!authUser && (
                    <div className="login-div">
                        <Login setFetchLatestContent={setFetchLatestContent} />
                    </div>
                )}
                {!!authUser && (
                    <>
                        <header>
                            <div className="header">
                                {loading && (
                                    <div className="loading-div">
                                        <CircularProgress disableShrink />
                                    </div>
                                )}
                                {!loading && (
                                    <div id="header">
                                        <Header setFetchLatestContent={setFetchLatestContent} />
                                    </div>
                                )}
                                <LoggedInUser />
                            </div>
                        </header>
                        <main id="content" style={{ opacity: loading ? 0.6 : 1 }}>
                            <ModalContext.Provider value={[modal, setModal]}>
                                <Outlet
                                    context={{
                                        users: [users, setUsers],
                                        loading: [loading, setLoading],
                                        fetchLatestContent: [
                                            fetchLatestContent,
                                            setFetchLatestContent
                                        ]
                                    }}
                                />
                                <ModalGallery>
                                    <ReactImageGallery
                                        showPlayButton={false}
                                        items={modal.items}
                                        startIndex={modal.startIndex}
                                        thumbnailPosition="left"
                                        ref={galleryRef}
                                        onSlide={(index) =>
                                            setCurrImgUrl(modal.items[index]?.original)
                                        }
                                        renderCustomControls={() => (
                                            <DownloadImgButton url={currImgUrl} />
                                        )}
                                    />
                                </ModalGallery>
                            </ModalContext.Provider>
                        </main>
                    </>
                )}
                <ScrollToTop
                    smooth
                    viewBox="0 0 24 24"
                    // eslint-disable-next-line max-len
                    svgPath="M8.12 14.71 12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71a.9959.9959 0 0 0-1.41 0L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.38 1.03.39 1.42 0z"
                />
            </div>
        </AuthUserContext.Provider>
    );
}
