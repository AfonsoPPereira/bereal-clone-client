import PropTypes from 'prop-types';
import { useContext } from 'react';
import AuthUserContext from '../context/AuthUserContext';
import ScrollToTop from 'react-scroll-to-top';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default function PrivateRoute({ children }) {
    const [authUser] = useContext(AuthUserContext);
    const location = useLocation();

    if (!authUser) {
        return <Navigate to="/login" />;
    }

    if (location.pathname === '/') {
        return <Navigate to="/feed" />;
    }

    if (children) {
        return children;
    }

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
            <ScrollToTop
                smooth
                viewBox="0 0 24 24"
                // eslint-disable-next-line max-len
                svgPath="M8.12 14.71 12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71a.9959.9959 0 0 0-1.41 0L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.38 1.03.39 1.42 0z"
            />
        </>
    );
}
