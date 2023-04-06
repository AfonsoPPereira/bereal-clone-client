import PropTypes from 'prop-types';
import DownloadSharp from '@mui/icons-material/DownloadSharp';
import { Button } from '@mui/material';
import { appToast, downloadImage } from '../utils';
import { useMemo } from 'react';
import { forwardRef } from 'react';
import { CopyAll } from '@mui/icons-material';

const GalleryModalButtons = forwardRef(({ sx }, ref) => {
    const currentIndex = ref.current?.state.currentIndex;
    const url = useMemo(
        () => ref.current?.props?.items?.[currentIndex]?.originalUrl,
        [ref, currentIndex]
    );

    if (!url) return null;

    return (
        <div style={{ display: 'flex', position: 'absolute', right: 0, zIndex: 99 }}>
            <Button
                sx={sx}
                onClick={() => downloadImage(url)}
            >
                <DownloadSharp sx={{ color: 'black' }} />
            </Button>
            <Button
                sx={sx}
                onClick={() => {
                    navigator.clipboard.writeText(url);
                    appToast('Copied successfully');
                }}
            >
                <CopyAll sx={{ color: 'black' }} />
            </Button>
        </div>
    );
});

GalleryModalButtons.displayName = 'GalleryModalButtons';
GalleryModalButtons.propTypes = {
    sx: PropTypes.object
};

export default GalleryModalButtons;
