import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { POST_ROUTE, PROFILE_ROUTE } from '../../routers/routers'

import './index.css'
import { useSelector } from 'react-redux'
import LoadingIcon from '../loading'

export default function Post({post}) {
  const [date, setDate] = useState('')
  const { currentPost } = useSelector(state => state)

  const [elem, setElem] = useState()

  useEffect(() => {
    if (currentPost) {
      setElem(currentPost)
    } else {
      setElem(post)
    }
  }, [])

  useEffect(() => {
    if (elem) {
      console.log(elem)
      const date = new Date(elem.date)
      const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      setDate(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${hours}:${minute}`)
    }
}, [elem])

  return (
    <>
    {
      elem ?
      <NavLink className='post' to={`${POST_ROUTE}/${elem._id}`}>
          <div className='post__header'>
            <NavLink to={PROFILE_ROUTE + `/${elem.userID}`} className='menu__icon'>
              @{elem.username}
            </NavLink>
            <span className='post__date'>{date}</span>
          </div>
          <h2 className='post__title'>{elem.title}</h2>
          <p className='post__pg'>{elem.description}</p>
        </NavLink> :
        <LoadingIcon />
    } 
    </>
  )
}
