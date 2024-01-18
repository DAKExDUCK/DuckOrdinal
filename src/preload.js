const {
    contextBridge,
    ipcRenderer,
} = require("electron");


contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = [];
            if (validChannels.includes(channel)) {
                console.log(channel, data)
                ipcRenderer.send(channel, data);
            }
        },
        on: (channel, func) => {
            let validChannels = ["open-settings"];
            if (validChannels.includes(channel)) {
                console.log(channel, func)
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        removeAllListeners: (channel) => {
            ipcRenderer.removeAllListeners(channel)
        }
    }
);
contextBridge.exposeInMainWorld(
    "settings", {
        get: (key, func) => {
            channel = "get-settings"
            ipcRenderer.send(channel, key);
            ipcRenderer.once(channel, (event, ...args) => func(...args));
        },
        set: (key) => {
            channel = "save-settings"
            ipcRenderer.send(channel, key);
        },
        
    }
);