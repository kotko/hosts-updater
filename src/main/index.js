'use strict'

import { app, BrowserWindow, ipcMain, Tray } from 'electron'
const path = require('path')
let tray = undefined
let window = undefined
const assetsDirectory = path.join(__dirname, 'assets')





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

  // This method is called once Electron is ready to run our code
  // It is effectively the main method of our Electron app

  app.on('window-all-closed', () => {
    app.quit()
  })


  app.on('ready', () => {

    tray = new Tray(path.join(assetsDirectory, 'app-icon.png'))
    tray.on('right-click', toggleWindow)
    tray.on('double-click', toggleWindow)
    tray.on('click', function (event) {
      toggleWindow()

      // Show devtools when command clicked
      // if (window.isVisible() && process.defaultApp && event.metaKey) {
        window.openDevTools({mode: 'detach'})
      // }
    })
    window = new BrowserWindow({
      width: 1200,
      height: 800,
      show: true,
      frame: true,
      resizable: true,
      // icon: path.join(assetsDirectory, 'app-icon.png')
      icon: path.join(assetsDirectory, 'icons/png/64x64.png')
    })

    // Tell the popup window to load our index.html file
    window.loadURL(winURL)

    // Only close the window on blur if dev tools isn't opened
    window.on('blur', () => {
      if(!window.webContents.isDevToolsOpened()) {
        window.hide()
      }
    })
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
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
