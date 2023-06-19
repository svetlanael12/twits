import { 
  LOADING, 
  ERROR,
  SUCCESS
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  success: null
};

export default function stateReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true, error: null};
    case ERROR:
      const { err } = action.payload
      return {...state, loading: false, error: err};
    case SUCCESS:
      const { success } = action.payload
      return {...state, loading: false, error: null, success: success};
    default:
      return state;
  }
}