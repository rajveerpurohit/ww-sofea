import {
    GET_FAQ_JSON_SUCCESS,
    GET_FAQ_FAILURE
} from './actions';


export default function faqReducer(state = {
}, action) {
   
  switch (action.type) {
    case GET_FAQ_JSON_SUCCESS:
   
      return Object.assign({}, state, {faqData: action.data.data.FaqsContentDisplayBean});
    case GET_FAQ_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
