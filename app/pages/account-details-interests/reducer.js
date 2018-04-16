import { combineReducers } from 'redux';
import {
  GET_INTERESTS_JSON_SUCCESS,
  GET_INTERESTS_DATA_FAILURE,
//   GET_CONTACTINFO_JSON_SUCCESS,
//   GET_CONTACTINFO_DATA_FAILURE,
//   POST_CONTACT_QUERY_SUCCESS,
//   POST_CONTACT_QUERY_FAILURE

} from './actions';


const interestFormReducer = (
  state = { interestData: [] },
  action
) => {
  switch (action.type) {
    case GET_INTERESTS_JSON_SUCCESS:
      return Object.assign({}, state, { interestData: action.data });
    case GET_INTERESTS_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}

// const contactInfoReducer = (
//   state = { contactInfo: {} },
//   action
// ) => {
//   switch (action.type) {
//     case GET_CONTACTINFO_JSON_SUCCESS:
//       return Object.assign({}, state, { contactInfo: action.data.data.contactinfo });
//     case GET_CONTACTINFO_DATA_FAILURE:
//       return Object.assign({}, state, {
//         isFetching: false
//       });
//     default:
//       return state;
//   }
// }

// const contactQueryReducer = (
//   state = { contactQuery: {} },
//   action
// ) => {
//   switch (action.type) {
//     case POST_CONTACT_QUERY_SUCCESS:
//       return Object.assign({}, state, { contactQuery: action.data.data });
//     case POST_CONTACT_QUERY_FAILURE:
//       return Object.assign({}, state, {
//         isFetching: false
//       });
//     default:
//       return state;
//   }
// }

const interestReducer = combineReducers({
    interestFormReducer,
//   contactInfoReducer,
//   contactQueryReducer
});

export default interestReducer;
