import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
    </StrictMode>
);
