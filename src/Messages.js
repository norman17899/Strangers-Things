import React, { useState } from 'react';

const Messages = (props) => {

    const [inquiry, setInquiry] = useState('')
    const { token, post } = props 
    
    const sendMessage = (event) => {
        event.preventDefault();
    
        console.log(inquiry)

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
          clearForm ();
      }
    
      const clearForm = () => {
        setInquiry("")
    }

    return (
        <div>
            <h3>Send Seller a Message</h3>
            <form id='messageForm' onSubmit = { sendMessage }>
            <input 
                placeholder='Type Message Here'
                value= { inquiry }
                onChange = {ev => setInquiry(ev.target.value)}/> 
                <button>Send</button>
            </form>
            <h3>Messages</h3>
            <p id='preview'><span className='postHeaders'>Message Preview: </span>{inquiry}</p>
            
            {/* <ul>
                {
                posts.map(message => {
                    return (
                        <div key ={ message._id } className="communicationMessage">
                            <div>{message.content}</div>
                        </div>
                    )
                })
                }
            </ul> */}
        </div>
    )
}

export default Messages