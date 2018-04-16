// import { polyfill } from 'es6-promise';
// import ServiceUtil from '../../../services/serviceUtil';
// import { serverUrls } from '../../../../server/controllers/apiAggregatorEndPoints';

// polyfill();

// /*
//  * CONSTANTS
// */
// export const GET_FOOTER_JSON_SUCCESS = 'GET_FOOTER_JSON_SUCCESS';
// export const GET_FOOTER_DATA_FAILURE = 'GET_FOOTER_DATA_FAILURE';
// export const GET_LOGIN_FOOTER_DATA_FAILURE = 'GET_LOGIN_FOOTER_DATA_FAILURE';
// export const GET_LOGIN_FOOTER_DATA_SUCCESS = 'GET_LOGIN_FOOTER_DATA_SUCCESS';

// export const FOOTER_COLLAPSE_ALL = 'FOOTER_COLLAPSE_ALL';
// export const SET_ACTIVE_FOOTER = 'SET_ACTIVE_FOOTER';

// export const footerJSONSuccessAction = (data) => {
//   return {
//     type: GET_FOOTER_JSON_SUCCESS,
//     data
//   };
// };

// /*
//  * megaNavJSONFailureAction: An action creator that returns an action as soon as
//  * request for product list does not execute successfully
//  * @return {Object} An Action object with mandatory type property
//  */
// export const footerJSONFailureAction = () => {
//   return {
//     type: GET_FOOTER_DATA_FAILURE
//   };
// };
// export const loginFooterJSONSuccessAction = (data) => {
//   return {
//     type: GET_LOGIN_FOOTER_DATA_SUCCESS,
//     data
//   };
// };
// export const loginFooterJSONFailureAction = () => {
//   return {
//     type: GET_LOGIN_FOOTER_DATA_FAILURE
//   };
// };

// export const getLoginFooter = () => {
//   return (dispatch) => {
//     return ServiceUtil.triggerServerRequest({ url: serverUrls.loginFooter }).then((value) => {
//       console.log(value.body);
//       dispatch(loginFooterJSONSuccessAction({ data: value.body }));
//     });
//   };
// };

// export function resetFooterAccordianStatus(active) {
//   return (dispatch) => {
//     if (active === 'null') return dispatch({ type: FOOTER_COLLAPSE_ALL });
//     return dispatch({ type: SET_ACTIVE_FOOTER, active });
//   };
// }
