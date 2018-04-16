import {
    combineReducers
} from 'redux';
import {
    CREATE_CURRENT_USER_SUCCESS,
    CREATE_CURRENT_USER_FAILURE,
    GET_USER_CARD_DETAILS_SUCCESS,
    GET_USER_CARD_DETAILS_FAILURE,
    CONFIRM_USER_USER_SUCCESS,
    CONFIRM_USER_USER_FAILURE,
    GET_USER_CARD_DETAILS_REQUEST,
    CONFIRM_FINANCE_USER_USER_SUCCESS,
} from './actions';

const createUser = (
    state = {
      createUser: {},
      otpSuccess: {},
      idenificationNumber: null
    },
    action
) => {
  switch (action.type) {
    case CREATE_CURRENT_USER_SUCCESS:
      return Object.assign({}, state, {
        createUser: action.data.data
      });
    case CREATE_CURRENT_USER_FAILURE:
      return Object.assign({}, state, {
        createUser: action.data.data
      });
    case GET_USER_CARD_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        createUser: action.data.data
      });
    case GET_USER_CARD_DETAILS_FAILURE:
      return Object.assign({}, state, {
      });
    case CONFIRM_USER_USER_SUCCESS:
      return Object.assign({}, state, {
        createUser: action.data.data,
      });
    case CONFIRM_FINANCE_USER_USER_SUCCESS:
      return Object.assign({}, state, {
        otpSuccess: action.data.data,
      });
    case GET_USER_CARD_DETAILS_REQUEST:
      return Object.assign({}, state, {
        idenificationNumber: action.data.data
      });
    case CONFIRM_USER_USER_FAILURE:
      return Object.assign({}, state, {
      });
    case '@@router/LOCATION_CHANGE':
      return Object.assign({}, state, { routeChanged: true });
    default:
      return state;
  }
};

const createUserReducer = combineReducers({
  createUser,
});

export default createUserReducer;
