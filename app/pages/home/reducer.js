import {
  GET_HOME_JSON_SUCCESS,
  GET_HOME_DATA_FAILURE
} from './actions';


export default function home(state = {
  homeData: []
}, action) {
  switch (action.type) {
    case GET_HOME_JSON_SUCCESS:
      return Object.assign({}, state, {homeData: action.data.data.contents});
    case GET_HOME_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
