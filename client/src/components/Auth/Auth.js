import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './main.css';
import logo from './user.png';

import { signup, signin } from '../../actions/auth.js';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup){
            dispatch(signup(formData, history));
        } else{
            dispatch(signin(formData, history));
        }
    }
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value});

    return (
        <div className='container'>
                <div className='form-heading'>
                    <img className='logo' src={logo} alt="logo" />
                    <h2 className='title'>{isSignup ? "Sign Up" : "Sign In"}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    {
                        isSignup && (
                            <>
                            <div className='name-container'>
                                <div className='input-container'>
                                    <label className='input-label'>First Name</label>
                                    <input className='field' type="text" name='firstName' onChange={handleChange} />
                                </div>
                                <div className='input-container'>
                                    <label className='input-label'>Last Name</label>
                                    <input className='field' type="text" name='lastName' onChange={handleChange} />
                                </div>
                            </div>
                            </>
                        )
                    }
                    
                    <div className='input-container'>
                            <label className='input-label'>Email</label>
                            <input className='field' type="email" name='email' onChange={handleChange} />
                    </div>
                    <div className='input-container'>
                            <label className='input-label'>Password</label>
                            <input className='field' type="password" name='password' onChange={handleChange} />
                    </div>

                    { isSignup && (
                        <div className='input-container'>
                                <label className='input-label'>Confirm Password</label>
                                <input className='field' type="text" name='confirmPassword' onChange={handleChange}/>
                        </div>
                    )}
                    <button type='submit' className='btn auth-btn'>{ isSignup ? 'Sign Up' : 'Sign In' }</button>
                </form>
                <button className='btn auth-btn switch-btn' onClick={switchMode}>{ isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }</button>
                
        </div>
    )
}

export default Auth
