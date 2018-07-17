const fs = window.require('fs');

/**
 *
 * @param path {String}
 * @param cb {String} - caries file data
 */
const readFileMethod = (path, cb) => {
    if (!path || 'string' !== typeof path) return console.log('no file path');

    fs.readFile(path, (err, data) => {
        if (err) console.error('readFileMethod err:', err);

        return cb(data.toString());
    });
};

export default readFileMethod;