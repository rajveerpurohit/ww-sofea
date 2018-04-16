import { API_AGGRIGATOR_URL } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';
import { serverUrls } from '../../server/controllers/apiAggregatorEndPoints';
import ServiceUtil from './serviceUtil';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: API_AGGRIGATOR_URL, withCredentials: true });
  return {
    addAddress: (data) => {
      return client.request({
        method: 'POST',
        url: serverUrls.addAddress,
        headers: { 'Content-Type': 'application/json' },
        data
      });
    },
    getAddresses: () => {
      return client.request({
        method: 'get',
        url: serverUrls.savedAddress
      });
    },
    validateAddress: (addressKey) => {
      return ServiceUtil.triggerServerRequest({
        method: 'get',
        url: serverUrls.getChangedAddress,
        params: {
          changedAddress: addressKey
        }
      });
    },
    reserveDeliverySlot: (params) => {
      return ServiceUtil.triggerServerRequest({
        method: 'POST',
        url: serverUrls.reserveDeliverySlot,
        data: params
      });
    },
    confirmDeliveryAddress: (data) => {
      return client.request({
        method: 'POST',
        url: serverUrls.confirmDeliveryAddress,
        data
      });
    },
    deliverySlotsSession: () => {
      return client.request({
        method: 'get',
        url: serverUrls.deliverySlots
      });
    },
    extendDeliverySlots: (data) => {
      return client.request({
        method: 'post',
        url: serverUrls.extendDeliverySlots,
        data
      });
    },
    updateDeliverySlot: (data) => {
      return client.request({
        method: 'post',
        url: serverUrls.updateDeliverySlots,
        data
      });
    },
    updateShippingInfo: (data) => {
      return client.request({
        method: 'post',
        url: serverUrls.updateShippingInfo,
        data
      });
    }
  };
};
