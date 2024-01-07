const {
    contextBridge,
    ipcRenderer
} = require("electron");


contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = ["get-settings", "save-settings"];
            if (validChannels.includes(channel)) {
                console.log(channel, data)
                ipcRenderer.send(channel, data);
            }
        },
        on: (channel, func) => {
            let validChannels = ["open-settings", "settings-reply"];
            if (validChannels.includes(channel)) {
                console.log(channel, func)
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        removeAllListeners: (channel) => {
            ipcRenderer.removeAllListeners(channel)
        }
    },
);