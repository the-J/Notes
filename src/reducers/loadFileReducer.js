const loadFileReducer = (state = '', action) => {
    switch (action.type) {
        case 'LOAD_FILE':
            return {
                result: action.payload
            };
        default:
            return state;
    }
};

export default loadFileReducer;