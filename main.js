const { app, BrowserWindow, globalShortcut } = require('electron')
const url = require('url')
const path = require('path')

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        // titleBarStyle: 'customButtonsOnHover',
        // frame: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#00fe8r',
            symbolColor: '#74b1be',
            height: 60
          },
        title: 'Electron',
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // This is required for the renderer process to use require
        }
    });

    //ALLOWS TO TOGGLE DEV TOOLS W/ option+command+i
    if (mainWindow.webContents.isDevToolsOpened()) {
        mainWindow.webContents.closeDevTools();
       } else {
        mainWindow.webContents.openDevTools();
       }

    const appPath = app.getAppPath();
    const startUrl = url.format({
        pathname: path.join(appPath, 'app/build/index.html'),
        protocol: 'file',
    });
    // console.log('Start URL:', startUrl);
    mainWindow.loadURL(startUrl);

    // FOLLOW SYSTEM SETTINGS FOR DARKMODE
    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
          nativeTheme.themeSource = 'light'
        } else {
          nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
      })
      
      ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
      })

}


app.whenReady().then(() => {
    createMainWindow();

    // continue running even without any windows open (macOS apps)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })

    const ret = globalShortcut.register('Control+Option+Command+C', () => {
        console.log('CommandOrControl+X is pressed');
        // Assuming mainWindow is accessible here
        mainWindow.webContents.send('copy-clipitem');
    });

    if (!ret) {
        console.log('registration failed');
    }

    // Check if the shortcut is registered
    console.log(globalShortcut.isRegistered('Control+Option+Command+C'));
});

app.on('will-quit', () => {
    // Unregister all shortcuts
    globalShortcut.unregisterAll();
});
