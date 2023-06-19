import React, { useEffect } from 'react'
import Post from '../post'

import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPost } from '../../actions/actionCreators'

export default function AllPosts({posts}) {
  const dispatch = useDispatch()
  const {currentPost} = useSelector(state => state)

  useEffect(() => {
    dispatch(getCurrentPost(null))
  }, [currentPost])

  return (
    <div className='all-posts'>
      {
        posts.length !== 0 ?
        posts.map((post, ind) => <Post key={ind} post={post} />) :
        <span>Постов нет</span>
      }
    </div>
  )
}
