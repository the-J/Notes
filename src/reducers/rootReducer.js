import {combineReducers} from 'redux';

import editorInputReducer from './editorInputReducer';
import loadFilesReducer  from './loadFilesReducer';

export default combineReducers({
    editorInputReducer,
    loadFilesReducer
});