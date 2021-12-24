import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../../actions/posts.js';
import './main.css';

const Form = ({currentId, setCurrentId}) => {
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);
    
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        selectedFile: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name } ));
        } else{
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();

    }
    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', selectedFile: ''})
    }


    if(!user?.result?.name){
        return(
            <div className='create-post'>
                <h2 className='create-post-heading'>Please Sign In to create your own Memories and like other's Memories.</h2>
            </div>
        )
    }

    return (    
        
        <div className='create-post'>
                <h2 className='create-post-heading'>{currentId? 'Editing' : 'Creating'} A Memory</h2>
                <form onSubmit={handleSubmit}>
                
                    <div className='input-container'>
                            <label className='label'>Title</label>
                            <input name="title" spellCheck="false" className='create-field' type="text" onChange={(e) => setPostData({ ...postData, title: e.target.value })} value={postData.title} />
                    </div>
                    <div className='input-container'>
                            <label className='label'>Message</label>
                            <input name="message" spellCheck="false" className='create-field' type="text" onChange={(e) => setPostData({ ...postData, message: e.target.value })} value={postData.message} />
                    </div>
                    <div className='input-container'>
                        <label className="custom-file-upload">
                            <FileBase type="file" multiple={false} onDone ={({base64}) => setPostData({ ...postData, selectedFile: base64})} />
                            Upload An Image
                        </label>
                    </div>
                    <button type='submit' className='btn auth-btn'>Submit</button>
                </form>
                <button type='submit' className='btn auth-btn btn1' onClick={clear}>Reset</button>
        </div>

    )
}

export default Form;
