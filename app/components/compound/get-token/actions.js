import {polyfill} from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import {serverUrls} from '../../../../server/controllers/apiAggregatorEndPoints';
/* eslint-disable */
// import {getBrowserBunyanInstance} from '../../../../lib/clientLoggerHandler';
// const loggerHandler = getBrowserBunyanInstance('getToken');
/* eslint-enable */

polyfill();

export const GET_TOKEN_CONF_NUMBER = 'GET_TOKEN_CONF_NUMBER';

const getConfNumberSuccess = (data) => {
  if (typeof window) {
    window.sessConf = data.confirmationNumber;
  }
  return {
    type: GET_TOKEN_CONF_NUMBER,
    data
  };
};

export const getTokenConfirmation = () => {
  return dispatch => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.getConfNumber}).then((data) => {
      dispatch(getConfNumberSuccess(data.body));
    })
    .catch(() => {
      loggerHandler.error('\n\nAjax call failed for Token Confirmation Number : ' + serverUrls.getConfNumber + '\n\n');
    });
  };
};
