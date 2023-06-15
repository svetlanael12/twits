import { 
  LOADING, 
  ERROR,
  SUCCESS
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
};

export default function stateReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true, error: null};
    case ERROR:
      const { message } = action.payload
      return {...state, loading: false, error: message};
    case SUCCESS:
      return {...state, loading: false, error: null};
    default:
      return state;
  }
}