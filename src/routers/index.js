import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, isAuth, success } from '../actions/actionCreators';
import { CREATE_POST_ROUTE, HOME_ROUTE, LOGIN_ROUTE, POST_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, UPDATE_POST_ROUTE, USER_ROUTE } from './routers';
import HomePage from '../pages/home-page';
import PostPage from '../pages/post-page';
import CreatePostPage from '../pages/create-post-page';
import UpdatePostPage from '../pages/update-post-page';
import Auth from '../pages/auth-page';
import Menu from '../components/menu';
import ProfilePage from '../pages/profile-page';
import UserPage from '../pages/user-page';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { auth, state } = useSelector(state => state);

  useEffect(() => {
    let token = localStorage.getItem('token');
    console.log(token)
    dispatch(fetchPost(isAuth, '/auth/check', 'GET', token))
  }, [])

  useEffect(() => {
    if (state.success) {
      dispatch(success(null))
    }
  }, [state.success])

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
    },
    {
      path: USER_ROUTE + '/:id',
      element: <UserPage />,
    },
  ]);
  let authRoutes = useRoutes([
    {
      path: PROFILE_ROUTE + '/:id',
      element: auth ? <ProfilePage /> : <Auth />,
    },
    {
      path: CREATE_POST_ROUTE,
      element: auth ? <CreatePostPage /> : <Auth />,
    },
    {
      path: UPDATE_POST_ROUTE + '/:id',
      element: auth && <UpdatePostPage />,
    },
  ]);
  return (
    <div className='App'>
      {publicRoutes} 
      {authRoutes}
      <Menu />
    </div>
  );
};

export default AppRouter;