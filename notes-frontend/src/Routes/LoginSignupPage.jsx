// LoginSignupPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axios';

const LoginSignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/signedin');
    }
  }, [navigate]);

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle login or signup logic here
    if(isLogin){
    const { data, status } = await axiosInstance.post('/notes/login', {
      email,
      password
    });
    if (status === 200) {
      localStorage.setItem('token', data.token);
      navigate('/signedin');
    }
  } else {
    const { data, status } = await axiosInstance.post('/notes/login', {
      email,
      password,
      name: username
    });
    if (status === 200) {
      localStorage.setItem('token', data.token);
      navigate('/login');
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
