import PropTypes from 'prop-types';
import { DownloadSharp } from '@mui/icons-material';
import { Button } from '@mui/material';
import { downloadImage } from '../utils';
import { useMemo } from 'react';
import { forwardRef } from 'react';

const DownloadImgButton = forwardRef(({ sx }, ref) => {
    const currentIndex = ref.current?.state.currentIndex;
    const url = useMemo(() => ref.current?.props.items[currentIndex].original, [ref, currentIndex]);

    if (!url) return null;

    return (
        <Button
            sx={{ position: 'absolute', right: 0, zIndex: 99, ...sx }}
            onClick={() => downloadImage(url)}
        >
            <DownloadSharp sx={{ color: 'black' }} />
        </Button>
    );
});

DownloadImgButton.displayName = 'DownloadImgButton';
DownloadImgButton.propTypes = {
    sx: PropTypes.object
};

export default DownloadImgButton;
