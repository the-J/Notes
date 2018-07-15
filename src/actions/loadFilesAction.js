export const loadFilesAction = (filesData = []) => dispatch => {
    dispatch({
        type: 'LOAD_FILES_ACTION',
        payload: filesData
    });
};