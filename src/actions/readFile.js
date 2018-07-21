import readFileMethod from '../methods/readFileMethod';

export const readFile = path => dispatch => {
    if (path && 'string' === typeof path) {
        readFileMethod(path, fileContent => {
            dispatch({
                type: ' READ_FILE',
                payload: fileContent || ''
            });
        });
    }
    else console.error('readFileMethod no path provided');
};