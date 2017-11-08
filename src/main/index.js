const {app, BrowserWindow, ipcMain, Tray, Menu, nativeImage} = require('electron')
const path = require('path')
const storage = require('electron-json-storage');
const { exec } = require('child_process');
const assetsDirectory = path.join(__dirname, 'assets')


if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static');
}
if (process.platform === 'linux' && ['Pantheon', 'Unity:Unity7'].indexOf(process.env.XDG_CURRENT_DESKTOP) !== -1) {
  process.env.XDG_CURRENT_DESKTOP = 'Unity'
}


// let tray = undefined
let window = undefined

// Don't show the app in the doc
// if(process.platform == 'darwin'){
  // app.dock.hide()
// }

app.on('ready', () => {
  createTray()
  createWindow()
})

// Quit the app when the window is closed
app.on('window-all-closed', () => {
  app.quit()
})

const createTray = () => {
  var nameIcon = '';
  var platform = process.platform;
  // console.log(platform)
  if(platform == 'darwin'){
    nameIcon = '/png/16x16.png';
    tray = new Tray(path.join(assetsDirectory, 'sunTemplate.png'))
  }else{
    const iconName = '16x16.png';
  	const iconPath = path.join(assetsDirectory,'png',iconName);
 //should be "file", otherwise you are not pointing to your icon file
  	let nimage = nativeImage.createFromPath(iconPath);
    tray = new Tray(nimage)
  }




  const trayMenuTemplate = [
              {
                 label: 'Empty Application',
                 enabled: false
              },

              {
                 label: 'Settings',
                 click: function () {
                    console.log("Clicked on settings")
                 }
              },

              {
                 label: 'Help',
                 click: function () {
                    console.log("Clicked on Help")
                 }
              }
           ]

           let trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
           tray.setContextMenu(trayMenu)



  tray.on('right-click', closeWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', function (event) {
    toggleWindow()

    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({mode: 'detach'})
    }
  })
}

// const getWindowPosition = () => {
//   const windowBounds = window.getBounds()
//   const trayBounds = tray.getBounds()
//
//   // Center window horizontally below the tray icon
//   const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
//
//   // Position window 4 pixels vertically below the tray icon
//   const y = Math.round(trayBounds.y + trayBounds.height + 4)
//
//   return {x: x, y: y}
// }

const createWindow = () => {

  window = new BrowserWindow({
    width: 300,
    height: 500,
    minHeight: 300,
    show: true,
    frame: true,
    // titleBarStyle: 'customButtonsOnHover',
    icon: path.join(assetsDirectory, 'icons/png/64x64.png')
    // show: false,
    // frame: false,
    // fullscreenable: false,
    // resizable: true,
    // transparent: true,
    // webPreferences: {
    //   // Prevents renderer process code from not running when window is
    //   // hidden
    //   backgroundThrottling: false
    // }
  })
  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`
  window.loadURL(winURL)

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
}
const closeWindow = () => {


  // app.quit()



}
const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  const position = getWindowPosition()
  window.setPosition(position.x, position.y, false)
  window.show()
  window.focus()
}

ipcMain.on('show-window', () => {
  showWindow()
})

// ipcMain.on('weather-updated', (event, weather) => {
//   // Show "feels like" temperature in tray
//   tray.setTitle(`${Math.round(weather.currently.apparentTemperature)}°`)
//
//   // Show summary and last refresh time as hover tooltip
//   const time = new Date(weather.currently.time).toLocaleTimeString()
//   tray.setToolTip(`${weather.currently.summary} at ${time}`)
//
//
// })
