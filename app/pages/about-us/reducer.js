import {
    GET_ABOUTUS_JSON_SUCCESS,
    GET_ABOUTUS_FAILURE
} from './actions';


export default function aboutUsReducer(state = {
}, action) {
   
  switch (action.type) {
    case GET_ABOUTUS_JSON_SUCCESS:
    console.log("data**********"+ action.data.data.aboutus.AboutUs)
      return Object.assign({}, state, {aboutUsData: action.data.data.aboutus.AboutUs});
    case GET_ABOUTUS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
