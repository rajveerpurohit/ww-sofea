import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';
import { loader, setSEOInformation, resetSEOInformation } from '../../actions/common';

polyfill();

/*
 * CONSTANTS
*/
export const GET_DLP_JSON_SUCCESS = 'GET_DLP_JSON_SUCCESS';
export const GET_DLP_DATA_FAILURE = 'GET_DLP_DATA_FAILURE';

export const dlpJSONSuccessAction = (data) => {
  return {
    type: GET_DLP_JSON_SUCCESS,
    data
  };
};

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const dlpJSONFailureAction = () => {
  return {
    type: GET_DLP_DATA_FAILURE
  };
};

export const getDLPPageData = (params, reqUrl) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({
      method: 'GET',
      url: serverUrls.searchDepartment,
      params: { pageURL: reqUrl }
    })
      .then(
        (value) => {
          dispatch(dlpJSONSuccessAction({ data: value.body }));
          dispatch(setSEOInformation({
            dlp: {
              title: value.body.contents[0].title,
              metaKeywords: value.body.contents[0].metaKeywords,
              metaDescription: value.body.contents[0].metaDescription
            }
          }));
        },
        error => dispatch(dlpJSONFailureAction(error))
      );
  };
};
