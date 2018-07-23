import dateFns from 'date-fns';

const fs = window.require('fs');
const settings = window.require('electron-settings');

/**
 *
 * @param fileName {String}
 * @param cb
 */
const createFileMethod = (fileName, cb) => {
    const directory = settings.get('directory');
    const date = dateFns.format(new Date(), 'MM-DD-YYYY');

    const fullName = `${directory}/${fileName}_${date}.md`;

    fs.writeFile(fullName, '', err => cb(err));
};

export default createFileMethod;