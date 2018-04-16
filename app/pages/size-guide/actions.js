import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_LEFTNAV_JSON_SUCCESS = 'GET_LEFTNAV_JSON_SUCCESS';
export const GET_LEFTNAV_JSON_FALIURE = 'GET_LEFTNAV_JSON_FALIURE';

export const leftNavSuccessAction = (data) => {
  return {
    type: GET_LEFTNAV_JSON_SUCCESS,
    data
  };
};

export const leftNavFailureAction = () => {
  return {
    type: GET_LEFTNAV_JSON_FALIURE
  };
};

export const getLeftNav = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.leftnav }).then((value) => {
      dispatch(leftNavSuccessAction({ data: value.body }));
    },
    (error) => { console.log(error); }
  );
  };
};

