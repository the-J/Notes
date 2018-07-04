// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog, Menu} = require('electron');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false
    });

    mainWindow.loadURL('http://localhost:3000');

    const template = [{
        label: 'File',
        submenu: [{
            label: 'Open Folder',
            accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
            click() {
                openDir();
            }
        }, {
            label: 'Open File',
            accelerator: process.platform === 'darwin' ? 'Command+Alt+O' : 'Ctrl+Alt+O',
            click() {
                openFile();
            }
        }]
    }, {
        label: 'Dev',
        submenu: [{
            label: 'DevConsole',
            accelerator: process.platform === 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
            click() {
                mainWindow.webContents.openDevTools();
            }
        }]
    }];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});


// **********************************
function openFile() {
    const files = dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [{name: 'Markdown', extensions: ['md', 'markdown', 'txt']}]
    });

    if (!files) return;

    const fileContent = fs.readFileSync(files[0]).toString();
    mainWindow.webContents.send('new-file', fileContent);
}

function openDir() {
    const directory = dialog.showOpenDialog(mainWindow, {properties: ['opendirectory']});

    if (!directory) return console.error('no dir');

    mainWindow.webContents.send('new-dir', directory[0]);
}
