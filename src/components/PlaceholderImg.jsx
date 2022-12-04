import { Skeleton } from '@mui/material';
import { imgStyle } from '../utils';

export default function PlaceholderImg() {
    return (
        <Skeleton
            className="skeleton"
            animation="pulse"
            variant="rect"
            width={imgStyle.width}
            height={imgStyle.height}
            sx={{ animationDuration: '0.6s', margin: 'auto .3em' }}
        />
    );
}
