import * as types from '../constants/actionTypes';

const initialState = {
    isBusy: false,
    isLoggedOn: false,
    uid: null,
    username: "",
    token: "",
    tokenValidUntil: "",
    errorMessage: ""
};

export default function loginStatusReducer(state = initialState, action) {

    switch (action.type) {

        case types.LOGIN_ATTEMPT_BEGIN:
            return Object.assign({}, state, { isBusy: true });

        case types.LOGIN_ABANDON:
        case types.LOGIN_ATTEMPT_END_FAILED:
            return Object.assign({}, state, {
                isBusy: false,
                isLoggedOn: false,
                uid: null,
                username: "",
                token: "",
                tokenValidUntil: "",
                errorMessage: action.errorMessage
            });


        case types.LOGIN_ATTEMPT_END_SUCCESS:
            return Object.assign({}, state, {
                isBusy: false,
                isLoggedOn: true,
                uid: action.uid,
                username: action.username,
                token: action.token,
                tokenValidUntil: action.tokenValidUntil,
                isPersistent: action.isPersistent,
                errorMessage: ""
            });

        case types.LOGIN_STATUS_SET:
            return Object.assign({}, state, { isLoggedOn: action.value });

        default:
            return state;
    }
}