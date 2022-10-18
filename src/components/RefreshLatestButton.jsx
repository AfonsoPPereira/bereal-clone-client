import PropTypes from 'prop-types';
import { Button } from '@mui/material';

RefreshLatestButton.propTypes = {
    fetchFunc: PropTypes.func
};

export default function RefreshLatestButton({ fetchFunc }) {
    return (
        <Button variant="contained" size="small" onClick={fetchFunc}>
            ↻ Refresh Latest Content
        </Button>
    );
}
