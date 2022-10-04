import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import UserFromRoute from './UserFromRoute';
import ErrorPage from './ErrorPage';
import Feed from './Feed';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Feed />
            },
            {
                path: 'user/:username',
                element: <UserFromRoute />
            }
        ]
    }
]);

export default router;
