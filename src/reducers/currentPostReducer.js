import { 
  CURRENT_POST
} from '../actions/actionTypes';

const initialState = null;

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_POST:
      const { post } = action.payload;
      return state = post
    default:
      return state;
  }
}