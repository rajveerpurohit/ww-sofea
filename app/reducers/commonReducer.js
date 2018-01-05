import { combineReducers } from 'redux';
import { SHOW_LOADER, HIDE_LOADER } from '../types';
import { SHOW_MODAL, HIDE_MODAL } from '../types';

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
}

export default combineReducers({
    loader,
    modal
});
