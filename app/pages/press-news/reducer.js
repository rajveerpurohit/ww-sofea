import {
    GET_PRESSNEWS_JSON_SUCCESS,
    GET_PRESSNEWS_FAILURE
} from './actions';


export default function pressNewsReducer(state = {
}, action) {
   
  switch (action.type) {
    case GET_PRESSNEWS_JSON_SUCCESS:
    console.log("action.data.data.newsandpress.NewsAndPress :" + action.data.data.newsandpress.NewsAndPress)
      return Object.assign({}, state, {pressNewsData: action.data.data.newsandpress.NewsAndPress});
    case GET_PRESSNEWS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
