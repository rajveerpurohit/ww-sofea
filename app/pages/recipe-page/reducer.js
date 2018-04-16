import {
  GET_RECIPE_JSON_SUCCESS,
  GET_RECIPE_DATA_FAILURE,
  GET_LEFTNAV_SUCCESS,
  GET_LEFTNAV_FALIURE
} from './actions';


const initialRecipeData = [];

export default function recipePage(state = {
  recipeData: initialRecipeData
}, action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return action.pathname ? Object.assign({}, state, { recipeData: initialRecipeData }) : state;
    case GET_RECIPE_JSON_SUCCESS:
      return Object.assign({}, state, { recipeData: action.data.data.contents });
    case GET_RECIPE_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_LEFTNAV_SUCCESS:
      return Object.assign({}, state, { leftNav: action.data.data && action.data.data.leftNav && action.data.data.leftNav.LeftNav });
    case GET_LEFTNAV_FALIURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
