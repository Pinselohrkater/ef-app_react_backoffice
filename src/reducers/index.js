import { combineReducers } from 'redux';
import loginStatus from './loginStatusReducer';
import syncStatus from './syncStatusReducer';
import knowledgeBase from './knowledgeBaseReducer';
import images from './imagesReducer';
import fursuitBadges from './fursuitBadgeReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  loginStatus,
  syncStatus,
  knowledgeBase,
  images,
  fursuitBadges,
  routing: routerReducer
});

export default rootReducer;
