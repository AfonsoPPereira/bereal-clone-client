import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import Avatar from 'react-avatar';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Link } from 'react-router-dom';
import DownloadImgButton from './components/DownloadImgButton';

ProfileHeader.propTypes = {
    user: PropTypes.object.isRequired
};

export default function ProfileHeader({ user }) {
    const profilePicture = useMemo(
        () =>
            user?.profilePicture?.replace(/(width=)(\d+)(,height=)(\d+)/, '$1$3') ||
            ''[user?.profilePicture],
        [user?.profilePicture]
    );

    const [isZoomed, setIsZoomed] = useState(false);

    const handleZoomChange = useCallback((shouldZoom) => {
        setIsZoomed(shouldZoom);
    }, []);

    return (
        <span className="user-profile">
            {!!profilePicture && (
                <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                    <img className="avatar-app" src={profilePicture} alt="avatar" loading="lazy" />
                </ControlledZoom>
            )}
            {!!profilePicture && isZoomed && (
                <dialog className="overlay">
                    <DownloadImgButton
                        url={profilePicture}
                        sx={{
                            position: 'relative',
                            top: 0,
                            left: 0,
                            zIndex: 99999
                        }}
                    />
                </dialog>
            )}
            {!profilePicture && <Avatar name={user.username} className="avatar-app" />}
            <span className="username">
                <Link
                    to={`/user/${user.username}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                >
                    {user.username}
                </Link>
            </span>
        </span>
    );
}
