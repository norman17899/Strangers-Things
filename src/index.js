import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { useLocation, HashRouter, Routes, Route, Link, json } from 'react-router-dom';
import Posts from './Posts'
import Post from './Post'

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
  const [userName, setUsername] = ('')
  const [password, setPassword] = ('')

  useEffect (()=> { 
    fetch ("https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT_AM/posts")
      .then (response => response.json())
      .then (json => setPosts(json.data.posts))
  },[])

  return (
    <div>
      {/*<Nav posts={posts}/>*/}
      <h1>Stranger's Things</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts ({posts.length})</Link>
      </nav>

      <Routes>
        <Route path="/posts/:id" element= {
          <Post posts={posts} />
        }
        />
        <Route path ="/posts" element= { 
          <Posts posts = {posts} />} 
        />
        <Route path='/' element= { 
          <form>
            <input 
              placeholder="username">
            </input>
            <input placeholder="password">
            </input>
            <span>
              <button>Register</button>
              <button>Login</button>
            </span>
          </form>
        }/>
      </Routes> 
    </div>
  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
