import dateFns from 'date-fns';

const fs = window.require('fs');

/**
 *
 * @param directory {String}
 * @param fileName {String}
 * @param cb - empty callback
 */
const createFileMethod = (directory = '', fileName, cb) => {
    const fileDate = dateFns.format(new Date(), 'MM-DD-YYYY');
    const filePath = `${directory}/${fileName}_${fileDate}.md`;

    fs.writeFile(filePath, '', err => cb(err));
};

export default createFileMethod;