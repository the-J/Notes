import { combineReducers } from 'redux';

import editorInputReducer  from './editorInputReducer';
import saveFileReducer  from './saveFileReducer';
import loadFileReducer  from './loadFileReducer';
import saveDirReducer from './saveDirReducer';

export default combineReducers({
    editorInputReducer,
    saveFileReducer,
    saveDirReducer,
    loadFileReducer
});