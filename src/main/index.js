const {app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, ipcRenderer, dialog, contents, webContents, document} = require('electron');
let {autoUpdater} = require("electron-updater");





if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}




let win = null;
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
  tray.on('double-click', toggleWindow)
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
win.loadURL(winURL)


autoUpdater.allowDowngrade = true;
// autoUpdater.setFeedURL({
//   "provider": "github",
//   "owner": "kotko",
//   "repo": "hosts-updater",
//   "token": "8e6ad3968461ad1e7ce50e088a07db2116f99a5b"
// });
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

  // if(process.platform == 'darwin'){
    const trayPos = tray.getBounds()
    const windowPos = win.getBounds()
    let x, y = 0
    if (process.platform == 'darwin') {
      x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
      y = Math.round(trayPos.y + trayPos.height)
    } else {
      x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
      y = Math.round(trayPos.y + trayPos.height * 10)
    }


    win.setPosition(x, y, false)
  // }

  win.show()
  win.focus()
}






ipcMain.on('update-title',(event,title)=>{
win.setTitle(title);
});

app.on('window-all-closed', () => {
app.quit()
});

autoUpdater.requestHeaders = { "PRIVATE-TOKEN": "eyHfiUriPqCzPc_55bxt" };
autoUpdater.autoDownload = true;

autoUpdater.setFeedURL({
    provider: "generic",
    url: "http://git.slm.ua/kotko/hosts-updater/jobs/artifacts/master/raw/dist?job=build"
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
log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
sendStatusToWindow(log_message);
});
autoUpdater.on('update-downloaded', (ev, info) => {
sendStatusToWindow('Update downloaded; will install in 5 seconds');
setTimeout(function() {
autoUpdater.quitAndInstall();
}, 5000)
});
autoUpdater.checkForUpdates();
