import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
    const client = createRestApiClient().withConfig({ baseURL: apiEndpoint, withCredentials: true});
    return {
        addAddress: (data) => {
            return client.request({
                method: 'POST',
                url: '/public/v1/currentUser/addresses',
                headers: {'Content-Type': 'application/json'},
                data
            });
        },
        getAddresses: () => {
            return client.request({
                method: 'get',
                url: '/public/v1/currentUser/addresses/sortedAddresses?type=secondaryAddresses'
            });
        },
        getDeliverySlots: () => {
            return client.request({
                method: 'get',
                url: '/public/v1/location/availabledeliverySlots'
            });
        }
    };
};