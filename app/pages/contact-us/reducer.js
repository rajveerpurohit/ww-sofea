import {
  GET_CONTACTUS_JSON_SUCCESS,
  GET_CONTACTUS_DATA_FAILURE
} from './actions';


export default function contactUsReducer(state = {
  contactUsData: []
}, action) {
  switch (action.type) {
    case GET_CONTACTUS_JSON_SUCCESS:
      //console.log('data',action.data.data)    
      return Object.assign({}, state, {contactUsData: action.data.data.ContactUsDisplayBean});
    case GET_CONTACTUS_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
