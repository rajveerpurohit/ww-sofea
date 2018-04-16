export default function footer(
  state = {
  },
  action
) {
  return state;
}

// import { GET_FOOTER_JSON_SUCCESS, GET_FOOTER_DATA_FAILURE, GET_LOGIN_FOOTER_DATA_FAILURE, GET_LOGIN_FOOTER_DATA_SUCCESS, FOOTER_COLLAPSE_ALL, SET_ACTIVE_FOOTER } from './actions';

// export default function footer(
//   state = {
//     footerData: {},
//     footerAccordinStatus: 0
//   },
//   action
// ) {
//   switch (action.type) {
//     case GET_FOOTER_JSON_SUCCESS:
//       return Object.assign({}, state, { footerData: action.data.data.footer });
//     case GET_FOOTER_DATA_FAILURE:
//       return Object.assign({}, state, {
//         isFetching: false
//       });
//     case GET_LOGIN_FOOTER_DATA_SUCCESS:
//       return Object.assign({}, state, { loginFooterData: action.data.data });
//     case GET_LOGIN_FOOTER_DATA_FAILURE:
//       return Object.assign({}, state, {
//         isFetching: false
//       });
//     case FOOTER_COLLAPSE_ALL:
//       return null;
//     case SET_ACTIVE_FOOTER:
//       return Object.assign({}, state, { footerAccordinStatus: action.active });
//     default:
//       return state;
//   }
// }
