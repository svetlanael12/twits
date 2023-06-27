import {
  ALL_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LOADING,
  ERROR,
  SUCCESS,
  IS_AUTH,
  CURRENT_POST,
} from './actionTypes';

export const allPosts = (posts) => ({
  type: ALL_POST, payload: { posts }
})

export const createPost = (post) => ({
  type: CREATE_POST, payload: { post }
})

export const updatePost = (post) => ({
  type: UPDATE_POST, payload: { post }
})

export const deletePost = (id) => ({
  type: DELETE_POST, payload: { id }
})

export const loading = () => ({
  type: LOADING
})

export const success = (success) => ({
  type: SUCCESS,
  payload: {success}
})

export const error = (err) => ({
  type: ERROR,
  payload: {err}
})

export function fetchPost(functionDispatch, URL, method, token = '', body = '') {
  return (dispatch, getState) => {
    dispatch(loading())

    let requestOptions = {
      method: method
    }
    if (method !== 'GET') {
      requestOptions.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      requestOptions.body = JSON.stringify(body)
    } 
    if (method === 'DELETE') {
      requestOptions.body = null
    }
    if (URL === '/auth/check') {
      requestOptions.headers = {
        'Authorization': `Bearer ${token}`
      }
    }
    fetch(`https://twits-backend.svetlanael12.repl.co${URL}`, requestOptions)
      .then(response => {
        if (response.status === 401 && response.statusText === 'Unauthorized') {
          dispatch(isAuth(null))
          dispatch(error({status: 'unAuth', message: 'Пожалуйста, авторизуйтесь'}))
        }
        return response.json()
      })
      .then(data => {
        if (data.status === "success") {
          dispatch(functionDispatch(data.body))
          dispatch(success(true))
        } else {
          dispatch(error(data))
        }
      })
      .catch((err) => {
        dispatch(error(err))
      })
      
  }
}

export const isAuth = (token) => ({
  type: IS_AUTH, payload: { token }
})

export const registration = (body) => {
  return (dispatch, getState) => {
    dispatch(loading())

    let requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    fetch(`https://twits-backend.svetlanael12.repl.co/auth/registration`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          dispatch(fetchPost(isAuth, '/auth/login', 'POST', '', {email: body.email, password: body.password}))
          dispatch(success())
        } else {
          dispatch(error(data))
        }
      })
      .catch((err) => {
        dispatch(error(err))
      })
  }
}

export const getCurrentPost = (post) => ({
  type: CURRENT_POST, payload: { post }
})