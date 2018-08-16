import * as types from '../constants/actionTypes';

const initialState = {
    isLoaded: false,
    fursuitBadges: []
};

export default function fursuitBadgeReducer(state = initialState, action) {

    switch (action.type) {

        case types.FURSUIT_BADGES_RESPONSE_AVAILABLE:
            return Object.assign({}, state, 
                { 
                    fursuitBadges: action.data,
                    isLoaded: true
             });

        default:
            return state;
    }
}