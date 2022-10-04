import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

Header.propTypes = {
    setFetchLatestContent: PropTypes.func
};

export default function Header({ setFetchLatestContent }) {
    const location = useLocation();

    if (location.pathname === '/') {
        return (
            <Button
                variant="contained"
                size="small"
                onClick={() => setFetchLatestContent({ cached: false })}
            >
                ↻ Refresh Latest Content
            </Button>
        );
    }

    return (
        <>
            <Button
                variant="contained"
                size="small"
                onClick={() => setFetchLatestContent({ cached: false })}
            >
                ↻ Refresh Latest Content
            </Button>
            <Button size="small" variant="outlined" sx={{ width: 'fit-content' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    Go Back to Feed
                </Link>
            </Button>
        </>
    );
}
