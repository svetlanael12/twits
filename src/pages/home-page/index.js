import React from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { allPosts, fetchPost } from '../../actions/actionCreators';


export default function HomePage() {
  const dispatch = useDispatch();
  const {state, posts} = useSelector(state => state);

  return (
    <div>
      HomePage
      <div>
        <button onClick={() => dispatch(fetchPost(allPosts, '/', 'GET'))}>Get tracks</button>
        <div>
          { state.loading ? 'loading' : 'false'}
          {
            posts.length !== 0 ?
            posts.map((elem, ind) => {
              return <div key={ind}>{elem.title}</div>
            }) :
            <div>posts null</div>
          }
        </div>
      </div>
    </div>
  )
}
