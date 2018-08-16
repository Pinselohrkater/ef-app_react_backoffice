import * as types from '../constants/actionTypes';

import Api from '../api/EurofurenceAppApi';

export function ensureSync() {
    return (dispatch, getState) => {
        let { syncStatus } = getState();

        if (syncStatus.isLoaded) {
            return Promise.resolve();
        } else {
            return dispatch(runSync());
        }
    };
}

export function runSync() {
    return (dispatch, getState) => {

        let { syncStatus } = getState();
        
        return Api.getSync(syncStatus.lastSyncDateTimeUtc)
            .then((result) => {
                dispatch({ type: types.SYNC_RESPONSE_AVAILABLE, data: result.data });
            });

    };
}

export function updateKnowledgeGroup(entity) {
    return (dispatch, getState) => {
        let { loginStatus } = getState();

        return Api.putKnowledgeGroup(loginStatus.token, entity)
            .then(() => dispatch(runSync()));
    };
}

export function createKnowledgeEntry(entity) {
    return (dispatch, getState) => {
        let { loginStatus } = getState();

        return Api.postKnowledgeEntry(loginStatus.token, entity)
            .then((result) => 
                dispatch(runSync())
                .then(() => { return result.data; })            
            );
    };
}

export function deleteKnowledgeEntry(entity) {
    return (dispatch, getState) => {
        let { loginStatus } = getState();

        return Api.deleteKnowledgeEntry(loginStatus.token, entity.Id)
            .then(() => dispatch(runSync()));
    };
}


export function updateKnowledgeEntry(entity) {
    return (dispatch, getState) => {
        let { loginStatus } = getState();

        return Api.putKnowledgeEntry(loginStatus.token, entity)
            .then(() => dispatch(runSync()));
    };
}

export function updateImageContent(imageId, imageBytesBase64Encoded) {
    return (dispatch, getState) => {
        let { loginStatus } = getState();

        return Api.putImageContent(loginStatus.token, imageId, imageBytesBase64Encoded)
            .then(() => dispatch(runSync()));
    };

}


export function getPushNotificationChannelStatistics() {
    return (dispatch, getState) => {
        let { loginStatus } = getState();
        return Api.getPushNotificationChannelStatistics(loginStatus.token);
    };
}
