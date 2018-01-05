import {
    GET_PRESSNEWS_JSON_SUCCESS,
    GET_PRESSNEWS_FAILURE
} from './actions';


export default function pressNewsReducer(state = {
}, action) {
  switch (action.type) {
    case GET_PRESSNEWS_JSON_SUCCESS:
      return Object.assign({}, state, {
        pressNewsData: action.data.data.newsandpress.NewsAndPress,
        contentAside: action.data.data.newsandpress.LeftNav
      });
    case GET_PRESSNEWS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
