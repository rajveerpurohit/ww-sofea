import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import {serverUrls} from '../../../../server/controllers/apiAggregatorEndPoints';
import { deliveryServices } from '../../../services';
import { apiEndpoint } from '../../../../config/app';

polyfill();

/*
 * CONSTANTS
*/
export const GET_DELIVERY_MODAL_SUCCESS = 'GET_DELIVERY_MODAL_SUCCESS';
export const GET_DELIVERY_MODAL_FAILURE = 'GET_DELIVERY_MODAL_FAILURE';
export const CHANGE_PROVINCE = 'CHANGE_PROVINCE';
export const CHANGE_SUBURB = 'CHANGE_SUBURB';
export const RESET_CURRENT_LOCATION = 'RESET_CURRENT_LOCATION';
export const SET_USER_ADDRESSES = 'SET_USER_ADDRESSES';
export const SET_CURRENT_ADDRESS = 'SET_CURRENT_ADDRESS';
export const RESET_CURRENT_ADDRESS = 'RESET_CURRENT_ADDRESS';
export const SET_DELIVERY_SLOTS = 'SET_DELIVERY_SLOTS';
export const SHOW_ADDRESS_FORM = 'SHOW_ADDRESS_FORM';
export const HIDE_ADDRESS_FORM = 'HIDE_ADDRESS_FORM';
export const REQUEST_PENDING = 'REQUEST_PENDING';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';
export const SET_DELIVERY_LOCATION_DATA = 'SET_DELIVERY_LOCATION_DATA';


export const deliverModalSuccessAction = ({ regions }) => {
  return {
    type: GET_DELIVERY_MODAL_SUCCESS,
    regions
  };
};

const setUserAddresses = (addresses) => {
    return {
        type: SET_USER_ADDRESSES,
        addresses
    };
};

export const setDeliveryLocation = (suburbObj) => {
    return (dispatch) => {
        return dispatch({
            type: SET_DELIVERY_LOCATION_DATA,
            data: suburbObj
        });
    };
}

export const changeLocation = (provinceId = '', suburbId = '') => {
    return (dispatch) => {
        if (provinceId) { 
            dispatch({
                type: CHANGE_PROVINCE,
                provinceId
            });
        } else if (suburbId) {
            dispatch({
                type: CHANGE_SUBURB,
                suburbId
            });
        } else {
             dispatch({
                type: RESET_CURRENT_LOCATION,
            });
        }
    };
};

export const showAddressForm = (state = false) => {
    return (dispatch) => {
        if(state) return dispatch({
            type: SHOW_ADDRESS_FORM
        });
        return dispatch({
            type: HIDE_ADDRESS_FORM
        });
    };
} 

export const loader = (flag = 0) => {
    return (dispatch) => {
        return (flag) ? dispatch({type: SHOW_LOADER}) : dispatch({type: HIDE_LOADER});
    }
}

export const error = (message = '') => {
    return (dispatch) => {
        console.log('error - ', message);
        return dispatch({type: SHOW_ERROR, message});
    }
}

export const requestStatus = (isComplete = 1) => {
    return (dispatch) => {
        return (isComplete) ? dispatch({type: REQUEST_COMPLETE}) : dispatch({type: REQUEST_PENDING});
    }
}

export const getDeliveryArea = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({url: serverUrls.region}).then((value) => {
      dispatch(deliverModalSuccessAction({regions: value.body.regions}))
    })
    .catch(e => {
      console.log('getDeliveryArea', e);
      return false;
    });
  };
};


export const setCurrentAddress = (address) => {
    return (dispatch) => {
        if(address) 
        return dispatch({
            type: SET_CURRENT_ADDRESS,
            address
        });
        return dispatch({type: RESET_CURRENT_ADDRESS});
    };
}

export const getDeliverySlots = () => {
    return (dispatch) => {
        return deliveryServices().getDeliverySlots()
        .then((response) => {
            if (!(response.status === 200 && response.data)) return null;
            dispatch({type: SET_DELIVERY_SLOTS, data: response.data});
        })
    }
}

export const getUserAddresses = () => {
    return (dispatch) => {
        return deliveryServices().getAddresses() 
        .then((response) => {
            if (!(response.status === 200 && response.data)) throw new Error('error occured in request');
            const userAddresses = response.data;
            delete userAddresses['links'];
            delete userAddresses['_links'];
            dispatch(setUserAddresses(userAddresses));
            if (Object.keys(userAddresses).length === 0) {
                dispatch(showAddressForm(true));
            } else {
                dispatch(showAddressForm(false));
            }
            return userAddresses;
        })
        .then((userAddresses) => {
            if (Object.keys(userAddresses).length) {
                dispatch(getDeliverySlots());
                dispatch(setCurrentAddress(userAddresses[Object.keys(userAddresses)[0]]));
            }
        })
        .catch((e) => {
            console.log('error address', e)
        });
    };
}

export const addNewAddress = (data) => {
    return (dispatch) => {
        return deliveryServices().addAddress(data) 
        .then((response) => {
            if (!(response.status === 200 && response.data)) return dispatch(error('Something went wrong. Please try again.'));
            dispatch(getUserAddresses());
        })
        .catch((e) => {
            return dispatch(error('Something went wrong. Please try again.'));
        });
    };
};
