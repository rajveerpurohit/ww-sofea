import {
    combineReducers
} from 'redux';
import {
    GET_USERDETAILS_JSON_SUCCESS,
    GET_USERDETAILS_DATA_FAILURE,
    GET_DELETEUSER_JSON_SUCCESS,
    GET_DELETEUSER_DATA_FAILURE,
    GET_UPDATEDETAILS_JSON_SUCCESS,
    GET_UPDATEDETAILS_JSON_FAILURE,
    GET_CHANGEPASSWORD_JSON_SUCCESS,
    GET_CHANGEPASSWORD_JSON_FAILURE,
    GET_UPDATEEMAILADDRESSES_DATA_SUCCESS,
    GET_UPDATEEMAILADDRESSES_JSON_SUCCESS,
    GET_UPDATEEMAIL_DATA_FAILURE,
    GET_UPDATEEMAILADDRESSES_DATA_FAILURE,
    GET_UPDATECONTACTNUMBERS_JSON_SUCCESS,
    GET_UPDATECONTACTNUMBERS_DATA_FAILURE,
} from './actions';

const accountDetails = (
    state = {
      userDetails: {},
      toggleDivName: null
    },
    action
) => {
  switch (action.type) {
    case GET_USERDETAILS_JSON_SUCCESS:
      return Object.assign({}, state, {
        userDetails: action.data.data
      });
    case GET_USERDETAILS_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_DELETEUSER_JSON_SUCCESS:
      return Object.assign({}, state, {
        userDetails: action.data.data
      });
    case GET_DELETEUSER_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_UPDATEDETAILS_JSON_SUCCESS:
      return Object.assign({}, state, {
        userDetails: Object.assign({}, state.userDetails, action.data.data)
      });
    case GET_UPDATEDETAILS_JSON_FAILURE:
      return Object.assign({}, state, {
        userDetails: Object.assign({}, state.userDetails, action.data.data)
      });
    case GET_CHANGEPASSWORD_JSON_SUCCESS:
      return Object.assign({}, state, {
        userDetails: Object.assign({}, state.userDetails, { passwordHint: action.data.data })
      });
    case GET_CHANGEPASSWORD_JSON_FAILURE:
      return Object.assign({}, state, {
        userDetails: Object.assign({}, state.userDetails, action.data.data)
      });
    case GET_UPDATEEMAILADDRESSES_DATA_SUCCESS:
      return Object.assign({}, state, {
        userDetails: Object.assign({}, state.userDetails, action.data.data)
      });
    case GET_UPDATEEMAIL_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_UPDATEEMAILADDRESSES_JSON_SUCCESS:
      return Object.assign({}, state, {
        userDetails: Object.assign({}, state.userDetails, action.data.data)
      });
    case GET_UPDATEEMAILADDRESSES_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_UPDATECONTACTNUMBERS_JSON_SUCCESS:
    const c2form = Object.assign({}, state.userDetails, {c2ContactDetails: action.data.data});
      return Object.assign({}, state, {
        userDetails: Object.assign({}, state.userDetails, c2form)
      });
    case GET_UPDATECONTACTNUMBERS_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

const accountDetailsReducer = combineReducers({
  accountDetails,
});

export default accountDetailsReducer;
