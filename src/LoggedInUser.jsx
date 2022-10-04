import Button from '@mui/material/Button';
import ProfileHeader from './ProfileHeader';
import appToast from './utils';
import { useContext } from 'react';
import AuthUserContext from './context/AuthUserContext';
import { useAuthFetch } from './hooks/useAuthFetch';

export default function LoggedInUser() {
    const { logout } = useAuthFetch();
    const [authUser, setAuthUser] = useContext(AuthUserContext);

    const handleLogout = async () => {
        try {
            await logout();
            setAuthUser(null);
            appToast('User logged out', 'info');
        } catch (error) {}
    };

    return (
        <div className="logged-in-user-div">
            <span className="profile-span">
                <ProfileHeader user={authUser} />
                <Button
                    variant="contained"
                    className="logout-btn"
                    size="small"
                    color="secondary"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </span>
        </div>
    );
}
