import React from 'react';
import { CircularProgress } from '@material-ui/core'
import { useSelector  } from 'react-redux';

import Post from './Post/Post.js';

import './main.css';

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);

    return (
        !posts.length ? <CircularProgress /> : (
            <div className='posts-content'>
                { 
                    posts.map((post) => (
                            <Post post={post} setCurrentId={setCurrentId} />
                    ))
                }
            </div>
        )
    )
}

export default Posts
