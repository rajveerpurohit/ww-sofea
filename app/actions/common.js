import { SHOW_LOADER, HIDE_LOADER } from '../types';
import { SHOW_MODAL, HIDE_MODAL } from '../types';

export function loader(visible = false) {
    return (dispatch) => {
        if (visible) return dispatch({type: SHOW_LOADER});
        return dispatch({type: HIDE_LOADER});
    };
}

export function modal(show = false) {
    return (dispatch) => {
        if (show) return dispatch({type: SHOW_MODAL});
        return dispatch({type: HIDE_MODAL});
    };
}
