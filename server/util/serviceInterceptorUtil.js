import axios from 'axios';

const InterceptorUtil = {
  interceptors: {
    response: {},
    request: {}
  },

  /* //////////////////////////////////////////////////////
    CHECKING FOR INTERCEPTOR
  ////////////////////////////////////////////////////// */

  /**
   * @method: InterceptorUtil.checkforServerInterceptors
   * @usage: InterceptorUtil.checkforServerInterceptors('response' or 'request');
   * @param type: string: Either for 'response' or 'request'
   * Will check if there is an axios service call interceptor for a certain type of action
   */
  checkForInterceptorsOfType(name, type) {
    const interceptor = this.getInterceptor(name, type);

    return axios.interceptors[type].handlers[interceptor];
  },

  /*
    Public use functions for checking
  */
  checkForResponseInterceptor(name) {
    return this.checkForInterceptorsOfType(name, 'response');
  },

  checkForRequestInterceptor(name) {
    return this.checkForInterceptorsOfType(name, 'request');
  },

  /* //////////////////////////////////////////////////////
    ADDING AN INTERCEPTOR
  ////////////////////////////////////////////////////// */

  /**
   * @method: InterceptorUtil.createServerResponseInterceptor()
   * @usage: InterceptorUtil.createServerResponseInterceptor( 'interceptorName', (response) => {}, (error) => {} );
   * @param interceptorName: string:  Name of interceptor
   * @param responseCallback: function: Callback function to be used on response success
   * @param errorCallback: function: Callback function to be used on response error
   * This method is used to create an global interceptor for service responses from axios service calls
   * It will use the passed in callback functions on the response
   */
  createInterceptor(interceptorConfig) {
    const {interceptorName, responseCallback, errorCallback, type} = interceptorConfig;
    // when creating an interceptor returns, axios returns the index of that receptor in its handler list
    const newIntcpIndex = axios.interceptors[type].use(responseCallback, errorCallback);
    this.storeInterceptor(interceptorName, newIntcpIndex, type);
  },

  /*
    Public use functions for adding
  */
  addResponseInterceptor(interceptorName, responseCallback, errorCallback = (err) => { throw err; }) {
    this.createInterceptor({interceptorName, responseCallback, errorCallback, type: 'response'});
  },

  addRequestInterceptor(interceptorName, responseCallback, errorCallback = (err) => { throw err; }) {
    this.createInterceptor({interceptorName, responseCallback, errorCallback, type: 'request'});
  },

  /**
   * @method: InterceptorUtil.createServerResponseInterceptor()
   * @usage: InterceptorUtil.prependToServerResponse( (response) => {}, (error) => {} );
   * @param name: string:  Name of interceptor
   * @param intcpHandlerIndex: int: Index of interceptor in axios's handlers list
   * @param action: string: interceptor type of action ('response' or 'request')
   * This method is used to create an global interceptor for service responses from axios service calls
   * It will use the passed in callback functions on the response
   */
  storeInterceptor(name, intcpHandlerIndex, type) {
    this.interceptors[type][name] = intcpHandlerIndex;
  },

  /**
   * @method: InterceptorUtil.getInterceptor()
   * @usage: InterceptorUtil.getInterceptor( interceptorname )
   * @param name: string: Name
   * Searches for interceptor by name and returns it
   */
  getInterceptor(name, type) {
    return this.interceptors[type][name];
  },

  /* //////////////////////////////////////////////////////
    REMOVING AN INTERCEPTOR
  ////////////////////////////////////////////////////// */

  /**
   * @method: InterceptorUtil.removeInterceptor()
   * @usage: InterceptorUtil.removeInterceptor( interceptorname, 'response' or 'request' )
   * @param name: string: interceptor Name
   * @param action: string: interceptor type of action ('response' or 'request')
   * Searches for interceptor by name and removes it
   */
  removeInterceptor(name, type) {
    const interceptor = this.getInterceptor(name, type);
    axios.interceptors[type].eject(interceptor);
  },

  /*
    Public use functions for removing
  */
  removeResponseInterceptor(name) {
    this.removeInterceptor(name, 'response');
  },

  removeRequestInterceptor(name) {
    this.removeInterceptor(name, 'request');
  }

};

module.exports = InterceptorUtil;
