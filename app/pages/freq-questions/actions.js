import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import {serverUrls} from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

export const GET_FAQ_JSON_SUCCESS = 'GET_FAQ_JSON_SUCCESS';
export const GET_FAQ_FAILURE = 'GET_FAQ_FAILURE';

export const faqSuccessAction = (data) => {
  return {
    type: GET_FAQ_JSON_SUCCESS,
    data
  };
};

export const faqFailureAction = () => {
  return {
    type: GET_FAQ_FAILURE
  };
};

export const getFAQ = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.faq}).then((value) => {

        console.log("value" + value.body.data);
        dispatch(faqSuccessAction({data: value.body}))
    },
    (error) => { console.log(error) }
);
  };
};

