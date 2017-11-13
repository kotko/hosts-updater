const {app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, ipcRenderer, dialog, webContents} = require('electron');
const path = require('path')
let {autoUpdater} = require("electron-updater");
let tray = undefined
let win = null;
const positioner = require('electron-traywindow-positioner');


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}


const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`






function sendStatusToWindow(text) {
  let title = win.getTitle();
  win.setTitle(title+": "+text);
}
function createWindow () {
  tray = new Tray(`${__static}/png/16x16.png`);
  tray.on('right-click', toggleWindow)
  tray.on('double-clicnk', toggleWindow)
  tray.on('click', function (event) {
    toggleWindow()

    // Show devtools when command clicked
    // if (window.isVisible() && process.defaultApp && event.metaKey) {
      // mainWindow.openDevTools({mode: 'detach'})
    // }
  })
  win = new BrowserWindow({
    width: 350,
    useContentSize: true,
    minHeight: 400,
    show: true,
    title: 'Hosts update '+app.getVersion(),
    // frame: false,
    "web-preferences": {
     "web-security": false
   },
    // icon: `${__static}/png`
  })
// win.maximize();
// win.setProgressBar(0.40[, {'modeСтрока':'normal'}])
win.loadURL(winURL)


// autoUpdater.allowDowngrade = true;



autoUpdater.setFeedURL({
  "provider": "github",
  "owner": "kotko",
  "repo": "hosts-updater",
  "token": "f39e4a531cd65123f2af4419974b9d184ce410bd",
  "releaseType": "release",
  "vPrefixedTagName": true
});
}
app.on('ready', function()  {
  createWindow()
  showWindow()


});
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})



const toggleWindow = () => {
  if (win.isVisible()) {
    win.hide()
  } else {
    showWindow()
  }
}



const showWindow = () => {
  const rectangle =  tray.getBounds()
  var tesst = positioner.calculate(win.getBounds(), tray.getBounds());
  win.setPosition(tesst.x, tesst.y, false)
  win.show()
  win.focus()
}





ipcMain.on('update-title',(event,title)=>{
win.setTitle(title);
});

app.on('window-all-closed', () => {
app.quit()
});

autoUpdater.on('checking-for-update', () => {
sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (ev, info) => {
sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', (ev, info) => {
sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', (ev, err) => {
sendStatusToWindow('Error in auto-updater.:'+err);
process.stdout.write(ev,err);
});
autoUpdater.on('download-progress', (progressObj) => {
let log_message = "Download speed: " + progressObj.bytesPerSecond;
log_message = (progressObj && progressObj.percent) ? progressObj.percent / 100 : -1
sendStatusToWindow(log_message);
let code = `document.getElementById("demo").innerHTML = ${log_message};`;
   win.webContents.executeJavaScript(code);
});
autoUpdater.on('update-downloaded', (ev, info) => {
sendStatusToWindow('Update downloaded; will install in 5 seconds');
setTimeout(function() {
autoUpdater.quitAndInstall();
}, 5000)
});
autoUpdater.checkForUpdates();
