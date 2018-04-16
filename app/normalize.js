// import './polyfills/babel.pollyfill';
import 'babel-polyfill';
import './polyfills/media.match';
import './polyfills/url.parser';
import './polyfills/classlist';
import 'expose-loader?$!jquery';
import 'expose-loader?jQuery!jquery';

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    // console.log('NodeList.prototype.forEach');
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
