import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, fetchPost, success } from '../../actions/actionCreators'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { HOME_ROUTE, UPDATE_POST_ROUTE } from '../../routers/routers'

import Post from '../post'
import './index.css'

export default function FullPost() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const {auth, state} = useSelector(state => state)
  const [edit, setEdit] = useState(false)
  const {currentPost} = useSelector(state => state)
  const {userID} = currentPost

  useEffect(() => {
    if (auth) {
      const decode = decodeURIComponent(escape(atob(auth.split('.')[1])))
      if (JSON.parse(decode).userId === userID) {
        setEdit(true)
      }
    }
  }, [auth])

  useEffect(() => {
    if (state.success) {
      dispatch(success(null))
      navigate(HOME_ROUTE)
    }
  }, [state.success])

  function deleteClick(e) {
    e.preventDefault()
    dispatch(fetchPost(deletePost, `/${id}`, 'DELETE', auth))
  }

  return (
    <div className='full-post'>
      <Post/>
      {
        edit &&
        <div className='full-post__wrp-btns'>
          <NavLink to={UPDATE_POST_ROUTE + `/${id}`} className='full-post__btn full-post__btn_update'>Изменить</NavLink>
          <button className='full-post__btn full-post__btn_delete' onClick={deleteClick}>Удалить</button>
        </div> 
      }
    </div>
  )
}
