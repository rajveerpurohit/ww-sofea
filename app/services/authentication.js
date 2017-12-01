import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';
import * as qs from 'qs';
import  { user } from './api.js';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint, withCredentials: true});
  return {
    login: ({ login, password }) => {
        const grant_type = 'password';
        return client.request({
        method: 'POST',
        url: user.login,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: qs.stringify({
          login,
          password,
          grant_type
        })
      })
    },
    signUp: ({ email, password }) => client.request({
      method: 'POST',
      url: '/users',
      data: {
        email,
        password
      }
    }),
    logOut: () => client.request({
      method: 'POST',
      url: user.logout
    }),
    isLoggedIn: () => {
      return client.request({
        method: 'GET',
        url: user.currentUser
      })
    }
  };
};

