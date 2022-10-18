import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import UserFromRoute from './UserFromRoute';
import ErrorPage from './ErrorPage';
import Feed from './Feed';
import GuestRoute from './route/GuestRoute';
import Login from './Login';
import PrivateRoute from './route/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: (
            <PrivateRoute>
                <ErrorPage />
            </PrivateRoute>
        ),
        children: [
            {
                path: 'login',
                element: (
                    <GuestRoute>
                        <div className="login-div">
                            <Login />
                        </div>
                    </GuestRoute>
                )
            },
            {
                path: '',
                element: <PrivateRoute />,
                children: [
                    {
                        path: 'feed',
                        element: <Feed />
                    },
                    {
                        path: 'user/:username',
                        element: <UserFromRoute />
                    }
                ]
            }
        ]
    }
]);

export default router;
