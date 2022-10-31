import { Box, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useEffect, useRef, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';
import DownloadImgButton from '../components/DownloadImgButton';
import ModalContext from '../context/ModalContext';
import LoggedInUser from '../LoggedInUser';
import ModalGallery from '../ModalGallery';
import { useStore } from '../store/store';

MainLayout.propTypes = {
    header: PropTypes.node,
    children: PropTypes.node
};

export default function MainLayout({ header, children }) {
    const { open, startIndex, items, setClose } = useStore((state) => state.modal);
    const galleryRef = useRef(null);

    return (
        <>
            <header>
                <div className="header">
                    {header}
                    <LoggedInUser />
                </div>
            </header>
            <main id="content">
                {children}
                <Modal
                    open={open}
                    onClose={setClose}
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
                        {open && (
                            <ReactImageGallery
                                showPlayButton={false}
                                items={items}
                                startIndex={startIndex}
                                thumbnailPosition="left"
                                ref={galleryRef}
                                renderCustomControls={() => (
                                    <DownloadImgButton
                                        url={
                                            items?.[galleryRef.current?.getCurrentIndex()]?.original
                                        }
                                    />
                                )}
                            />
                        )}
                    </Box>
                </Modal>
            </main>
        </>
    );
}
