import _ from 'lodash';

import {
  GET_CLP_JSON_SUCCESS,
  GET_CLP_DATA_FAILURE,
  GET_SLP_JSON_SUCCESS,
  GET_SLP_DATA_FAILURE,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  GET_FAVORITE_LIST_SUCCESS,
  GET_FAVORITE_LIST_FAILURE,
  SET_CURRENT_USER_SHOPPING_URL
} from './actions';

import {
  UPDATE_PRODUCT_ITEM_COUNT,
  UPDATE_FAVORITE_LIST,
  UPDATE_FAVORITE_LIST_REMOVE,
  GET_ALL_ITEMS_IN_WISHLIST_SUCCESS,
  GET_ALL_ITEMS_IN_WISHLIST_FAILURE
} from '../../types';

import {
  GET_USER_SHOPPING_LIST_SUCCESS,
  GET_USER_SHOPPING_LIST_FAILURE,
  DELETE_SHOPPING_LIST_SUCCESS,
  DELETE_SHOPPING_LIST_FAILURE
} from '../shopping-list/actions';

import {
  ADD_ITEM_TO_CART_SUCCESS
} from '../../components/compound/cart-action-panel/actions';

export default function clp(state = {
  clpData: [],
  SLPData: [],
  refreshClpData: false
}, action) {
  switch (action.type) {
    case GET_CLP_JSON_SUCCESS:
      return Object.assign({}, state, { clpData: action.data.data.contents, refreshClpData: false, suburbChanged: false });
    case GET_CLP_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        refreshClpData: false,
        suburbChanged: false
      });
    case GET_SLP_JSON_SUCCESS:

      return Object.assign({}, state, { SLPData: action.data.data.contents, refreshClpData: false, suburbChanged: false });
    case GET_SLP_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        refreshClpData: false,
        suburbChanged: false
      });
    case GET_CURRENT_USER_SUCCESS: {
      const oldSuburb = _.get(state, 'currentUser.suburb.id', null);
      const newSuburb = _.get(action.data, 'suburb.id', null);

      if (oldSuburb && newSuburb && oldSuburb !== newSuburb) {
        // return Object.assign({}, state, { currentUser: action.data, refreshClpData: true });
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            ...action.data
          },
          refreshClpData: true,
          suburbChanged: false
        };
      }

      // return Object.assign({}, state, { currentUser: action.data });
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.data
        },
        suburbChanged: false
      };
    }
    case GET_CURRENT_USER_FAILURE:
      return Object.assign({}, state, { currentUser: {} });

    case SET_CURRENT_USER_SHOPPING_URL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          backToShoppingURL: action.pathname
        },
        suburbChanged: false
      };
    case GET_ALL_ITEMS_IN_WISHLIST_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          wishListItems: action.data.woolworthsWishItemBean,
          resetWishListItems: _.isEmpty(action.data.woolworthsWishItemBean),
          favorites: {
            ...state.currentUser.favorites,
            productIds: _.map(action.data.woolworthsWishItemBean, 'productId')
          }
        },
        suburbChanged: false
      };
    // return Object.assign({}, state, { wishListItems: action.data });

    case GET_ALL_ITEMS_IN_WISHLIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        suburbChanged: false
      });
    case GET_FAVORITE_LIST_SUCCESS:
      return Object.assign({}, state, { favoriteList: action.data, suburbChanged: false });

    case GET_FAVORITE_LIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        suburbChanged: false
      });

    case UPDATE_PRODUCT_ITEM_COUNT:
      if (action.data.productCountMap) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            cartDetails: {
              ...state.currentUser.cartDetails,
              productCountMap: action.data.productCountMap
            }
          },
          suburbChanged: false
        };
      }

      return state;
    case GET_USER_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          shoppingLists: action.data.WoolworthsGiftListBean
        },
        suburbChanged: false
      };
    case GET_USER_SHOPPING_LIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        suburbChanged: false
      });
    case DELETE_SHOPPING_LIST_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          shoppingLists: action.data.WoolworthsGiftListBean
        },
        suburbChanged: false
      };
    case DELETE_SHOPPING_LIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        suburbChanged: false
      });
    case UPDATE_FAVORITE_LIST:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          favorites: {
            ...state.currentUser.favorites,
            productIds: [
              ...state.currentUser.favorites.productIds,
              action.data.productId
            ]
          },
          resetWishListItems: false
        },
        suburbChanged: false
      };

    case UPDATE_FAVORITE_LIST_REMOVE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          favorites: {
            ...state.currentUser.favorites,
            productIds: state.currentUser.favorites.productIds.filter(id => (id !== action.data.productId))
          }
        },
        suburbChanged: false
      };

    case 'CREATE_NEW_SHOPPING_LIST_SUCCESS':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          shoppingLists: action.data.shoppingLists
        },
        suburbChanged: false
      };
    case ADD_ITEM_TO_CART_SUCCESS: {
      const status = _.get(action.data, 'formexceptions[0].status');
      if (status === false) {
        const message = _.get(action.data, 'formexceptions[0]', {});
        return Object.assign({}, state, { nonDelieverable: message, suburbChanged: false });
      }

      return Object.assign({}, state, { nonDelieverable: undefined, suburbChanged: false });
    }
    case 'GET_DELIVERY_MODAL_SUBURBS_SUCCESS':
      return Object.assign({}, state, {
        suburbChanged: true
      });
    case '@@router/LOCATION_CHANGE':
      return action.pathname ? Object.assign({}, state, {
        routeChanged: true,
        SLPData: [],
        clpData: []
      }) : state;
    default:
      return state;
  }
}
