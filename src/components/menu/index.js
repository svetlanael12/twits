import React, { useEffect, useState } from 'react'
import './index-mobile.css'
import './index-desktop.css'
import { NavLink } from 'react-router-dom'
import { CREATE_POST_ROUTE, HOME_ROUTE, LOGIN_ROUTE, POST_ROUTE, PROFILE_ROUTE } from '../../routers/routers'

import {ReactComponent as ReactBlog} from '../../assets/svg/blog.svg';
import {ReactComponent as ReactPlus} from '../../assets/svg/plus.svg';
import {ReactComponent as ReactProfile} from '../../assets/svg/profile.svg';
import { useSelector } from 'react-redux'

export default function Menu() {
  const [ID, setID] = useState()
  const {auth} = useSelector(state => state)

  useEffect(() => {
    if (auth) {
      const decode = decodeURIComponent(escape(atob(auth.split('.')[1])))
      setID(JSON.parse(decode).userId)
    }
  }, [auth])

  return (
    <div className='menu'>
      <NavLink to={HOME_ROUTE} className='menu__icon'>
        <ReactBlog />
      </NavLink>
      <NavLink to={CREATE_POST_ROUTE} className='menu__icon'>
        <ReactPlus />
      </NavLink>
      {
        ID ? 
        <NavLink to={PROFILE_ROUTE + `/${ID}`} className='menu__icon'>
          <ReactProfile />
        </NavLink> :
        <NavLink to={LOGIN_ROUTE} className='menu__icon'>
          <ReactProfile />
        </NavLink>
      }
    </div>
  )
}
