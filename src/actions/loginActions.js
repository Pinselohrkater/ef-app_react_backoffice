import * as types from '../constants/actionTypes';

import Api from '../api/EurofurenceAppApi';

export function setLoginStatus(isLoggedOn) {
    return { type: types.LOGIN_STATUS_SET, value: isLoggedOn };
}


export function abandonLogin() {
    return { type: types.LOGIN_ABANDON };
}

export function attemptLogin(regNo, username, password, isPersistent = false, accessToken = "") {
    return (dispatch) => {
        dispatch({ type: types.LOGIN_ATTEMPT_BEGIN });

        return Api.login({ RegNo: regNo, Username: username, Password: password, AccessToken: accessToken })
            .then((result) => {
                dispatch({
                    type: types.LOGIN_ATTEMPT_END_SUCCESS,
                    uid: result.data.Uid,
                    username: result.data.Username,
                    token: result.data.Token,
                    tokenValidUntil: result.data.tokenValidUntil,
                    isPersistent
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOGIN_ATTEMPT_END_FAILED,
                    errorMessage: "Login failed. Combination of Registration Number, Username and Password is invalid."
                });
            });
    };
}