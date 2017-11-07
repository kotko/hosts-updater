'use strict'

import { app, BrowserWindow, ipcMain, Tray } from 'electron'
const path = require('path')
let window = undefined
const assetsDirectory = path.join(__dirname, 'build')





/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// function createWindow () {
  /**
   * Initial window options
   */
app.on('ready', () => {
  tray = new Tray(path.join(assetsDirectory, 'icons/png/64x64.png')
  window = new BrowserWindow({
    height: 100,
    // useContentSize: true,
    width: 1500,
    webPreferences: {webSecurity: false}
  })

  window.loadURL(winURL)

  window.on('closed', () => {
    mainWindow = null
  })
// }

// app.on('ready', createWindow)

  // tray = new Tray(path.join(assetsDirectory, 'icons/png/64x64.png')
  // toggleWindow()
})
const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}
const showWindow = () => {
  const trayPos = tray.getBounds()
  const windowPos = window.getBounds()
  let x, y = 0
  if (process.platform == 'darwin') {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
    y = Math.round(trayPos.y + trayPos.height)
  } else {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
    y = Math.round(trayPos.y + trayPos.height * 10)
  }


  window.setPosition(x, y, false)
  window.show()
  window.focus()
}

ipcMain.on('show-window', () => {
  showWindow()
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow()
//
//   }
// })
// redmineApi()
