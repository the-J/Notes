import shortId from 'shortid';

const fs = window.require('fs');


const loadFilesMethod = (directory, cb) => {
    fs.readdir(directory, (err, files) => {
        if (err) return console.error('read directory err:', err);

        // @todo display message of no files found
        if (!files && !files.length) return console.log('No files found, read another one');

        const filteredFiles = files.filter(file => file.includes('.md'));

        const filesData = filteredFiles.map(file => {
            const date = file.substr(
                file.indexOf('_') + 1,
                file.indexOf('.') - file.indexOf('_') - 1
            );

            const path = `${directory}/${file}`;
            const title = file.substr(0, file.indexOf('_'));

            const id = shortId.generate();

            return {id, date, path, title};
        });

        filesData.sort((a, b) => {
            const aDate = new Date(a.date);
            const aSec = aDate.getTime();
            const bDate = new Date(b.date);
            const bSec = bDate.getTime();
            return bSec - aSec ? 1 : -1;
        });

        if (filesData) return cb(filesData);
    });
};

export default loadFilesMethod;