import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { useLocation, HashRouter, Routes, Route, Link, json } from 'react-router-dom';
import Posts from './Posts'
import Post from './Post'
import Login from './Login'
import Register from './Register';

// const Nav = (props) => {
//   const posts = props.posts;
//   const location = useLocation();
//   const pathname = location.pathname;
//   return (
//     <nav>
//       <Link to='/' className={pathname === '/' ? 'selected' : ''}>Home</Link>
//       <Link to='/posts' className={pathName.startWith('/posts/' ? 'selected' : '')}>Posts ({posts.length})</Link>
//     </nav>
//   )
// }

const App = ()=> {
  // https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [token, setToken] = useState(null)


  useEffect (()=> { 
    fetch ("https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts")
      .then (response => response.json())
      .then (json => setPosts(json.data.posts))

    exchangeTokenForUser();
  },[posts])

  const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem('token');
    setToken(token);
    if (token) {
      fetch ('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`
        },
      })
      .then (response => response.json())
      .then (result => {
        const user = result.data;
        setUser(user);
      })
      .catch(error => console.log(error));
    }
  }

  const logout = () => {
    window.localStorage.removeItem('token');
    setToken(null)
    setUser({});
  }

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
            location: location
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
    <div>
      {/*<Nav posts={posts}/>*/}
      <h1>Stranger's Things</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts ({posts.length})</Link>
      </nav>
      {
        user._id ? <div>Welcome { user.username } <button onClick={ logout }>Logout</button></div> : null
      }
      {
        !user._id ? (
          <div id="homeForm">
            <Register />
            <Login exchangeTokenForUser= { exchangeTokenForUser } />
          </div>) : null
      }
      {
        user._id ? (
          <form onSubmit={ createPost }>
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
        ) : null
      }
      <Routes>
        <Route path="/posts/:id" element= {
          <Post posts={posts} />
        }
        />
        <Route path ="/posts" element= { 
          <Posts posts = {posts} user={user} token={token} />} 
        />
        <Route path='/' element= {<div>Home</div>}/>
      </Routes> 
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
