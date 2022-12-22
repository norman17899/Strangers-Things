import React, { useState } from 'react';

const NewPost = ()=> {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    
    const createPost = () => {
        const token = window.localStorage.getItem('token');
        if (token) {
          fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${ token }`
          },
            body: JSON.stringify({
              post: {
                title: title,
                description: description,
                price: price,
                location: !location ? 'Location on Request' : location
                }
            })
          }).then(response => response.json())
            .then(result => {
              console.log(result);
            })
            .catch(error => console.log(error));
            clearForm();
          }
      }
    
    const clearForm = () => {
        setTitle('')
        setDescription('')
        setLocation('')
        setPrice('')
    }

    return (
        <form onSubmit={ev => createPost() }>
            <input 
            placeholder="Title"
            value={title}
            onChange = {ev => setTitle(ev.target.value)}
            />
            <input 
            placeholder="Description"
            value={description}
            onChange = {ev => setDescription(ev.target.value)}
            />
            <input 
            placeholder="Price"
            value={price}
            onChange = {ev => setPrice(ev.target.value)}
            />
            <input 
            placeholder="Location"
            value={location}
            onChange = {ev => setLocation(ev.target.value)}
            />
            <button>Create Post</button>
        </form>
    )
}

export default NewPost