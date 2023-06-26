import React from 'react'
import FormPost from '../../components/form-post'
import { createPost } from '../../actions/actionCreators'

export default function CreatePostPage() {
  return (
    <div>
      <FormPost titleProps='' descProps='' func={createPost} URL='/create' method='POST' />
    </div>
  )
}
