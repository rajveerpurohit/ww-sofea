import {
    GET_WOOLWORTHONLINE_JSON_SUCCESS,
    GET_WOOLWORTHONLINE_FAILURE
} from './action';


export default function woolOnline(state = {
}, action) {
  switch (action.type) {
    case GET_WOOLWORTHONLINE_JSON_SUCCESS:
      return Object.assign({}, state, {
        woolworthsOnline: action.data.data.usingWoolworthsOnline.usingwwonline,
        contentAside: action.data.data.usingWoolworthsOnline.LeftNav
      });
    case GET_WOOLWORTHONLINE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
