import React from 'react'
import { Button} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts.js';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import './main.css';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
        <div className='post-card'>

            <div className='container1'>
                <img className='post-image' src={post.selectedFile} alt='post-preview' />
                <h2 className='post-creator'>{post.name}</h2>
                <div className='edit-btn'>
                {( user?.result?._id === post?.creator ) && (
                    <Button style={{color:'white'}} size="large" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="large" />
                    </Button>
                )}
                </div>
            </div>
            
           <div className='container2'>
                <div className='post-desc'>
                    <h2 className='post-title'>{post.title}</h2>
                    <p className='post-message'>{post.message}</p>
                </div>
                
                <div className='buttons'>
                    <button className='icon-btn icon-primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                        <Likes />
                    </button>

                    {( user?.result?._id === post?.creator ) && (
                        <button className='icon-btn' onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="medium"/>
                            Delete
                        </button>
                    )}
                </div>
           </div>
        
            
        </div>
    )
}

export default Post
