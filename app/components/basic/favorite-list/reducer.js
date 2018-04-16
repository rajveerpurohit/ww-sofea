import {
  GET_WISH_LIST_SUCCESS,
  GET_WISH_LIST_FAILURE,
  ADD_ITEM_TO_WISH_LIST_SUCCESS,
  ADD_ITEM_TO_WISH_LIST_FAILURE,
  REMOVE_ITEM_FROM_WISH_LIST_SUCCESS,
  REMOVE_ITEM_FROM_WISH_LIST_FAILURE
} from './actions';

export default function wishListReducer(state = {}, action) {
  switch (action.type) {
    case GET_WISH_LIST_SUCCESS:
      return Object.assign({}, state, { favoriteList: action.data });
    case ADD_ITEM_TO_WISH_LIST_SUCCESS:
      return Object.assign({}, state, { isFetching: false });
    case REMOVE_ITEM_FROM_WISH_LIST_SUCCESS:
      return Object.assign({}, state, { isFetching: false });

    case GET_WISH_LIST_FAILURE:
    case ADD_ITEM_TO_WISH_LIST_FAILURE:
    case REMOVE_ITEM_FROM_WISH_LIST_FAILURE:
      return Object.assign({}, state, { isFetching: false });
    default:
      return state;
  }
}
