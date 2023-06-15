import {
  ALL_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LOADING,
  ERROR,
  SUCCESS,
  IS_AUTH,
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

export const success = () => ({
  type: SUCCESS
})

export const error = (message) => ({
  type: ERROR,
  payload: {message}
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
    if (URL === '/auth/check') {
      requestOptions.headers = {
        'Authorization': `Bearer ${token}`
      }
    }

    fetch(`http://localhost:5000${URL}`, requestOptions)
      .then(response => {
        if (response.status === 401 && response.statusText === 'Unauthorized') {
          dispatch(isAuth(null))
          dispatch(error('Пожалуйста, авторизуйтесь'))
          console.log(getState())
        }
        return response.json()
      })
      .then(data => {
        if (data.status === "success") {
          dispatch(functionDispatch(data.body))
          dispatch(success())
        } else {
          console.log('data', data)
          dispatch(error(data.message))
        }
        console.log(getState())
      })
      .catch((err) => {
        dispatch(error())
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

    fetch(`http://localhost:5000/auth/registration`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          dispatch(fetchPost(isAuth, '/auth/login', 'POST', '', {email: body.email, password: body.password}))
          dispatch(success())
        } else {
          // console.log('registration', data)
          dispatch(error(data.message))
        }
        console.log('registration', getState())
      })
      .catch((err) => {
        dispatch(error(err))
      })
  }
}