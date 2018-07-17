export const readFile = (fileContent = '') => dispatch => {
    dispatch({
        type: 'READ_FILE',
        payload: fileContent
    });
};