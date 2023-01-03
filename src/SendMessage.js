import React, { useState } from 'react';

const SendMessages = (props) => {

    const [inquiry, setInquiry] = useState('')
    const { token, post } = props
    
    
    const sendMessage = (event) => {
        event.preventDefault();
    
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
            <h3>Send Seller a Message</h3>
          <form id='messageForm' onSubmit = { sendMessage }>
          <input 
            placeholder='Type Message Here'
            value= { inquiry }
            onChange = {ev => setInquiry(ev.target.value)}/> 
            <button>Send</button>
          </form>
          {/* <ul>
            {
              posts.map(message => {
                return (
                  <div key ={ message._id } className="communicationMessage">
                    <p></p>
                  </div>
                )
              })
            }
          </ul> */}
        </div>
    )
}

export default SendMessages