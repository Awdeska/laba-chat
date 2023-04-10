import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import ChatPage from "./pages/ChatPage";
import RegistrationPage from "./pages/RegistrationPage";
import {store} from "./index";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (value) => {
        setIsAuthenticated(value);
    };

    async function handleCheckAuth() {
        if (localStorage.getItem('token')) {
            await store.checkAuth();
            if (store.isAuthorized) {
                setIsAuthenticated(true);
            }
        }
    }

    useEffect(() => {
        handleCheckAuth();
    }, [isAuthenticated]);

    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route exact path="/" element=
                        {isAuthenticated ? (
                            <Navigate to="/chat" />
                        ) : (
                            <RegistrationPage setAuth={setAuth}/>
                        )}>
                    </Route>
                    <Route exact path="/chat" element={isAuthenticated ? (<ChatPage user={store.user}/>) : (<Navigate to="/"/>)}>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;