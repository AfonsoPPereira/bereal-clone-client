import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import Gallery from './Gallery';
import React from 'react';

User.propTypes = {
    isFetching: PropTypes.bool,
    user: PropTypes.object
};

export default function User({ isFetching, user }) {
    if (!isFetching && !user?.photos) return <h2>User not found</h2>;

    return (
        !!user && (
            <div className="user">
                <ProfileHeader user={user} />
                <Gallery photos={user.photos} />
            </div>
        )
    );
}
