import {
    combineReducers
} from 'redux';
import _ from 'lodash';

import {
    GET_ADDRESS_JSON_SUCCESS,
    GET_ADDRESS_DATA_FAILURE,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILURE,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAILURE,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAILURE,
    GET_C2_ADDRESS_JSON_SUCCESS,
    RESETFORM,
    UPDATE_C2_PROVINCE_JSON_SUCCESS,
    UPDATE_C2_ADDRESS_JSON_SUCCESS
} from './actions';

const addressDetails = (
    state = {
        address: {},
        c2address: {},
        resetForm: false,
        cityMap: {},
        provinceMap: {},
        suburb: [],
    },
    action
) => {
    switch (action.type) {
        case GET_ADDRESS_JSON_SUCCESS:
            return Object.assign({}, state, {
                // address: action.data.data,
                address: _.keyBy(Object.values(_.omit(action.data.data,'links')).map((item)=> _.omit(item, 'c2AddressTypeID')),'nickname'),
                resetForm: false
            });
        case GET_ADDRESS_DATA_FAILURE:
            return Object.assign({}, state, {
                address: false
            });
        case DELETE_ADDRESS_SUCCESS:{
            return Object.assign({}, state, {
                address: _.omit(state.address,action.data.data.nickname),
                resetForm: false
            })};
        case DELETE_ADDRESS_FAILURE:
            return Object.assign({}, state, {
                address: false
            });
        case UPDATE_ADDRESS_SUCCESS:{
        if(action.data.data.id){
            const newUpdateAddress = action.data.data;
            const addressObjId = Object.values(state.address).filter((item)=>item.id === action.data.data.id)[0].id
            const addressObjIndex = Object.values(state.address).map((item)=>item.id).indexOf(
                Object.values(state.address).filter((item)=>item.id === newUpdateAddress.id)[0].id
            )
            const editAddress = state.address;
            delete editAddress[Object.keys(state.address).filter((item, index)=>{if(index == addressObjIndex) return item})[0]]
        }
            let newAddressUpdated = {};
            newAddressUpdated[action.data.data.nickname] = action.data.data
            return Object.assign({}, state, {
                address: action.data.data.id ? Object.assign({}, state.address, newAddressUpdated) : state.address,
                resetForm: true
            })};
        case UPDATE_ADDRESS_FAILURE:
            return Object.assign({}, state, {
                address: false
            });
        case ADD_ADDRESS_SUCCESS:{
        const newAddress = {};
        newAddress[action.data.data.nickname] = _.omit(action.data.data, 'c2AddressTypeID');
            return Object.assign({}, state, {
                address: Object.assign({}, state.address, newAddress),
                resetForm: true
            })};
        case ADD_ADDRESS_FAILURE:
            return Object.assign({}, state, {
                address: false
            });
            case GET_C2_ADDRESS_JSON_SUCCESS:
            return Object.assign({}, state, {
                c2address: action.data.data,
                resetForm: false
            });
        case RESETFORM:
            return Object.assign({}, state, {
                resetForm: false
            });
        case UPDATE_C2_PROVINCE_JSON_SUCCESS:
            return Object.assign({}, state, {
                cityMap: action.data.data.cityMap,
                provinceMap: action.data.data.provinceMap,
                suburb: action.data.data.suburb,
            });
        case UPDATE_C2_ADDRESS_JSON_SUCCESS:
            return Object.assign({}, state, {
                c2address: state.c2address.c2AddressBean.map(item=>{if(item.addressID === action.data.data.addressID){return action.data.data} return item} ),
            });
        default:
            return state;
    }
}

const addressDetailsReducer = combineReducers({
    addressDetails,
});

export default addressDetailsReducer;