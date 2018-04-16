import { serverUrls } from '../../server/controllers/apiAggregatorEndPoints';
import ServiceUtil from './serviceUtil';

export default () => {
  return {
    getOrderHistory: (num) => {
        return ServiceUtil.triggerServerRequest({
            method: 'get',
            url: serverUrls.orderhistory,
            params: {
                numOfOrders: num,
                numOfDays: 365,
                sortBy: 'submittedDate'
            }
        });
    },
    getOrderDetails: (orderId) => {
        return ServiceUtil.triggerServerRequest({
            method: 'get',
            url: serverUrls.orderDetails,
            params: {
              orderId
            }
        });
    },
    cancelOrder: (orderId) => {
        return ServiceUtil.triggerServerRequest({
            method: 'POST',
            url: serverUrls.cancelOrder,
            params: {
              orderId
            }
        }); 
    },
    addItemsToOrder: (orderId = '', commerceItemType = '') => {
        return ServiceUtil.triggerServerRequest({
            method: 'POST',
            url: serverUrls.addItemsToOrder,
            params: {
              orderIdForBE: orderId,
              commerceItemType
            }
        }); 
    }
  };
};