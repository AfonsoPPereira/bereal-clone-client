import PropTypes from 'prop-types';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import AuthUserContext from '../context/AuthUserContext';

AuthUserProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default function AuthUserProvider({ children }) {
    const cookies = new Cookies();
    const [authUser, setAuthUser] = useState(cookies.get('bereal-user-info'));

    return (
        <AuthUserContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthUserContext.Provider>
    );
}
