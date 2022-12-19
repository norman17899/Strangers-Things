import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { useLocation, HashRouter, Routes, Route, Link, json } from 'react-router-dom';
import Posts from './Posts'
import Post from './Post'
import Login from './Login'

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
  // https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT_AM/posts

  const [posts, setPosts] = useState([]);
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [user, setUser] = useState('')

  useEffect (()=> { 
    fetch ("https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT_AM/posts")
      .then (response => response.json())
      .then (json => setPosts(json.data.posts))

    exchangeTokenForUser();
  },[])

  const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem('token');
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

  const register = (ev) => {
    ev.preventDefault();
    fetch ("https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/register", {
      method: "POST",
      headers: {
        'Content-Type': 'applicaiton/json'
      },
      body: JSON.stringify ({
        user: {
          username: registerUsername,
          password: registerPassword
        }
      })
    })
    .then (response => response.json())
    .then (result => {
      if (!result.success) {
        throw result.error
      }
      console.log(result);
    })
    .catch (error => console.log(error))
  }

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser({});
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
        user._id ? <div>Welcome {user.username} <button onClick={logout}>Logout</button></div> : null
      }
      {
        !user._id ? (
          <div id="homeForm">
            <form onSubmit = { register }>
              <input 
                placeholder="username"
                value={registerUsername}
                onChange = {ev => setRegisterUsername(ev.target.value)}
              />
              <input 
                placeholder="password"
                value={registerPassword}
                onChange = {ev => setRegisterPassword(ev.target.value)}
                />
                <button>Register</button>
            </form>
            <Login exchangeTokenForUser= { exchangeTokenForUser } />
          </div>) : null
      }
      <Routes>
        <Route path="/posts/:id" element= {
          <Post posts={posts} />
        }
        />
        <Route path ="/posts" element= { 
          <Posts posts = {posts} />} 
        />
        <Route path='/' element= {<div>Home</div>}/>
      </Routes> 
    </div>
  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
