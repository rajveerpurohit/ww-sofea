import {
    GET_SAFE_SECURE_JSON_SUCCESS,
    GET_SAFE_SECURE_FAILURE
} from './actions';


export default function secureReducer(state = {
}, action) {
  
  switch (action.type) {
    case GET_SAFE_SECURE_JSON_SUCCESS:
      return Object.assign({}, state, {
          secureData: action.data.data.secure
    });
    case GET_SAFE_SECURE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
