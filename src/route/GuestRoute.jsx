import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthUserContext from '../context/AuthUserContext';

GuestRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default function GuestRoute({ children }) {
    const [authUser] = useContext(AuthUserContext);

    if (authUser) {
        return <Navigate to="/feed" />;
    }

    return children;
}
