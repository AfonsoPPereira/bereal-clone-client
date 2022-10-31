import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import Gallery from './Gallery';
import React from 'react';

User.propTypes = {
    isFetching: PropTypes.bool,
    user: PropTypes.object
};

export default function User({ isFetching, user }) {
    if (!isFetching && !user) return <h2>User not found</h2>;

    return (
        typeof user === 'object' && (
            <div className="user">
                <ProfileHeader user={user} />
                {!user?.photos?.length && (
                    <h2 style={{ marginTop: '2em' }}>User has no photos yet</h2>
                )}
                {!!user?.photos?.length && <Gallery userId={user.id} photos={user.photos} />}
            </div>
        )
    );
}
