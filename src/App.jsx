import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';

import MainLayout from './layout/MainLayout';

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem("token") || location?.state?.token) {
            setToken(localStorage.getItem("token"));
        } else {
            navigate('/login');
        }
    }, []);

    function PrivateRoute({ isAuth, children }) {
        if (!isAuth) {
            navigate("/login");
        }

        return children;
    }

    return (
        <div className="container">
            <Routes>
                <Route index element={
                    <PrivateRoute isAuth={!!token}>
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    </PrivateRoute>
                } />

                <Route path='/login' element={
                    <MainLayout>
                        <Login />
                    </MainLayout>
                } />

                <Route path='/register' element={
                    <MainLayout>
                        <Register />
                    </MainLayout>
                } />

                <Route path='*' element={
                    <PrivateRoute isAuth={!!token}>
                        <MainLayout>
                            <Error />
                        </MainLayout>
                    </PrivateRoute>
                } />
            </Routes>
        </div>
    );
}

export default App;