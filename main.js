const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
var mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
  mainWindow.loadURL(urlLocation)
})