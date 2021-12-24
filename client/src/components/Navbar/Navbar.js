import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import './main.css';
import logo from './user.png';

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/auth');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    return (
            
        <div className='navbar'>
            <div className='title-section'>
                <Link to="/" className='title'>Memories</Link>
            </div>
            <div className='auth-section'>
                    { user ? (
                        <div className='profile'>
                        <img className='logo' src={logo} alt="profile-icon" />
                            <h2>{user.result.name}</h2>
                            <button className='btn' onClick={logout}>Logout</button>
                        </div>  
                    ) : (   
                        <Link className='btn' to="/auth">Sign In</Link>
                    )}
            </div>
        </div>

            
    )
}

export default Navbar
