import { polyfill } from 'es6-promise';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';

polyfill();

/*
 * CONSTANTS
 */
export const GET_DASHBOARD_JSON_SUCCESS = 'GET_DASHBOARD_JSON_SUCCESS';
export const GET_DASHBOARD_DATA_FAILURE = 'GET_DASHBOARD_DATA_FAILURE';

/* Contact info actions starts*/
export const dashboardJSONSuccessAction = (data) => {
    return {
        type: GET_DASHBOARD_JSON_SUCCESS,
        data
    };
};

export const dashboardJSONFailureAction = (data) => {
    return {
        type: GET_DASHBOARD_DATA_FAILURE,
        data
    };
};

export const getdashboarddetails = () => {
    return (dispatch, getState) => {
        return ServiceUtil.triggerServerRequest({
            url: serverUrls.getdashboarddetails,
        }).then((value) => {
            dispatch(dashboardJSONSuccessAction({
                data: value.body
            }));
        });
    };
};

