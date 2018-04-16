import { combineReducers } from 'redux';
import {
        GET_CHILDDETAILS_JSON_SUCCESS,
        GET_CHILDDETAILS_DATA_FAILURE,
        UPDATE_CHILDDETAILS_JSON_SUCCESS,
        UPDATE_CHILDDETAILS_DATA_FAILURE,
        DELETE_CHILDDETAILS_JSON_SUCCESS,
        DELETE_CHILDDETAILS_DATA_FAILURE,
        ADD_CHILDDETAILS_JSON_SUCCESS,
        ADD_CHILDDETAILS_DATA_FAILURE
    } from './actions';

const littleWorld = (
    state = {
      childList: []
    },
    action
) => {
  switch (action.type) {
    case GET_CHILDDETAILS_JSON_SUCCESS:
      return Object.assign({}, state, {
        childList: action.data.data.childList
      });
    case GET_CHILDDETAILS_DATA_FAILURE:
      return Object.assign({}, state, {
        childList: []
      });
    case UPDATE_CHILDDETAILS_JSON_SUCCESS:
      return Object.assign({}, state, {
        childList: state.childList.map(item => parseInt(item.childId) === parseInt(action.data.data.childId) ? action.data.data : item)
      });
    case UPDATE_CHILDDETAILS_DATA_FAILURE:
      return Object.assign({}, state, {
        childList: state.childList
      });
    case DELETE_CHILDDETAILS_JSON_SUCCESS:
      return Object.assign({}, state, {
        childList: state.childList.filter(item => parseInt(item.childId) !== parseInt(action.data.data.childId))
      });
    case DELETE_CHILDDETAILS_DATA_FAILURE:
      return Object.assign({}, state, {
        childList: state.childList
      });
    case ADD_CHILDDETAILS_JSON_SUCCESS:
      state.childList.push(action.data.data);
      return Object.assign({}, state, {
        childList: state.childList
      });
    case ADD_CHILDDETAILS_DATA_FAILURE:
      return Object.assign({}, state, {
        childList: state.childList
      });
    default:
      return state;
  }
};

const littleWorldReducer = combineReducers({
  littleWorld,
});

export default littleWorldReducer;
