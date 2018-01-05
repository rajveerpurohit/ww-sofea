import {
  GET_CLP_JSON_SUCCESS,
  GET_CLP_DATA_FAILURE
} from './actions';


export default function clp(state = {
  clpData: []
}, action) {
  switch (action.type) {
    case GET_CLP_JSON_SUCCESS:
      return Object.assign({}, state, {clpData: action.data.data.contents});
    case GET_CLP_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case "@@router/LOCATION_CHANGE":
    return Object.assign({}, state, {
      routeChanged : true
    });
    default:
      return state;
  }
}
