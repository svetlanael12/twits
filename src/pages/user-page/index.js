import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { LOGIN_ROUTE } from '../../routers/routers'
import { error, isAuth, loading, success } from '../../actions/actionCreators'
import LoadingIcon from '../../components/loading'

import Post from '../../components/post'
import BtnBack from '../../components/button-back'

export default function UserPage() {
  const {id} = useParams()
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [posts, setPosts] = useState()
  const [user, setUser] = useState()
  const [btnLogOut, setBtnLogOut] = useState(false)

  useEffect(() => {
    if (auth && user) {
      const decode = decodeURIComponent(escape(atob(auth.split('.')[1])))
      if (JSON.parse(decode).userId === user.ID) {
        setBtnLogOut(true)
      }
    }
  }, [auth, user])

  useEffect(() => {
    const allPosts = []
    const getPost = (postId) => {
      return (dispatch) => {
        dispatch(loading())

        fetch(`https://twits-backend.svetlanael12.repl.co/${postId}`)
          .then(response => response.json())
          .then(data => {
            if (data.status === "success") {
              dispatch(success(null))
              allPosts.push(data.body)
            } else {
              dispatch(error(data))
            }
          })
          .catch((err) => {
            dispatch(error(err))
          })
      }
    }

    const getUser = () => {
      return (dispatch) => {
        dispatch(loading())

        fetch(`https://twits-backend.svetlanael12.repl.co/auth/user/${id}`)
          .then(response => response.json())
          .then(data => {
            if (data.status === "success") {
              setUser(data.body)
              console.log(data.body)
              data.body.posts.map((postId) => {
                dispatch(getPost(postId))
              })
              setPosts(allPosts)
              dispatch(success(null))
            } else {
              setUser('Пользователь не найден')
              dispatch(error(data))
            }
          })
          .catch((err) => {
            dispatch(error(err))
          })
      }
    }
    dispatch(getUser())
    
  }, [])

  function LogOut() {
    localStorage.setItem('token', null)
    dispatch(isAuth(null))
    navigate(LOGIN_ROUTE)
  }

  return (
    <section className='profile-page'>
    <BtnBack />
      {
        user ? 
        <>
        {
          typeof user !== 'string' ? 
            <div className='profile-page__info-user'>
              <div className='profile-page__info-user_text'>
                <p className='profile-page__username'>@{user.username}</p>
                <p className='profile-page__posts'>{user.posts.length > 0 ? user.posts.length : 'Нет'} записей</p>
              </div>
              {
                btnLogOut &&
                <button type='button' onClick={LogOut} className='btn-purple'>Выйти</button> 
              }
            </div> :
          <div>Пользователь не найден</div>
        }
        {
          typeof posts !== 'string' || posts.length < 1 ? 
          posts.map((post, ind) => <Post key={ind} post={post}/>) :
          <div>Постов нет</div>
        }
        </> :
        <LoadingIcon />
      }
    </section>
  )
}

