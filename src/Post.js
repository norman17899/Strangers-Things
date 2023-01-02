import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Post = (props) => { 

  const {posts, token, user} = props
  const id = useParams().id;
  const post = posts.find(post => post._id === id)

  const [inquiry, setInquiry] = useState('')

  if (!post) {
    return null;
  }

  const sendMessage = () => {
    fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${post._id}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    body: JSON.stringify({
      message: {
        content: inquiry
      }
    })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
    })
      .catch(console.error);
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
      <h3>Send Seller a Message</h3>
      <form id='messageForm' onSubmit = { sendMessage }>
        <input 
          placeholder='Type Message Here'
          value= { inquiry }
          onChange = {ev => setInquiry(ev.target.value)}/> 
          <button>Send</button>
          <ul>
          {
          post.messages.map(message => {
            return (
              <li key ={ message._id }>{message.content}</li>
            )
          })
        }
      </ul>
      </form>
     </div>
    </div>
  )
}
 
export default Post
