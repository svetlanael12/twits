import React from 'react'
import './index.css'
import FormPost from '../../components/form-post'
import { createPost } from '../../actions/actionCreators'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../routers/routers'

export default function CreatePostPage() {
  // const { auth } = useSelector(state => state)

  return (
    <FormPost titleProps='' descProps='' func={createPost} URL='/create' method='POST' />
  )
}
