import * as types from '../constants/actionTypes';

const initialState = {
    knowledgeEntries: [],
    knowledgeGroups: [],
};


function patch(entities, diff) {
    if (diff.RemoveAllBeforeInsert) entities = [];
    let currentEntities = entities.reduce((map, obj) => (map[obj.Id] = obj, map), {});

    diff.ChangedEntities.map(entity => currentEntities[entity.Id] = entity);

    entities = Object.keys(currentEntities).map(key => currentEntities[key])
        .filter(entity => !diff.DeletedEntities.includes(entity.Id));

    return entities;
}


export default function knowledgeBaseReducer(state = initialState, action) {

    switch (action.type) {

        case types.SYNC_RESPONSE_AVAILABLE: {

            let knowledgeEntries = patch(state.knowledgeEntries, action.data.KnowledgeEntries);
            let knowledgeGroups = patch(state.knowledgeGroups, action.data.KnowledgeGroups);

            return Object.assign({}, state, { knowledgeEntries, knowledgeGroups });
        }

        default:
            return state;
    }
}