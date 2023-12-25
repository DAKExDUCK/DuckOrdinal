const { app, Tray, Menu, BrowserWindow } = require('electron/main')
const path = require('node:path')


let tray

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js')
        },
    })
    win.loadFile('static/html/index.html')
}

app.whenReady().then(() => {
    tray = new Tray('assets/images/icons/logo/duckordinal.png')

    const trayMenu = Menu.buildFromTemplate([
        { type: 'separator' },
        { label: 'Quit', click() { app.quit(); } }
    ])

    if (process.platform === 'win32') {
        tray.on('click', tray.popUpContextMenu);
    }

    tray.setToolTip('DuckOrdinal')
    tray.setContextMenu(trayMenu)

    createWindow()
})
