import { push } from 'react-router-redux';
// import { authService } from '../services';
import * as types from '../types';
import { deliveryModal } from '../services';

function isDeliverable(value) {
    return { type: types.CHECK_DELIVERABLE, value };
}

function setProvinceData(data) {
    return { type: types.SET_PROVINCE_DATA, data };
}

export function toggleDeliverable(value) {
    return (dispatch) => {
        dispatch(isDeliverable(value));
    };
}

export function addProvinceData() {
    return (dispatch) => {
        deliveryModal().getDeliveryLocations()
        .then((data) => {
            dispatch(setProvinceData(data.data.regions));
        })
        .catch();
    };
}
