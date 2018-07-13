const editorInputReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILE_INPUT_ACTION':
            return {
                result: action.payload
            };
        default:
            return state;
    }
};

export default editorInputReducer;