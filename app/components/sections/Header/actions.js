import { polyfill } from 'es6-promise';
import ServiceUtil from '../../../services/serviceUtil';
import { serverUrls } from '../../../../server/controllers/apiAggregatorEndPoints';
import {
  HIDE_LOADER,
  SHOW_LOADER,
  SET_DELIVERY_SLOT_SESSION
} from '../../../types';

polyfill();

/*
 * CONSTANTS
*/

export const GET_MEGANAV_JSON_SUCCESS = 'GET_MEGANAV_JSON_SUCCESS';
export const GET_MEGANAV_DATA_FAILURE = 'GET_MEGANAV_DATA_FAILURE';
// export const GET_LOGO_JSON_SUCCESS = 'GET_LOGO_JSON_SUCCESS';
// export const GET_LOGO_DATA_FAILURE = 'GET_LOGO_DATA_FAILURE';
export const GET_HEADERDETAILS_JSON_SUCCESS = 'GET_HEADERDETAILS_JSON_SUCCESS';
export const GET_HEADERDETAILS_DATA_FAILURE = 'GET_HEADERDETAILS_DATA_FAILURE';
export const GET_LOGIN_FOOTER_DATA_FAILURE = 'GET_LOGIN_FOOTER_DATA_FAILURE';
export const GET_LOGIN_FOOTER_DATA_SUCCESS = 'GET_LOGIN_FOOTER_DATA_SUCCESS';

export const FOOTER_COLLAPSE_ALL = 'FOOTER_COLLAPSE_ALL';
export const SET_ACTIVE_FOOTER = 'SET_ACTIVE_FOOTER';

export const GET_MINI_CART_JSON_SUCCESS = 'GET_MINI_CART_JSON_SUCCESS';
export const GET_MINI_CART_DATA_FAILURE = 'GET_MINI_CART_DATA_FAILURE';

const hideLoader = () => ({ type: HIDE_LOADER });
const loader = () => ({ type: SHOW_LOADER });

export const miniCartJSONSuccessAction = (data) => {
  return {
    type: GET_MINI_CART_JSON_SUCCESS,
    data
  };
};

export const miniCartJSONFailureAction = () => {
  return {
    type: GET_MINI_CART_DATA_FAILURE
  };
};

export const megaNavJSONSuccessAction = (data) => {
  return {
    type: GET_MEGANAV_JSON_SUCCESS,
    data
  };
};
export const megaNavJSONFailureAction = () => {
  return {
    type: GET_MEGANAV_DATA_FAILURE
  };
};

// export const logoJSONSuccessAction = (data) => {
//   return {
//     type: GET_LOGO_JSON_SUCCESS,
//     data
//   };
// };
// export const logoJSONFailureAction = () => {
//   return {
//     type: GET_LOGO_DATA_FAILURE
//   };
// };
export const headerDetailsJSONSuccessAction = (data) => {
  return {
    type: GET_HEADERDETAILS_JSON_SUCCESS,
    data
  };
};
export const headerDetailsJSONFailureAction = () => {
  return {
    type: GET_HEADERDETAILS_DATA_FAILURE
  };
};

export const loginFooterJSONSuccessAction = (data) => {
  return {
    type: GET_LOGIN_FOOTER_DATA_SUCCESS,
    data
  };
};
export const loginFooterJSONFailureAction = () => {
  return {
    type: GET_LOGIN_FOOTER_DATA_FAILURE
  };
};

export const getminiCartData = (setDeliverySlots = true) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.cartDetails }).then((value) => {
      dispatch(miniCartJSONSuccessAction({ data: value.body }));
      const deliverySlotData = { reservedDeliverySlots: value.body.preReservedDeliverySlots
 || '' };
      if (setDeliverySlots) dispatch({ type: SET_DELIVERY_SLOT_SESSION, data: deliverySlotData });
    }, (error) => {
      dispatch(miniCartJSONFailureAction(error));
    });
  };
};

export const getCartData = (setDeliverySlots = true) => {
  return (dispatch) => {
    // dispatch(loader(true));
    return ServiceUtil.triggerServerRequest({ url: serverUrls.cartDetails, params: { isCartPage: true } }).then((value) => {
      // isCartPage: true, It is required for Vouchers which is third party API and also which cost is per hit
      dispatch(miniCartJSONSuccessAction({ data: value.body }));
      const deliverySlotData = { reservedDeliverySlots: value.body.preReservedDeliverySlots
 || '' };
      if(setDeliverySlots) dispatch({ type: SET_DELIVERY_SLOT_SESSION, data: deliverySlotData });
      // dispatch(hideLoader());
    }, (error) => {
      dispatch(miniCartJSONFailureAction(error));
      // dispatch(hideLoader());
    });
  };
};
export const getCart = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.cartDetails }).then((value) => {
      dispatch(miniCartJSONSuccessAction({ data: value.body }));
    }, (error) => {
      dispatch(miniCartJSONFailureAction(error));
    });
  };
};
export const getMegaNavData = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.megamenu }).then((value) => {
      return Promise.all([
        dispatch(megaNavJSONSuccessAction({ data: value.body }))
      ]);
    });
  };
};
// export const getLogo = (reqHeaders) => {
//   return (dispatch) => {
//     return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.logo }).then((value) => {
//       return Promise.all([
//         dispatch(logoJSONSuccessAction({ data: value.body }))
//       ]);
//     });
//   };
// };
export const getLoginFooter = () => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ url: serverUrls.loginFooter }).then((value) => {
      dispatch(loginFooterJSONSuccessAction({ data: value.body }));
    });
  };
};

export function resetFooterAccordianStatus(active) {
  return (dispatch) => {
    if (active === 'null') return dispatch({ type: FOOTER_COLLAPSE_ALL });
    return dispatch({ type: SET_ACTIVE_FOOTER, active });
  };
}

export const getHeaderDetails = (reqHeaders) => {
  return (dispatch) => {
    return ServiceUtil.triggerServerRequest({ headers: reqHeaders, url: serverUrls.headerdetails }).then((value) => {
      return Promise.all([
        dispatch(headerDetailsJSONSuccessAction({ data: value.body }))
      ]);
    });
  };
};
