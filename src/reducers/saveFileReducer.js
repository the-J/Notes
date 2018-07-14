const saveFileReducer = (state = '', action) => {
    switch (action.type) {
        case 'SAVE_FILE':
            return {
                result: action.payload
            };
        default:
            return state;
    }
};

export default saveFileReducer;