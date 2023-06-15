import { 
  IS_AUTH
} from '../actions/actionTypes';

const initialState = '';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case IS_AUTH:
      const { token } = action.payload
      localStorage.setItem('token', token)
      return state = token;
    default:
      return state;
  }
}

