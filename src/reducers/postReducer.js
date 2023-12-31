import { 
  ALL_POST, 
  CREATE_POST, 
  UPDATE_POST, 
  DELETE_POST 
} from '../actions/actionTypes';

const initialState = [];

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_POST:
      const { posts } = action.payload;
      return state = posts
    case CREATE_POST:
      return [
        action.payload.post,
        ...state
      ]
    case UPDATE_POST:
      return state.map(elem => elem.id === action.payload.post.id ? action.payload.post : elem)
    case DELETE_POST:
      const { id } = action.payload;
      return state = state.filter(post => post.id !== id)
    default:
      return state;
  }
}