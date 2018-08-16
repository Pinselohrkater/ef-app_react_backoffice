import * as types from '../constants/actionTypes';

const initialState = {
    images: [],
};


function patch(entities, diff) {
    if (diff.RemoveAllBeforeInsert) entities = [];
    let currentEntities = entities.reduce((map, obj) => (map[obj.Id] = obj, map), {});

    diff.ChangedEntities.map(entity => currentEntities[entity.Id] = entity);

    entities = Object.keys(currentEntities).map(key => currentEntities[key])
        .filter(entity => !diff.DeletedEntities.includes(entity.Id));

    return entities;
}


export default function imagesReducer(state = initialState, action) {

    switch (action.type) {

        case types.SYNC_RESPONSE_AVAILABLE: {

            let images = patch(state.images, action.data.Images);
            return Object.assign({}, state, { images });
        }

        default:
            return state;
    }
}