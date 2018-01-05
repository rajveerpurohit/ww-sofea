import { apiEndpoint, API_AGGRIGATOR_URL } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';
import * as qs from 'qs';
import ServiceUtil from './serviceUtil';
import {serverUrls} from '../../server/controllers/apiAggregatorEndPoints';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: API_AGGRIGATOR_URL, withCredentials: true});
  return {
    login: ({ login, password }) => {
        const grant_type = 'password';
        return ServiceUtil.triggerServerRequest({
        method: 'POST',
        url: serverUrls.login,
        headers: {'Content-Type': 'application/json'},
        data: {
          login,
          password,
          grant_type
        }
      });
    },
    signUp: ({ email, password }) => client.request({
      method: 'POST',
      url: '/users',
      data: {
        email,
        password
      }
    }),
    logOut: () => ServiceUtil.triggerServerRequest({
      method: 'POST',
      url: serverUrls.logout
    }),
    isLoggedIn: () => {
      return ServiceUtil.triggerServerRequest({
        url: serverUrls.currentUser
      });
    }
  };
};

