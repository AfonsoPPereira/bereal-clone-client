import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Modal } from '@mui/material';
import { Box } from '@mui/system';
import ModalContext from './context/ModalContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.95)',
    bgcolor: 'white',
    width: '95%',
    p: 4
};

ModalGallery.propTypes = {
    children: PropTypes.element.isRequired
};

export default function ModalGallery({ children }) {
    const [modal, setModal] = useContext(ModalContext);

    return (
        <Modal
            open={modal.open}
            onClose={() => setModal((state) => ({ ...state, open: false, loading: false }))}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} border="none">
                {!modal.loading && children}
            </Box>
        </Modal>
    );
}
