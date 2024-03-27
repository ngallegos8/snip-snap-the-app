const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Electron',
        width: 1000,
        height: 600
    });

    mainWindow.webContents.openDevTools()

    // const startUrl = url.format({
    //     pathname: path.join(__dirname, 'app/build/index.html'),
    //     // pathname: path.join(__dirname, '/Users/nicholasgallegos/Development/Code/Phase-5/electronapp/app/build/index.html'),
    //     protocol: 'file',
    // });

    const appPath = app.getAppPath();
    const startUrl = url.format({
        pathname: path.join(appPath, 'app/build/index.html'),
        protocol: 'file',
    });

    console.log('Start URL:', startUrl); // Add this line

    mainWindow.loadURL(startUrl);
    // mainWindow.loadFile('./app/src/index.js')
}

app.whenReady().then(createMainWindow)
//   continue running even without any windows open (macOS apps)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })