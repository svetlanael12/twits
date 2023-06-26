import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { POST_ROUTE, USER_ROUTE } from '../../routers/routers'
import LoadingIcon from '../loading'

import './index.css'

export default function Post({ post }) {
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
          <NavLink className='post' to={`${POST_ROUTE}/${elem.id}`}>
            <div className='post__header'>
              <NavLink to={USER_ROUTE + `/${elem.userID}`}>
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
