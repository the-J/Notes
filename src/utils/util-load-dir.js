const fs = window.require('fs');
const settings = window.require('electron-settings');

const loadDirUtil = () => {
    if (settings.get('directory')) {

        const directory = settings.get('directory');

        console.log('dir:', directory);

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

                return {date, path, title};
            });

            filesData.sort((a, b) => {
                const aDate = new Date(a.date);
                const aSec = aDate.getTime();
                const bDate = new Date(b.date);
                const bSec = bDate.getTime();
                return bSec - aSec ? 1 : -1;
            });

            console.log({filesData});
            return filesData;
        });
    }
    else {
        // @todo display message of no dir found
        console.log('no directory');
        return [];
    }
};

export default loadDirUtil;