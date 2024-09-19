// LoginSignupPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginSignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle login or signup logic here
    if(isLogin){
    const result = await fetch('https://notes-mern-y8iv.onrender.com/notes/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-type': 'application/json'
        } 
      })
      const data = await result.json();
      const statusCode = result.status;
      if(statusCode === 200){
        localStorage.setItem('token', data.token)
        window.location.href = '/signedin';
      }
    }else{
     const res = await fetch('https://notes-mern-y8iv.onrender.com/notes/signup', {
        method: 'POST',
        body: JSON.stringify({
          name:username,
          email,
          password
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      const data = await res.json();
      const statusCode = res.status;
      if(statusCode === 200){
        localStorage.setItem('token', data.token)
        window.location.href = '/login';
      }
    }
  };

  return (
    <div className='signup-login'>
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />}
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        <p>
          {isLogin ? (
            <Link to="/signup" onClick={()=>setIsLogin(false)}>Don't have an account? Signup here</Link>
          ) : (
            <Link to="/login" onClick={()=>setIsLogin(true)}>Already have an account? Login here</Link>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginSignupPage;