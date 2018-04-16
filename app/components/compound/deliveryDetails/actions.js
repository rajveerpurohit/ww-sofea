import { polyfill } from 'es6-promise';
import { push } from 'react-router-redux';
import { deliveryServices } from '../../../services';
import { setUserSession } from '../signin/actions';
import * as types from '../../../types';
import { modal } from '../../../actions/common';
import { getminiCartData } from '../../sections/Header/actions';

polyfill();

/*
 * CONSTANTS
*/
// export const GET_DELIVERY_MODAL_SUCCESS = 'GET_DELIVERY_MODAL_SUCCESS';
// export const GET_DELIVERY_MODAL_FAILURE = 'GET_DELIVERY_MODAL_FAILURE';
export const CHANGE_PROVINCE = 'CHANGE_PROVINCE';
export const CHANGE_SUBURB = 'CHANGE_SUBURB';
export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export const RESET_CURRENT_LOCATION = 'RESET_CURRENT_LOCATION';
export const SET_USER_ADDRESSES = 'SET_USER_ADDRESSES';
export const SET_CURRENT_ADDRESS = 'SET_CURRENT_ADDRESS';
export const UNSET_CURRENT_ADDRESS = 'UNSET_CURRENT_ADDRESS';
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
export const SET_DELIVERY_SLOT_SESSION = 'SET_DELIVERY_SLOT_SESSION';
export const UNSET_DELIVERY_SLOT_SESSION = 'UNSET_DELIVERY_SLOT_SESSION';
export const SHOW_EXTEND_DELIVERY_SLOT = 'SHOW_EXTEND_DELIVERY_SLOT';
export const HIDE_EXTEND_DELIVERY_SLOT = 'HIDE_EXTEND_DELIVERY_SLOT';
export const SHOULD_NOT_CHANGE_DELIVERY_ADDRESS = 'SHOULD_NOT_CHANGE_DELIVERY_ADDRESS';
export const SHOULD_CHANGE_DELIVERY_ADDRESS = 'SHOULD_CHANGE_DELIVERY_ADDRESS';
export const SET_ADDRESS_CHANGE_DATA = 'SET_ADDRESS_CHANGE_DATA';
export const UNSET_ADDRESS_CHANGE_DATA = 'UNSET_ADDRESS_CHANGE_DATA';
export const UNSET_DELIVERY_SLOTS = 'UNSET_DELIVERY_SLOTS';
export const UNSET_RESERVED_TIME = 'UNSET_RESERVED_TIME';
export const SET_RESERVED_TIME = 'SET_RESERVED_TIME';

// export const deliverModalSuccessAction = ({ regions }) => {
//   return {
//     type: GET_DELIVERY_MODAL_SUCCESS,
//     regions
//   };
// };

const setUserAddresses = (addresses) => {
  return {
    type: SET_USER_ADDRESSES,
    addresses
  };
};

export const setDeliveryLocation = (suburbObj) => {
  return (dispatch) => {
    dispatch({
      type: SET_DELIVERY_LOCATION_DATA,
      data: suburbObj
    });
    if (suburbObj.provinceId && suburbObj.suburbId) {
      dispatch({
        type: SET_CURRENT_LOCATION,
        provinceId: suburbObj.provinceId,
        suburbId: suburbObj.suburbId
      });
    }
  };
};

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
    if (state) {
      return dispatch({
        type: SHOW_ADDRESS_FORM
      });
    }
    return dispatch({
      type: HIDE_ADDRESS_FORM
    });
  };
};

export const loader = (flag = 0) => {
  return (dispatch) => {
    return (flag) ? dispatch({ type: SHOW_LOADER }) : dispatch({ type: HIDE_LOADER });
  };
};

export const error = (message = '') => {
  return (dispatch) => {
    if (message) return dispatch({ type: SHOW_ERROR, message });
    return dispatch({ type: HIDE_ERROR });
  };
};

export const requestStatus = (isComplete = 1) => {
  return (dispatch) => {
    return (isComplete) ? dispatch({ type: REQUEST_COMPLETE }) : dispatch({ type: REQUEST_PENDING });
  };
};

// export const getDeliveryArea = () => {
//   return (dispatch) => {
//     return ServiceUtil.triggerServerRequest({ url: serverUrls.region }).then((value) => {
//       dispatch(deliverModalSuccessAction({ regions: value.body.regions }));
//     })
//     .catch((e) => {
//       console.log('getDeliveryArea', e);
//       return false;
//     });
//   };
// };

export const extendDeliverySlotApi = (data) => {
  return (dispatch) => {
    return deliveryServices().extendDeliverySlots(data);
  };
};

export const setCurrentAddress = (address) => {
  return (dispatch) => {
    if (address) {
      return dispatch({
        type: SET_CURRENT_ADDRESS,
        address
      });
    }
    return dispatch({ type: UNSET_CURRENT_ADDRESS });
  };
};

export const reserveDeliverySlots = (params) => {
  return (dispatch) => {
    return deliveryServices().reserveDeliverySlot(params)
        .then((response) => {
          const session = (response && response.body) ? response.body : null;
          if (session) {
            delete session.deliverySlots;
            delete session.links;
            return dispatch({
              type: SET_DELIVERY_SLOT_SESSION,
              data: session
            });
          }
          return null;
        });
  };
};

export const deliverySlotSession = () => {
  return (dispatch) => {
    return deliveryServices().deliverySlotsSession()
        .then((response) => {
          if (response && response.data) return response.data;
          return null;
        })
        .then((session) => {
          if (session) {
            //delete session.deliverySlots;
            delete session.links;
            dispatch({
              type: SET_DELIVERY_SLOT_SESSION,
              data: session
            });
            // if (session.status === true) {
            //   dispatch({
            //     type: types.SHOW_DELIVERY_SLOT
            //   });
            // } else {
            //   dispatch({
            //     type: types.HIDE_DELIVERY_SLOT
            //   });
            // }
            return session;
          }
          return null;
        });
  };
};

export const changeDeliveryAddress = (shouldChange = false, addressNickName = '') => {
  return dispatch => {
    if (shouldChange) {
      if (addressNickName) deliveryServices().validateAddress(addressNickName)
      .then((res) => {
        if (typeof res.body === 'object') {
          dispatch({ type: SET_ADDRESS_CHANGE_DATA, data: res.body });
          const addressChangeStatus = res.body.deliveryAddressChangeStatus;
          if (addressChangeStatus === 'sameSuburb' || addressChangeStatus === 'suburbDeliverable') {
            dispatch({ type: SHOULD_NOT_CHANGE_DELIVERY_ADDRESS });
          } else {
            dispatch({ type: SHOULD_CHANGE_DELIVERY_ADDRESS });
          }
        }
      });
    } else {
      return dispatch({ type: SHOULD_NOT_CHANGE_DELIVERY_ADDRESS }); 
    }
  };
}

export const getDeliverySlots = (addressKey) => {
  return (dispatch) => {
        // return deliveryServices().getDeliverySlots(addressKey)
        // .then((response) => {
        //     if (!(response && response.body && response.body.deliverySlotsDetails)) return dispatch({type: SET_DELIVERY_SLOTS, data: {}});

        //     return dispatch({type: SET_DELIVERY_SLOTS, data: response.body.deliverySlotsDetails});
        // });
    return dispatch(deliverySlotSession())
        // .then((session) => {
        //   return dispatch({ type: SET_DELIVERY_SLOTS, data: session });
        // });
  };
};

export const getUserAddresses = (deliveryDetails = {}, flagForCurrentAddress = true) => {
  return (dispatch) => {  
    return deliveryServices().getAddresses()
        .then((response) => {
          if (!(response.status === 200 && response.data)) throw new Error('error occured in request');
          const userAddresses = response.data;
          delete userAddresses.links;
          delete userAddresses._links;
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
            const userAddressesKey = Object.keys(userAddresses);
            const deliveryLocation = deliveryDetails.deliveryLocation;
            if (deliveryLocation && deliveryLocation.suburbId && deliveryLocation.provinceId) {
              let i = 0;
              for (i = 0; i < userAddressesKey.length; i++) {
                if (userAddresses[userAddressesKey[i]] && userAddresses[userAddressesKey[i]].suburbId === deliveryLocation.suburbId && userAddresses[userAddressesKey[i]].region === deliveryLocation.provinceId) {
                  return dispatch(setCurrentAddress(userAddresses[userAddressesKey[i]]));
                  //return dispatch(getDeliverySlots(userAddressesKey[i]));
                            // break;
                }
              }
              if (i === userAddressesKey.length) return dispatch(showAddressForm(true));
            } else {
              //if (flagForCurrentAddress) dispatch(setCurrentAddress(userAddresses[userAddressesKey[0]]));
              return dispatch(showAddressForm(true));              
            }
          }
        })
        .then(() => dispatch(getDeliverySlots()))
        .catch((e) => {
          console.log('error address', e);
        });
  };
};

export const confirmDeliveryAddress = (data, pageType='') => {
  return (dispatch) => {
    return deliveryServices().confirmDeliveryAddress(data)
      .then((res) => {
        if (res && res.data) {
          if (!res.data.status) {
            if (pageType === 'checkout') {
              return dispatch(push('/'));
            } else {
              return dispatch(modal(false));
            }
          } else {
            return dispatch({ type: SET_DELIVERY_SLOT_SESSION, data: res.data });
          }
        }
      })
      .then(() => {
        return dispatch(setUserSession());
      })
      .then(() => {
        return dispatch(getminiCartData(false));
      })
      .catch((e) => {
      });
  };
};

export const addNewAddress = (data, deliveryDetails = {}) => {
  return (dispatch) => {
    return deliveryServices().addAddress(data)
        .then((response) => {
          if (!response || (response.data && response.data.formexceptions)) return dispatch(error('Something went wrong. Please try again.'));
          return dispatch(setUserSession());
        })
        .then(() => {
          return dispatch(getUserAddresses(deliveryDetails));
        })
        .catch((e) => {
          return dispatch(error('Something went wrong. Please try again.'));
        });
  };
};

export const extendDeliverySlot = (flag = false) => {
  return (dispatch) => {
    if (flag) return dispatch({ type: SHOW_EXTEND_DELIVERY_SLOT });
    return dispatch({ type: HIDE_EXTEND_DELIVERY_SLOT });
  };
};

export const setReservedTime = (time = 0) => {
  return dispatch => {
    return dispatch({ type: SET_RESERVED_TIME, time });
  };
};

export function updateDeliverySlot(data) {
  return (dispatch) => {
    return deliveryServices().updateDeliverySlot(data);
  };
}

export function updateShippingInfo(data) {
  return (dispatch) => {
    return deliveryServices().updateShippingInfo(data)
      .then((response) => {
        if (!(response.status === 200 && response.data)) return dispatch(error('Something went wrong. Please try again.'));
        return dispatch({ type: types.UPDATE_SHIPPING_INFO, data: response.data });
      });
  };
}


export function setCheckoutActiveStep(step) {
  return (dispatch) => {
    dispatch({ type: types.SET_CHECKOUT_ACTIVE_STEP, data: step });
  };
}

export function resetDeliverySlotsData() {
  return (dispatch) => {
    dispatch({ type: UNSET_CURRENT_ADDRESS });
    dispatch({ type: UNSET_ADDRESS_CHANGE_DATA });
    // dispatch({ type: UNSET_DELIVERY_SLOT_SESSION });
    // dispatch({ type: UNSET_DELIVERY_SLOTS });
    dispatch({ type: SHOULD_NOT_CHANGE_DELIVERY_ADDRESS });
    dispatch({ type: HIDE_ADDRESS_FORM });
    dispatch({ type: RESET_CURRENT_LOCATION });
  };
}
// .then(() => {
//   return dispatch(setCheckoutActiveStep(''));
// })
// .catch((e) => {
//   return dispatch(error('Something went wrong. Please try again.'));
// });
