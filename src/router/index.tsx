import React from 'react';
import { BrowserRouter, useRoutes, Navigate } from 'react-router-dom';
import { AliveScope } from 'react-activation';
import Login from '@/pages/login';
import Layout from '@/layout';
//import Home from '@/pages/home'
import Fund from '@/pages/fund';

const Routes = () => {
    return useRoutes([
        {
            element: <Login />,
            path: '/login',
        },
        {
            element: <Layout />,
            children: [
                {
                    path: '/home',
                    element: <Fund />,
                },
            ],
        },
        {
            path: '*',
            element: <Navigate replace to={'/home'} />,
        },
    ]);
};

const AppRouter = () => {
    return (
        <BrowserRouter>
            <AliveScope>
                <Routes />
            </AliveScope>
        </BrowserRouter>
    );
};

export default AppRouter;
