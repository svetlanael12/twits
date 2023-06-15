import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { CREATE_POST_ROUTE, HOME_ROUTE, LOGIN_ROUTE, POST_ROUTE, REGISTRATION_ROUTE, UPDATE_POST_ROUTE } from './routers';
import HomePage from '../pages/home-page';
import PostPage from '../pages/post-page';
import CreatePostPage from '../pages/create-post-page';
import UpdatePostPage from '../pages/update-post-page';
import Auth from '../pages/auth-page';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, isAuth } from '../actions/actionCreators';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  useEffect(() => {
    let token = localStorage.getItem('token');
    dispatch(fetchPost(isAuth, '/auth/check', 'GET', token))
  }, [])

  let publicRoutes = useRoutes([
    {
      path: HOME_ROUTE,
      element: <HomePage />,
    },
    {
      path: LOGIN_ROUTE,
      element: <Auth />,
    },
    {
      path: REGISTRATION_ROUTE,
      element: <Auth />,
    },
    {
      path: POST_ROUTE + '/:id',
      element: <PostPage />,
    }
  ]);
  let authRoutes = useRoutes([
    {
      path: CREATE_POST_ROUTE,
      element: <CreatePostPage />,
    },
    {
      path: UPDATE_POST_ROUTE + '/:id',
      element: <UpdatePostPage />,
    },
  ]);
  return (
    <>
      {publicRoutes} 
      {auth && authRoutes}
    </>
  );
};

export default AppRouter;