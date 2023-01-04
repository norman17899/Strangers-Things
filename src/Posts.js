import React from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from './api';

const Posts = (props) => {

  const {posts, user, token} = props;
  console.log(posts)
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {
          posts.map(post => {
            return (
              <div key ={ post._id } className={ user._id === post.author._id ? "singlePost myPost" : "singlePost"}>
                <h2><Link to={`/posts/${post._id}`}>{post.title}</Link></h2>
                <p><span className="postHeaders">Description: </span>{post.description}</p>
                <p><span className="postHeaders">Price: </span>{post.price}</p>
                <p><span className="postHeaders">Location: </span>{post.location}</p>
                { user._id === post.author._id ? (<button onClick={() => deletePost(post._id, token)} id='deleteButton'>Delete</button>) : null}
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Posts
