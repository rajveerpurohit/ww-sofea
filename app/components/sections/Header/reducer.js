import { combineReducers } from 'redux';
import _ from 'lodash';

import {
  GET_MEGANAV_JSON_SUCCESS,
  GET_MEGANAV_DATA_FAILURE,
  // GET_LOGO_JSON_SUCCESS,
  // GET_LOGO_DATA_FAILURE,
  GET_MINI_CART_JSON_SUCCESS,
  GET_MINI_CART_DATA_FAILURE,
  GET_HEADERDETAILS_JSON_SUCCESS,
  GET_HEADERDETAILS_DATA_FAILURE,
  GET_LOGIN_FOOTER_DATA_FAILURE, GET_LOGIN_FOOTER_DATA_SUCCESS, FOOTER_COLLAPSE_ALL, SET_ACTIVE_FOOTER
} from './actions';

import {
  APPLY_VOUCHER_FAILURE,
  REVOKE_VOUCHER_FAILURE,
  REVOKE_VOUCHER_SUCCESS,
  SELECT_GIFT_WITH_PURCHASE_SUCCESS
} from '../../compound/cart-action-panel/actions';

import {
  UPDATE_PRODUCT_ITEM_COUNT
} from '../../../types';
import {
  GET_CURRENT_USER_SUCCESS
} from '../../../pages/clp/actions';

const meganavReducer = (state = {
  rootCategories: []
}, action) => {
  switch (action.type) {
    case GET_MEGANAV_JSON_SUCCESS:
      return Object.assign({}, state, {
        rootCategories: action.data.data.rootCategories,
        locationChanged: false
      });
    case GET_MEGANAV_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        locationChanged: false
      });
    case '@@router/LOCATION_CHANGE':
      return Object.assign({}, state, {
        locationChanged: true
      });
    default:
      return state;
  }
};

// const logoReducer = (state = {
//   logoData: {}
// }, action) => {
//   switch (action.type) {
//     case GET_LOGO_JSON_SUCCESS:
//       return Object.assign({}, state, { logoData: action.data.data });
//     case GET_LOGO_DATA_FAILURE:
//       return Object.assign({}, state, {
//         isFetching: false
//       });
//     default:
//       return state;
//   }
// };
const clone = (data) => {
  return JSON.parse(JSON.stringify(data));
};

const headerDetailsReducer = (state = {
  headerDetailsData: {},
  footerAccordinStatus: 0
}, action) => {
  switch (action.type) {
    case GET_HEADERDETAILS_JSON_SUCCESS:
      return Object.assign({}, state, { headerDetailsData: action.data.data });
    case GET_HEADERDETAILS_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_LOGIN_FOOTER_DATA_SUCCESS:
      if (state.headerDetailsData) {
        const headerDetailsDataClone = clone(state.headerDetailsData);
        headerDetailsDataClone.footer.loginFooterData = action.data.data;

        return Object.assign({}, state, { headerDetailsData: headerDetailsDataClone });
      }

      return state;
    case GET_LOGIN_FOOTER_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case FOOTER_COLLAPSE_ALL:
      return null;
    case SET_ACTIVE_FOOTER:
      if (!_.isEmpty(state.headerDetailsData)) {
        const headerDetailsDataClone = clone(state.headerDetailsData);
        return Object.assign({}, state, {
          headerDetailsData: {
            ...headerDetailsDataClone,
            footer: {
              ...headerDetailsDataClone.footer,
              footerAccordinStatus: action.active
            }
          }
        });
      }
      return state;
    default:
      return state;
  }
};

const miniCartInitialState = {
  miniCartData: {}
};

const miniCartReducer = (state = {
  miniCartData: {}
}, action) => {
  const appliedVouchersError = _.get(state, 'miniCartData.appliedVouchersError', []);
  switch (action.type) {
    case GET_MINI_CART_JSON_SUCCESS:
      return Object.assign({}, state, { miniCartData: action.data.data });
    case GET_MINI_CART_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case UPDATE_PRODUCT_ITEM_COUNT:
      if (action.data.orderSummary) {
        return {
          ...state,
          miniCartData: {
            ...state.miniCartData,
            ...action.data
          }
        };
        // return Object.assign({}, state, { miniCartData: action.data });
      }
      return Object.assign({}, state);
    case SELECT_GIFT_WITH_PURCHASE_SUCCESS:
      return {
        ...state,
        miniCartData: {
          ...state.miniCartData,
          ...action.data
        }
      };
    case APPLY_VOUCHER_FAILURE:
      
      return {
        ...state,
        miniCartData: {
          ...state.miniCartData,
          appliedVouchersError: [
            action.data
          ]
        }
      };

    case REVOKE_VOUCHER_SUCCESS:
      if (!_.isEmpty(appliedVouchersError)) {
        return {
          ...state,
          miniCartData: {
            ...state.miniCartData,
            appliedVouchersError: [action.data]
          }
        };
      }
      return state;
    case GET_CURRENT_USER_SUCCESS:
      return state;
    default:
      return state;
  }
};

const headerReducer = combineReducers({
  meganavReducer,
  // logoReducer,
  miniCartReducer,
  headerDetailsReducer
});

export default headerReducer;
