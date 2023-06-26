import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { allPosts, fetchPost, success } from '../../actions/actionCreators';
import LoadingIcon from '../../components/loading';
import AllPosts from '../../components/all-posts';


export default function HomePage() {
  const dispatch = useDispatch();
  const {state, posts} = useSelector(state => state);
  const {loading} = state;
  
  useEffect(() => {
    dispatch(fetchPost(allPosts, '/', 'GET'))
  }, [])

  useEffect(() => {
    if (state.success) {
      dispatch(success(null))
    }
  }, [state.success])

  return (
    <div>
      {
        loading ?
        <LoadingIcon /> :
        <AllPosts posts={posts} />
      }
    </div>
  )
}
