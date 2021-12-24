import { Container } from '@material-ui/core';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import Auth from './components/Auth/Auth.js';

const App = () => {
    
    return (
        <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/auth" exact element={<Auth />} />
                </Routes>
        </BrowserRouter>
    )
}

export default App;
