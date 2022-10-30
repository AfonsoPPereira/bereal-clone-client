import { Box, Modal } from '@mui/material';
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
        items: [],
        photoId: null,
        photoUrl: null,
        startIndex: 0,
        currImgUrl: null
    });

    return (
        <>
            <header>
                <div className="header">
                    {header}
                    <LoggedInUser />
                </div>
            </header>
            <main id="content">
                <ModalContext.Provider value={[modal, setModal]}>{children}</ModalContext.Provider>
                <Modal
                    open={modal.open}
                    onClose={() => setModal((state) => ({ ...state, open: false, loading: false }))}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%) scale(0.95)',
                            bgcolor: 'white',
                            width: '95%',
                            p: 4
                        }}
                        border="none"
                    >
                        {!modal.loading && (
                            <ReactImageGallery
                                showPlayButton={false}
                                items={modal.items}
                                startIndex={modal.startIndex}
                                thumbnailPosition="left"
                                onSlide={(index) =>
                                    setModal((state) => ({
                                        ...state,
                                        currImgUrl: state.items[index]?.original
                                    }))
                                }
                                renderCustomControls={() => (
                                    <DownloadImgButton url={modal.currImgUrl} />
                                )}
                            />
                        )}
                    </Box>
                </Modal>
            </main>
        </>
    );
}
