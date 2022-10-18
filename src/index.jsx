import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import AuthUserProvider from './providers/AuthUserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <AuthUserProvider>
            <RouterProvider router={router} />
        </AuthUserProvider>
    </StrictMode>
);
