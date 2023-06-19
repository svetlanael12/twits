import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  error, getCurrentPost, loading, success } from '../../actions/actionCreators'
import Post from '../../components/post'
import LoadingIcon from '../../components/loading'

import './index.css'
import FullPost from '../../components/full-post'

export default function PostPage() {
  const { id } = useParams()
  const {currentPost} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    const getPost = () => {
      return (dispatch) => {
        dispatch(loading())

        fetch(`http://localhost:5000/${id}`)
          .then(response => response.json())
          .then(data => {
            if (data.status === "success") {
              dispatch(getCurrentPost(data.body))
              dispatch(success(null))
            } else {
              dispatch(error(data))
            }
          })
          .catch((err) => {
            dispatch(error(err))
          })
      }
    }
    dispatch(getPost())
  }, [])

  return (
    currentPost ?
      <>
        <FullPost/>
        <h2 style={{ color: '#fff', textAlign: 'center' }}>Комментариев пока нет</h2>
      </> :
      <LoadingIcon />
  )
}
