import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HOME_ROUTE } from '../../routers/routers'
import { fetchPost, isAuth, registration, success } from '../../actions/actionCreators'

import visibleEye from '../../assets/svg/eye-visible.svg'
import notVisibleEye from '../../assets/svg/not-visible-eye.svg'

import './index.css'

export default function FormAuth({ isLogin }) {
  const dispatch = useDispatch()
  const { state, auth } = useSelector(state => state)
  const { error } = state;

  const navigate = useNavigate()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [visiblePassword, setVisiblePassword] = useState(false)

  const refPassword = useRef()

  useEffect(() => {
    auth && navigate(HOME_ROUTE)
  }, [auth])

  useEffect(() => {
    if (state.success) {
      dispatch(success(null))
    }
  }, [state.success])

  function RegSubmit(e) {
    e.preventDefault();
    const body = {
      email: login,
      username: username,
      password: password
    }

    dispatch(registration(body))
  }

  function LogSubmit(e) {
    e.preventDefault()
    const body = {
      email: login,
      password: password
    }
    dispatch(fetchPost(isAuth, '/auth/login', 'POST', '', body))
  }

  function onVisiblePassword(e) {
    e.preventDefault()
    visiblePassword ? setVisiblePassword(false) : setVisiblePassword(true)
    visiblePassword ? refPassword.current.type = 'password' : refPassword.current.type = 'text'
  }

  return (
    <form className='auth-page__form'>
      <div className='auth-page__email auth-page__wrp-input'>
        <input name='email' className={`input-custom ${error && error.field === 'email' && 'error'}`} type='text' placeholder='Email' value={login} onChange={(e) => setLogin(e.target.value)} />
        {
          error && error.field === 'email' &&
          <span className='auth-page__error auth-page__error-email'>{error.message}</span>
        }
      </div>
      {
        !isLogin &&
        <div className='auth-page__username auth-page__wrp-input'>
          <input name='username' className={`input-custom ${error && error.field === 'username' && 'error'}`} type='text' placeholder='Имя' value={username} onChange={(e) => setUsername(e.target.value)} />
          {
            error && error.field === 'username' &&
            <span className='auth-page__error auth-page__error-username'>{error.message}</span>
          }
        </div>
      }
      <div className='auth-page__pass auth-page__wrp-input'>
        <input name='password' className={`input-custom ${error && error.field === 'password' && 'error'}`} type='password' placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)} ref={refPassword} />
        {
          error && error.field === 'password' &&
          <span className='auth-page__error auth-page__error-password'>{error.message}</span>
        }
        <button className='auth-page__eye' onClick={onVisiblePassword}>
          {
            visiblePassword ?
              <img src={visibleEye} alt="eye" width='20' /> :
              <img src={notVisibleEye} alt="not-eye" width='20' />
          }
        </button>
      </div>
      {
        isLogin ?
          <button className='btn-pink' onClick={LogSubmit}>Войти</button> :
          <button className='btn-pink' onClick={RegSubmit}>Зарегистрироваться</button>
      }
    </form>
  )
}
