import Api from '../api/EurofurenceAppApi';
import * as types from '../constants/actionTypes';


export function ensureLoaded() {
    return (dispatch, getState) => {
        let { fursuitBadges } = getState();

        if (fursuitBadges.isLoaded) {
            return Promise.resolve();
        } else {
            return dispatch(load());
        }
    };
}

export function load() {
    return (dispatch, getState) => {

        let { loginStatus } = getState();
        
        return Api.getFursuitBadges(loginStatus.token)
            .then((result) => {
                dispatch({ type: types.FURSUIT_BADGES_RESPONSE_AVAILABLE, data: result.data });
            });

    };
}
