import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import Gallery from './Gallery';
import React, { useEffect, useState } from 'react';

User.propTypes = {
    user: PropTypes.object
};

export default function User({ user }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) return null;

    if (!user) return <h2>User not found</h2>;

    return (
        <div className="user">
            <ProfileHeader user={user} />
            <Gallery photos={user.photos} />
        </div>
    );
}
