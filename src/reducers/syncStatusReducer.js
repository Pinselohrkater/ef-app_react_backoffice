import * as types from '../constants/actionTypes';

const initialState = {
    lastSyncDateTimeUtc: null,
    isBusy: false,
    isLoaded: false
};

export default function syncStatusReducer(state = initialState, action) {

    switch (action.type) {

        case types.SYNC_RESPONSE_AVAILABLE:
            return Object.assign({}, state, 
                { 
                    lastSyncDateTimeUtc: action.data.CurrentDateTimeUtc,
                    isLoaded: true
             });

        default:
            return state;
    }
}