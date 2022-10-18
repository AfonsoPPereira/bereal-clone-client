import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';

Header.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

export default function Header({ isFetching, children }) {
    if (isFetching)
        return (
            <div className="loading-div">
                <CircularProgress disableShrink />
            </div>
        );

    return <div id="header">{children}</div>;
}
