import {
  combineReducers
} from 'redux';
import {
  GET_DASHBOARD_JSON_SUCCESS,
  GET_DASHBOARD_DATA_FAILURE,
} from './actions';

const dashboard = (
  state = {
    dashboard: {}
  },
  action
) => {
  switch (action.type) {
    case GET_DASHBOARD_JSON_SUCCESS:
      return Object.assign({}, state, {
        dashboard: action.data.data
      });
    case GET_DASHBOARD_DATA_FAILURE:
      return Object.assign({}, state, {
      });
    case 'CREATE_NEW_SHOPPING_LIST_SUCCESS':
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          shoppingLists: action.data.shoppingLists
        }
      };
    case 'DELETE_SHOPPING_LIST_SUCCESS':
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          shoppingLists: action.data.WoolworthsGiftListBean
        }
      };
    default:
      return state;
  }
};

const dashboardReducer = combineReducers({
  dashboard,
});

export default dashboardReducer;
