import { polyfill } from 'es6-promise';
import { push } from 'react-router-redux';
import ServiceUtil from '../../services/serviceUtil';
import { serverUrls } from '../../../server/controllers/apiAggregatorEndPoints';
import { deliveryServices } from '../../services';
import _ from 'lodash';

polyfill();

/*
 * CONSTANTS
 */
export const GET_ADDRESS_JSON_SUCCESS = 'GET_ADDRESS_JSON_SUCCESS';
export const GET_ADDRESS_DATA_FAILURE = 'GET_ADDRESS_DATA_FAILURE';

export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_FAILURE = 'DELETE_ADDRESS_FAILURE';

export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';

export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';
export const ADD_ADDRESS_FAILURE = 'ADD_ADDRESS_FAILURE';

export const GET_C2_ADDRESS_JSON_SUCCESS = 'GET_C2_ADDRESS_JSON_SUCCESS';

export const UPDATE_C2_ADDRESS_JSON_SUCCESS = 'UPDATE_C2_ADDRESS_JSON_SUCCESS';
export const UPDATE_C2_PROVINCE_JSON_SUCCESS = 'UPDATE_C2_PROVINCE_JSON_SUCCESS';

export const RESETFORM = 'RESETFORM';

/* Contact info actions starts*/
export const resetform = (data) => {
    return {
        type: RESETFORM,
    };
};

export const addressJSONSuccessAction = (data) => {
    return {
        type: GET_ADDRESS_JSON_SUCCESS,
        data
    };
};

export const addressJSONFailureAction = (data) => {
    return {
        type: GET_ADDRESS_DATA_FAILURE,
        data
    };
};

export const getaddressDetails = () => {
    return (dispatch, getState) => {
        return ServiceUtil.triggerServerRequest({
            url: serverUrls.savedaddress,
        }).then((value) => {
            dispatch(addressJSONSuccessAction({
                data: value.body
            }));
        });
    };
};
export const c2addressJSONSuccessAction = (data) => {
    return {
        type: GET_C2_ADDRESS_JSON_SUCCESS,
        data
    };
};

export const getC2addressDetails = () => {
    return (dispatch, getState) => {
        return ServiceUtil.triggerServerRequest({
            url: serverUrls.fetchaddress,
            params: {customerId: getState().clp.currentUser.corporateNumber}
        }).then((value) => {
            dispatch(c2addressJSONSuccessAction({
                data: value.body
            }));
        });
    };
};

export const deleteaddressJSONSuccessAction = (data) => {
    return {
        type: DELETE_ADDRESS_SUCCESS,
        data
    };
};

export const deleteaddressFailure = (data) => {
    return {
        type: DELETE_ADDRESS_FAILURE,
        data
    };
};

export const deleteaddress = (address) => {
    return (dispatch, getState) => {
        return ServiceUtil.triggerServerRequest({
            method: 'DELETE',
            url: serverUrls.deleteaddress,
            data: {addressId : address.id}
        }).then((value) => {
            dispatch(deleteaddressJSONSuccessAction({
                data: address
            }));
        });
    };
};

export const updateAddressSuccessAction = (data) => {
    return {
        type: UPDATE_ADDRESS_SUCCESS,
        data
    };
};

export const updateAddressFailureAction = (data) => {
    return {
        type: UPDATE_ADDRESS_FAILURE,
        data
    };
};

export const updateaddressDetails = (address) => {
    const data = address;//_.omit(address, "c2AddressTypeID")
    return (dispatch, getState) => {
        return ServiceUtil.triggerServerRequest({
            method: 'PATCH',
            url: serverUrls.updateaddress,
            data
        }).then((value) => {
            dispatch(updateAddressSuccessAction({
                data: value.body,
                nickname: data.nickname
            }));
        });
    };
};

export const addAddressSuccessAction = (data) => {
    return {
        type: ADD_ADDRESS_SUCCESS,
        data
    };
};

export const addAddressFailureAction = (data) => {
    return {
        type: ADD_ADDRESS_FAILURE,
        data
    };
};

export const addaddressDetails = (data) => {
    return (dispatch, getState) => {
        return ServiceUtil.triggerServerRequest({
            method: 'POST',
            url: serverUrls.addnewaddress,
            params: {data}
        }).then((value) => {
            dispatch(addAddressSuccessAction({
                data: value.body
            }));
        });
    };
};

export const addNewAddress = (data) => {
    return (dispatch) => {
      return deliveryServices().addAddress(data)
          .then((response) => {
            dispatch(addAddressSuccessAction({
                data: response.data
            }));
        })
    };
  };
  export const updatec2addressJSONSuccessAction = (data) => {
    return {
        type: UPDATE_C2_ADDRESS_JSON_SUCCESS,
        data
    };
};
const updateC2addressdata = {
    "additionalContactID": 0,
    "address2": "string",
    "address1": "string",
    "postalCode": "string",
    "cityID": 0,
    "returnedReasonID": 0,
    "addressID": 0,
    "returnedMailCount": "string",
    "province": 0,
    "addressTypeId": "string",
    "countryCode": "string",
    "suburb": "string",
    "addressResidenceTypeID": 0,
  }
export const updateC2addressDetails = () => {
    return (dispatch, getState) => {
        return ServiceUtil.triggerServerRequest({
            method: 'POST',
            url: serverUrls.updateccustomeraddress,
            data: updateC2addressdata
        }).then((value) => {
            dispatch(updatec2addressJSONSuccessAction({
                data: value.body
            }));
        });
    };
};
export const getProvinceJSONSuccessAction = (data) => {
    return {
        type: UPDATE_C2_PROVINCE_JSON_SUCCESS,
        data
    };
};

export const getProvince = (data) => {
    return (dispatch, getState) => {
        return ServiceUtil.triggerServerRequest({
            url: serverUrls.editcustomeraddress,
            params: {addressID: data}
        }).then((value) => {
            dispatch(getProvinceJSONSuccessAction({
                data: value.body
            }));
        });
    };
};
