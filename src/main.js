const { app, Tray, Menu, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const Store = require('electron-store')

Store.initRenderer();
const settings = new Store(name='settings', fileExtension='json', clearInvalidConfig=true);
if (settings.size === 0) {
    settings.store = {
        voice_video: {
            voiceVolume: 50,
            videoQuality: "720p",
        },
    }
}
console.log(settings.path)
console.log(settings.store)

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        titleBarStyle: 'hidden',
    })
    mainWindow.loadFile('static/html/main.html')

    const tray = new Tray('assets/images/icons/logo/duckordinal.png')

    const trayMenu = Menu.buildFromTemplate([
        { label: 'Settings', click() { mainWindow.webContents.send('open-settings') } },
        { type: 'separator' },
        { label: 'Quit', click() { app.quit(); } }
    ])

    tray.setToolTip('DuckOrdinal')
    tray.setContextMenu(trayMenu)

    if (process.platform === 'win32') {
        tray.on('click', tray.popUpContextMenu);
    }

    ipcMain.on('get-settings', (event, args) => {
        console.log('get-settings', settings.get(args.key))
        event.reply('get-settings', settings.get(args.key));
    });
    ipcMain.on('save-settings', (event, args) => {
        settings.set(args.key, args.data)
        console.log('save-settings', settings.get(args.key))
    });

    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow();
})
