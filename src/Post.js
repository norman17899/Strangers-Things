import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SendMessages from './SendMessage';

const Post = (props) => { 

  const {posts, token, user } = props
  const id = useParams().id;
  const post = posts.find(post => post._id === id)

  if (!post) {
    return null;
  }

  return (
    <div>
      <div>
        <h1><Link to={'/posts'}>{ post.title }</Link></h1>
        <p><span className="postHeaders">Description: </span>{post.description}</p>
        <p><span className="postHeaders">Price: </span>{post.price}</p>
        <p><span className="postHeaders">Location: </span>{post.location}</p>
      </div>
      <div>
        <SendMessages post={post} token={token}/>
      </div>
    </div>
  )
}
 
export default Post
