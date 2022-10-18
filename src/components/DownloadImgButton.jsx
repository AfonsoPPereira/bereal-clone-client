import PropTypes from 'prop-types';
import { DownloadSharp } from '@mui/icons-material';
import { Button } from '@mui/material';
import { downloadImage } from '../utils';

DownloadImgButton.propTypes = {
    url: PropTypes.string,
    sx: PropTypes.object
};

export default function DownloadImgButton({ url, sx }) {
    if (!url) return null;

    return (
        <Button
            sx={{ position: 'absolute', right: 0, zIndex: 99, ...sx }}
            onClick={() => downloadImage(url)}
        >
            <DownloadSharp sx={{ color: 'black' }} />
        </Button>
    );
}
