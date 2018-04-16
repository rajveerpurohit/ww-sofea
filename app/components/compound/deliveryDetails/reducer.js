import { combineReducers } from 'redux';
import {
    // GET_DELIVERY_MODAL_SUCCESS,
    // GET_DELIVERY_MODAL_FAILURE,
    CHANGE_PROVINCE,
    CHANGE_SUBURB,
    RESET_CURRENT_LOCATION,
    SET_CURRENT_LOCATION,
    SET_USER_ADDRESSES,
    SET_CURRENT_ADDRESS,
    UNSET_CURRENT_ADDRESS,
    SET_DELIVERY_SLOTS,
    SHOW_ADDRESS_FORM,
    HIDE_ADDRESS_FORM,
    REQUEST_PENDING,
    REQUEST_COMPLETE,
    SHOW_LOADER,
    HIDE_LOADER,
    SHOW_ERROR,
    HIDE_ERROR,
    SET_DELIVERY_LOCATION_DATA,
    SET_DELIVERY_SLOT_SESSION,
    UNSET_DELIVERY_SLOT_SESSION,
    SHOW_EXTEND_DELIVERY_SLOT,
    HIDE_EXTEND_DELIVERY_SLOT,
    SHOULD_NOT_CHANGE_DELIVERY_ADDRESS,
    SHOULD_CHANGE_DELIVERY_ADDRESS,
    SET_ADDRESS_CHANGE_DATA,
    UNSET_ADDRESS_CHANGE_DATA,
    UNSET_DELIVERY_SLOTS,
    SET_RESERVED_TIME,
    UNSET_RESERVED_TIME
} from './actions';
import { LOGOUT_SUCCESS_USER } from '../../../types';

const INITIAL_DELIVERY_LOCATION = {
  provinceId: '', suburbId: '', postalCode: '', suburbName: '', regionName: ''
};

const deliveryLocation = (
    state = INITIAL_DELIVERY_LOCATION, action
) => {
  switch (action.type) {
    case SET_DELIVERY_LOCATION_DATA:
      return {
        provinceId: action.data.provinceId || state.provinceId,
        suburbId: action.data.suburbId || state.suburbId,
        postalCode: action.data.postalCode || state.postalCode,
        suburbName: action.data.suburbName || state.suburbName,
        regionName: action.data.regionName || state.regionName
      };
    case LOGOUT_SUCCESS_USER:
      return INITIAL_DELIVERY_LOCATION;
    default:
      return state;
  }
};


// const deliveryArea = (state = [], action) => {
//   switch (action.type) {
//     case GET_DELIVERY_MODAL_SUCCESS:
//       return action.regions;
//     default:
//       return state;
//   }
// };

const userAddresses = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_ADDRESSES:
      return action.addresses;
    default:
      return state;
  }
};

const currentAddress = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_ADDRESS:
      return action.address;
    case UNSET_CURRENT_ADDRESS:
      return {};
    default:
      return state;
  }
};

const selectCurrentLocation = (
    state = { provinceId: '', suburbId: '' }, action
) => {
  switch (action.type) {
    case CHANGE_PROVINCE:
      return { provinceId: action.provinceId, suburbId: '' };
    case CHANGE_SUBURB:
      return Object.assign({}, state, { suburbId: action.suburbId });
    case SET_CURRENT_LOCATION:
      return { provinceId: action.provinceId, suburbId: action.suburbId };
    case RESET_CURRENT_LOCATION:
      return { provinceId: '', suburbId: '' };
    default:
      return state;
  }
};

const deliverySlotSession = (
    state = {}, action
) => {
  switch (action.type) {
    case SET_DELIVERY_SLOT_SESSION:
      return action.data;
    case UNSET_DELIVERY_SLOT_SESSION:
      return {};
    default:
      return state;
  }
};

const changeDeliveryAddress = (
  state = false, action
) => {
  switch (action.type) {
    case SHOULD_CHANGE_DELIVERY_ADDRESS:
      return true;
    case SHOULD_NOT_CHANGE_DELIVERY_ADDRESS:
      return false;
    default:
      return state;
  }
};

const addressChangeData = (
  state = {}, action
) => {
  switch (action.type) {
    case SET_ADDRESS_CHANGE_DATA:
      return action.data;
    case UNSET_ADDRESS_CHANGE_DATA:
      return {};
    default:
      return state;
  }
}

const deliverySlots = (
    state = {}, action
) => {
  switch (action.type) {
    case SET_DELIVERY_SLOTS:
      return action.data;
    case UNSET_DELIVERY_SLOTS:
      return {};
    default:
      return state;
  }
};

const addressForm = (state = false, action) => {
  switch (action.type) {
    case SHOW_ADDRESS_FORM:
      return true;
    case HIDE_ADDRESS_FORM:
      return false;
    default:
      return state;
  }
};

const form = (state = {
  isWaiting: 0,
  loading: 0,
  error: ''
}, action) => {
  switch (action.type) {
    case REQUEST_PENDING:
      return { ...state, isWaiting: 1 };
    case REQUEST_COMPLETE:
      return { ...state, isWaiting: 0 };
    case SHOW_LOADER:
      return { ...state, loading: 1 };
    case HIDE_LOADER:
      return { ...state, loading: 0 };
    case SHOW_ERROR:
      return { ...state, error: action.message };
    case HIDE_ERROR:
      return { ...state, error: '' };
    default:
      return state;
  }
};

const extendDeliverySlot = (state = false, action) => {
  switch (action.type) {
    case SHOW_EXTEND_DELIVERY_SLOT:
      return true;
    case HIDE_EXTEND_DELIVERY_SLOT:
      return false;
    default:
      return state;
  }
};

const reservedTime = (state = 0, action) => {
  switch (action.type) {
    case SET_RESERVED_TIME:
      return action.time;
    case UNSET_RESERVED_TIME:
      return 0;
    default:
      return state;
  }
}

const deliveryDetails = combineReducers({
  deliveryLocation,
  // deliveryArea,
  selectCurrentLocation,
  userAddresses,
  currentAddress,
  //deliverySlots,
  addressForm,
  form,
  deliverySlotSession,
  extendDeliverySlot,
  reservedTime,
  changeDeliveryAddress,
  addressChangeData
});

export default deliveryDetails;
