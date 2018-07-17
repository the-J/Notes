export const loadFiles = (filesData = []) => dispatch => {
    dispatch({
        type: 'LOAD_FILES',
        payload: filesData
    });
};