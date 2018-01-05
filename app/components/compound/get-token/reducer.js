import { GET_TOKEN_CONF_NUMBER } from './actions';

const sessConf = (state = {
  token: null
}, action) => {
  switch (action.type) {
    case GET_TOKEN_CONF_NUMBER:
      return Object.assign({}, state, {token: action.data.token});

    default:
      return state;
  }
};

export default sessConf;
