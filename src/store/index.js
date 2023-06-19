import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import postReducer from '../reducers/postReducer'
import stateReducer from "../reducers/stateReducer";
import authReducer from "../reducers/authReducer";
import currentPostReducer from "../reducers/currentPostReducer";
// import { currentPost } from "../actions/actionCreators";

const reducer = combineReducers({
  posts: postReducer,
  state: stateReducer,
  auth: authReducer,
  currentPost: currentPostReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;