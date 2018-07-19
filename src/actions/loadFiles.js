import loadFilesMethod from '../methods/loadFilesMethod';

const settings = window.require('electron-settings');

export const loadFiles = () => dispatch => {
    const directory = settings.get('directory') || undefined;

    if (directory) {
        loadFilesMethod(directory, filesData => {
            if (filesData && filesData.length) {

                dispatch({
                    type: 'LOAD_FILES',
                    payload: filesData
                });
            }
        })
    }
    else {
        dispatch({
            type: 'LOAD_FILES',
            payload: []
        });
    }
};