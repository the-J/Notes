const loadFiles = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_FILES':
            return action.payload;
        default:
            return state;
    }
};

export default loadFiles;