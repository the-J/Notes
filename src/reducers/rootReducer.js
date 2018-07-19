import {combineReducers} from 'redux';

import loadFiles  from './loadFiles';
import readFile  from './readFile';

export default combineReducers({
    filesList: loadFiles,
    activeFile: readFile
});