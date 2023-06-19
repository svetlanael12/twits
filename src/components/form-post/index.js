import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, fetchPost, success } from '../../actions/actionCreators'
import { useNavigate } from 'react-router-dom'
import { HOME_ROUTE } from '../../routers/routers'

export default function FormPost({descProps, titleProps, func, URL, method}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {auth, state} = useSelector(state => state)
  const [title, setTitle] = useState(titleProps)
  const [desc, setDesc] = useState(descProps)

  const textareaRef = useRef()

  useEffect(() => {
    if (state.success) {
      dispatch(success(null))
      navigate(HOME_ROUTE)
    }
  }, [state.success])

  function textareaChange() {
    if (textareaRef.current.scrollHeight > textareaRef.current.clientHeight) {
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 3 + 'px'
    }
    if (textareaRef.current.style.borderColor === 'var(--pink)') {
      textareaRef.current.style.borderColor = '#fff'
    }
    setDesc(textareaRef.current.value)
  }

  function postSubmit() {
    if (desc.trim().length < 10) {
      textareaRef.current.style.borderColor = 'var(--pink)';
      return
    }

    const body = {
      description: desc.trim()
    }
    if (title.trim().length > 0) {
      body.title = title.trim();
    }
    dispatch(fetchPost(func, URL, method, auth, body))
  }

  return (
    <form className='form-post'>
      <label className='form-post__label'>
        <input type="text" className='input-custom' value={title} placeholder='Заголовок (по желанию)' maxLength="100" onChange={(e) => setTitle(e.target.value)}/>
        <div className='form-post__length'>
          <span>{title.length}</span>
          <span>&nbsp;/ 100</span>
        </div>
      </label>
      <label className='form-post__label'>
        <textarea type="text" className='input-custom form-post__textarea' value={desc} placeholder='Ваш пост (обязательно хотя бы 10 символов)' maxLength="500" minLength="10" onChange={textareaChange} ref={textareaRef} />
        <div className='form-post__length'>
          <span>{desc.length}</span>
          <span>&nbsp;/ 500</span>
        </div>
      </label>
      <button className='btn-pink' type='button' onClick={postSubmit}>Опубликовать</button>
    </form>
  )
}
