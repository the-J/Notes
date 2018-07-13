export const editorInputAction = (input) => dispatch => {
    dispatch({
        type: 'FILE_INPUT_ACTION',
        payload: input
    })
}