import { combineReducers } from 'redux';
import {
    GET_DELIVERY_MODAL_SUCCESS,
    GET_DELIVERY_MODAL_FAILURE,
    CHANGE_PROVINCE,
    CHANGE_SUBURB,
    RESET_CURRENT_LOCATION,
    SET_USER_ADDRESSES,
    SET_CURRENT_ADDRESS,
    RESET_CURRENT_ADDRESS,
    SET_DELIVERY_SLOTS,
    SHOW_ADDRESS_FORM,
    HIDE_ADDRESS_FORM,
    REQUEST_PENDING,
    REQUEST_COMPLETE,
    SHOW_LOADER,
    HIDE_LOADER,
    SHOW_ERROR,
    HIDE_ERROR,
    SET_DELIVERY_LOCATION_DATA
} from './actions';

const deliveryLocation = (
    state = { provinceId: '', suburbId: '', postalCode: '', suburbName: '', regionName: '' }, action
) => {
    switch (action.type) {
        case SET_DELIVERY_LOCATION_DATA:
            //return state;
            return {
                provinceId: action.data.provinceId || state.provinceId,
                suburbId: action.data.suburbId || state.suburbId,
                postalCode: action.data.postalCode || state.postalCode,
                suburbName: action.data.suburbName || state.suburbName,
                regionName: action.data.regionName || state.regionName
            };
        default:
            return state;   
    }
};


const deliveryArea = (state = [], action) => {
  switch (action.type) {
    case GET_DELIVERY_MODAL_SUCCESS:
      return action.regions;
    default:
      return state;
  }
};

const userAddresses = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_ADDRESSES:
            return action.addresses;
        default:
            return state;
    }
}

const currentAddress = (state = {}, action) => {
    switch (action.type) {
        case SET_CURRENT_ADDRESS:
            return action.address;
        case RESET_CURRENT_ADDRESS:
            return {};
        default:
            return state;
    }
}

const selectCurrentLocation = (
    state = {provinceId: '', suburbId: ''}, action
) => {
    switch (action.type) {
        case CHANGE_PROVINCE:
            return {provinceId: action.provinceId, suburbId: ''};
        case CHANGE_SUBURB:
            return Object.assign({}, state, {suburbId: action.suburbId});
        case RESET_CURRENT_LOCATION:
            return {provinceId: '', suburbId: ''};
        default:
            return state;
    }
};

const deliverySlots = (
    state = {}, action
) => {
    switch (action.type) {
        case SET_DELIVERY_SLOTS:
            return action.data;
        default:
            return state;
    }
}

const addressForm = (state = false, action) => {
    switch (action.type) {
        case SHOW_ADDRESS_FORM:
            return true;
        case HIDE_ADDRESS_FORM:
            return false;
        default:
            return state;
    }
}

const form = (state = {
    isWaiting: 0,
    loading: 0,
    error: ''
}, action) => {
    switch (action.type) {
        case REQUEST_PENDING:
            return {...state, isWaiting: 1};
        case REQUEST_COMPLETE:
            return {...state, isWaiting: 0};
        case SHOW_LOADER:
            return {...state, loading: 1};
        case HIDE_LOADER: 
            return {...state, loading: 0};
        case SHOW_ERROR:
            return {...state, error: action.message};
        case HIDE_ERROR:
            return {error: '', ...state};
        default:
            return state;
    }
}

const deliveryDetails = combineReducers({
    deliveryLocation,
    deliveryArea,
    selectCurrentLocation,
    userAddresses,
    currentAddress,
    deliverySlots,
    addressForm,
    form
});

export default deliveryDetails;
