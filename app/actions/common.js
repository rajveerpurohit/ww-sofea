import {
  SHOW_LOADER, HIDE_LOADER,
  SHOW_MODAL, HIDE_MODAL,
  SHOW_MOBILE_VIEWPORT, SHOW_DESKTOP_VIEWPORT,
  COLLAPSE_ALL, SET_ACTIVE,
  DESELECT_HEADER_OPTION, SELECT_HEADER_OPTION,
  SET_PREVIOUS_LOCATION,
  SET_SEO_INFORMATION,
  RESET_SEO_INFORMATION
} from '../types';

export function loader(visible = false) {
  return dispatch => dispatch({ type: visible ? SHOW_LOADER : HIDE_LOADER });
}

export function modal(show = false) {
  return dispatch => dispatch({ type: show ? SHOW_MODAL : HIDE_MODAL });
}

export function viewportType(show) {
  return (dispatch) => {
    dispatch({ type: (show === 'mobile') ? SHOW_MOBILE_VIEWPORT : SHOW_DESKTOP_VIEWPORT });
    dispatch({ type: DESELECT_HEADER_OPTION });
  };
}

export function resetAccordianStatus(active) {
  return (dispatch) => {
    if (active === 'null') return dispatch({ type: COLLAPSE_ALL });

    return dispatch({ type: SET_ACTIVE, active });
  };
}

export function collapseAccordian() {
  return  (dispatch) => { return dispatch({ type: SET_ACTIVE, active : null }); }
}

export function setMobileNavHeaderOption(option) {
  return (dispatch) => {
    if (option === 'null') return dispatch({ type: DESELECT_HEADER_OPTION });

    return dispatch({ type: SELECT_HEADER_OPTION, option });
  };
}

export function setPreviousLocation(location = '/') {
  return dispatch => {
    return dispatch({ type: SET_PREVIOUS_LOCATION, location });
  };
}

export function setSEOInformation(data) {
  return (dispatch) => {
    return dispatch({ type: SET_SEO_INFORMATION, data });
  };
}
export function resetSEOInformation() {
  return (dispatch) => {
    return dispatch({ type: RESET_SEO_INFORMATION });
  };
}