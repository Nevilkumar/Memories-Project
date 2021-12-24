import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Posts from '../Posts/Posts.js'
import Form from '../Form/Form.js'
import './main.css';
import { getPosts } from '../../actions/posts.js';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
            <div className='main-container'>
                <div className='posts-container'>
                    <Posts setCurrentId={setCurrentId} />
                </div>
                <div className='form-container'>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                </div>
            </div>
    )
}

export default Home
