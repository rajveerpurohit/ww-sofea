import _ from 'lodash';

import {
  PAGE_CHANGED,
  TAG_ADD_TO_CART,
  TAG_REMOVE_FROM_CART,
  TAG_VIRTUAL_PAGE_VIEW,
  TAG_PRODUCT_CLICKS,
  TAG_PRODUCT_IMPRESSIONS
} from './gtmActionTypes';

export default function gtmReducer(state = {}, action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      // if (typeof window !== 'undefined' && _.isArray(window.dataLayer)) {
      //   window.dataLayer.push({
      //     event: 'pageview',
      //     page: action.payload.pathname
      //   });
      // }

      return state;
    }
    case PAGE_CHANGED:
      return state;
    case TAG_ADD_TO_CART: {
      if (typeof window !== 'undefined' && _.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'addToCart',
          eventAction: 'Add To Cart',
          eventCategory: 'Ecommerce',
          ecommerce: {
            currencyCode: 'ZAR',
            add: { products: action.payload }
          }
        });
      }

      return state;
    }
    case TAG_REMOVE_FROM_CART: {
      if (typeof window !== 'undefined' && _.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'removeFromCart',
          eventAction: 'Remove From Cart',
          eventCategory: 'Ecommerce',
          ecommerce: {
            currencyCode: 'ZAR',
            remove: { products: action.payload }
          }
        });
      }

      return state;
    }
    case TAG_PRODUCT_IMPRESSIONS: {
      if (typeof window !== 'undefined' && _.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'productImpressions',
          eventAction: 'Product Impressions',
          eventCategory: 'Ecommerce',
          ecommerce: {
            currencyCode: 'ZAR',
            impressions: action.payload
          }
        });
      }

      return state;
    }
    case TAG_PRODUCT_CLICKS: {
      if (typeof window !== 'undefined' && _.isArray(window.dataLayer)) {
        let actionField = 'Search Results';
        let products = [];

        if (Array.isArray(action.payload)) {
          products = action.payload;
        } else {
          products = action.payload.products;
          actionField = action.payload.actionField;
        }

        window.dataLayer.push({
          event: 'productClick',
          eventAction: 'Product Click',
          eventCategory: 'Ecommerce',
          ecommerce: {
            click: {
              actionField: {
                list: actionField
              },
              products
            }
          }
        });
      }

      return state;
    }
    default:
      return state;
  }
}
