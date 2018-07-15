const loadFilesReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_FILES_ACTION':
            return {
                result: action.payload
            };
        default:
            return state;
    }
};

export default loadFilesReducer;