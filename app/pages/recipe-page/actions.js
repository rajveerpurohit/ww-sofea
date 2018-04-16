import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';
import { loader, setSEOInformation, resetSEOInformation } from '../../actions/common';

polyfill();

/*
 * CONSTANTS
*/
export const GET_RECIPE_JSON_SUCCESS = 'GET_RECIPE_JSON_SUCCESS';
export const GET_RECIPE_DATA_FAILURE = 'GET_RECIPE_DATA_FAILURE';
export const GET_LEFTNAV_SUCCESS = 'GET_LEFTNAV_SUCCESS';
export const GET_LEFTNAV_FALIURE = 'GET_LEFTNAV_FALIURE';

export const recipeJSONSuccessAction = (data) => {
  return {
    type: GET_RECIPE_JSON_SUCCESS,
    data
  };
};

/*
 * megaNavJSONFailureAction: An action creator that returns an action as soon as
 * request for product list does not execute successfully
 * @return {Object} An Action object with mandatory type property
 */
export const recipeJSONFailureAction = () => {
  return {
    type: GET_RECIPE_DATA_FAILURE
  };
};

export const leftNavdataSuccessAction = (data) => {
  return {
    type: GET_LEFTNAV_SUCCESS,
    data
  };
};

export const leftNavdataFailureAction = () => {
  return {
    type: GET_LEFTNAV_FALIURE
  };
};
export const getRecipePageData = (params, reqUrl) => {
  const contentId = reqUrl.split('/_/')[1];
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.recipe, params: { contentId } }).then((value) => {
      dispatch(setSEOInformation({
        recipe: {
          title: value.body.contents.pageTitle,
          metaKeywords: value.body.contents.keywords,
          metaDescription: value.body.contents.description
        }
      }));
      return Promise.all([
        dispatch(recipeJSONSuccessAction({ data: value.body }))
      ]);
    });
  };
};
export const getLeftNavData = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.leftnav }).then((value) => {
      dispatch(leftNavdataSuccessAction({ data: value.body }));
    },
      (error) => { console.log(error); }
    );
  };
};
