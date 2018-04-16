/*
* A Middleware to Attach path name in every action.
* that will help to access current Path in Reducers.
*/
import _ from 'lodash';

const pathNameMiddleware = store => next => (action) => {
  const currentStatus = store.getState();
  action.pathname = _.get(currentStatus, 'routing.locationBeforeTransitions.pathname', '');
  next(action);
};
export default pathNameMiddleware;
