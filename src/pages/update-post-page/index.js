import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { updatePost } from '../../actions/actionCreators'

import FormPost from '../../components/form-post'

export default function UpdatePostPage() {
  const { currentPost } = useSelector(state => state)

  return (
    <FormPost descProps={currentPost.description} titleProps={currentPost.title} func={updatePost} URL={`/${currentPost.id}`} method='PUT' />
  )
}
