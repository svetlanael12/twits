import React, { useEffect, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, isAuth, registration } from '../../actions/actionCreators';
import { useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../routers/routers';

export default function AuthPage() {
  const dispatch = useDispatch();
  const location = useLocation()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const isLogin = location.pathname === LOGIN_ROUTE

  function Login() {
    const body = {
      email: login,
      username: username,
      password: password
    }

    dispatch(registration(body))
  }

  function Login2() {
    const body = {
      email: login,
      password: password
    }
    dispatch(fetchPost(isAuth, '/auth/login', 'POST', '', body))
  }

  return (
    <div>
      {
        !isLogin ? 
        <div>
          <input type='text' placeholder='login' value={login} onChange={(e) => setLogin(e.target.value)}/>
          <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type='text' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={Login}>click</button>
        </div> : 
        <div>
        <div>
          <input type='text' placeholder='login' value={login} onChange={(e) => setLogin(e.target.value)}/>
          <input type='text' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={Login2}>click</button>
        </div></div>
      }
    </div>
  )
}
