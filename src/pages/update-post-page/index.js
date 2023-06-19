import React, { useEffect } from 'react'
import './index.css'
import FormPost from '../../components/form-post'
import { updatePost } from '../../actions/actionCreators'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../routers/routers'

export default function UpdatePostPage() {
  const { currentPost } = useSelector(state => state)

  return (
    <FormPost descProps={currentPost.description} titleProps={currentPost.title} func={updatePost} URL={`/${currentPost._id}`} method='PUT' />
  )
}
