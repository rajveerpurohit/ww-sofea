import { combineReducers } from 'redux';

import {
  SHOW_LOADER, HIDE_LOADER,
  SHOW_MODAL, HIDE_MODAL,
  COLLAPSE_ALL, SET_ACTIVE,
  SHOW_MOBILE_VIEWPORT, SHOW_DESKTOP_VIEWPORT,
  DESELECT_HEADER_OPTION, SELECT_HEADER_OPTION,
  SET_PREVIOUS_LOCATION,
  SET_SEO_INFORMATION,
  RESET_SEO_INFORMATION
} from '../types';

const loader = (state = false, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return true;
    case HIDE_LOADER:
      return false;
    default:
      return state;
  }
};

const modal = (state = false, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return true;
    case HIDE_MODAL:
      return false;
    default:
      return state;
  }
};

const AccordianStatus = (state = null, action) => {
  switch (action.type) {
    case COLLAPSE_ALL:
      return null;
    case SET_ACTIVE:
      return action.active;
    default:
      return state;
  }
};

// const mobileViewport = (state = '', action) => {
//   switch (action.type) {
//     case SHOW_MOBILE_VIEWPORT:
//       return true;
//     case HIDE_MOBILE_VIEWPORT:
//       return false;
//     default:
//       return state;
//   }
// };

const viewportType = (state = '', action) => {
  switch (action.type) {
    case SHOW_MOBILE_VIEWPORT:
      return 'mobile';
    case SHOW_DESKTOP_VIEWPORT:
      return 'desktop';
    default:
      return state;
  }
};

const mobileNavHeaderStatus = (state = '', action) => {
  switch (action.type) {
    case SELECT_HEADER_OPTION:
      return action.option || '';
    case DESELECT_HEADER_OPTION:
      return '';
    default:
      return state;
  }
};

const previousLocation = (state = '/', action) => {
  switch (action.type) {
    case SET_PREVIOUS_LOCATION:
      return action.location;
    default:
      return state;
  }
};

const seo = (state = {
  SEOTags: {}
}, action) => {
  switch (action.type) {
    case SET_SEO_INFORMATION:
      return {
        SEOTags: {
          ...state.SEOTags,
          ...action.data
        }
      };
    case RESET_SEO_INFORMATION:
      return Object.assign({}, state, { SEOTags: {} });
    // case '@@router/LOCATION_CHANGE':
    //   return action.pathname ? {
    //     SEOTags: {
    //       title: 'Woolworths',
    //       metaKeywords: 'Description',
    //       metaDescription: 'Woolworths eBusiness reference application.'
    //     }
    //   } : state;
    default:
      return state;
  }
};

export default combineReducers({
  loader,
  modal,
  viewportType,
  AccordianStatus,
  mobileNavHeaderStatus,
  previousLocation,
  seo
});
