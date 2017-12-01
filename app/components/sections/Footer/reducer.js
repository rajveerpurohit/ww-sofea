import {
  GET_FOOTER_JSON_SUCCESS,
  GET_FOOTER_DATA_FAILURE
} from './actions';


export default function footer(state = {
  footerData: {}
}, action) {
  switch (action.type) {
    case GET_FOOTER_JSON_SUCCESS:
      return Object.assign({}, state, {footerData: action.data.data.footer});
    case GET_FOOTER_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
