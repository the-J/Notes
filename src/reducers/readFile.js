const readFile = (state = '', action) => {
    switch (action.type) {
        case 'READ_FILE':
            return {
                result: action.payload
            };
        default:
            return state;
    }
};

export default readFile;