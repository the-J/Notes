const fs = window.require('fs');

const readFileMethod = (path, cb) => {
    console.log({path});

    if (!path) return console.log('no file path');

    fs.readFile(path, (err, data) => {
        if (err) console.error('readFileMethod err:', err);

        return cb(data.toString());
    });
};

export default readFileMethod;