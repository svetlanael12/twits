import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../routers/routers';

import FormAuth from '../../components/form-auth';
import './index.css'

export default function AuthPage() {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE

  return (
    <div className='auth-page'>
      {
        isLogin ?
        <h2 className='title'>Авторизация</h2> :
        <h2 className='title'>Регистрация</h2>
      }
      <FormAuth isLogin={isLogin}/>
      {
        isLogin ?
        <p className='auth-page__subtitle'>Не зарегистрированы? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink></p> :
        <p className='auth-page__subtitle'>Уже зарегистрированы? <NavLink to={LOGIN_ROUTE}>Авторизуйтесь</NavLink></p>
      }
    </div>
  )
}
