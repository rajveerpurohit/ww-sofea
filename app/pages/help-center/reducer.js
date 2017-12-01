import {
    GET_HELP_JSON_SUCCESS,
    GET_HELP_FAILURE
} from './actions';


export default function helpCenterReducer(state = {
}, action) {
   
  switch (action.type) {
    case GET_HELP_JSON_SUCCESS:
      return Object.assign({}, state, {aboutUsData: action.data.data.help.help});
    case GET_HELP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
