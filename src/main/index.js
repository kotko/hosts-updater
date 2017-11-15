const {app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, ipcRenderer, dialog, webContents} = require('electron');
const path = require('path')
let {autoUpdater} = require("electron-updater");
let tray = undefined
let win = null;
const positioner = require('electron-traywindow-positioner');
require('electron-debug')({showDevTools: true});

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
  let code = `document.getElementById("updating-status").innerHTML = ${text};`;
 win.webContents.executeJavaScript(code);
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
    frame: true,
    "web-preferences": {
     "web-security": false
   },
    // icon: `${__static}/png`
  })
win.loadURL(winURL)

  win.openDevTools()
// autoUpdater.allowDowngrade = true;

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
// let code_1 = `document.getElementById("body").innerHTML += '<div class="modal-backdrop fade in"></div>';`;
// win.webContents.executeJavaScript(code_1);
});
autoUpdater.on('update-not-available', (ev, info) => {
sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', (ev, err) => {
sendStatusToWindow('Error in auto-updater.:'+err);
process.stdout.write(ev,err);
});
autoUpdater.on('download-progress', (progressObj) => {
// let log_message = "Download speed: " + progressObj.bytesPerSecond;
let log_message = (progressObj && progressObj.percent) ? progressObj.percent / 100 : -1


let code_2 = `document.getElementById("modal-backdrop").style.display = "block";`;
let code_3 = `document.getElementById("modals").style.display = "block";`;
let code_4 = `document.getElementById("percent-update").innerHTML = ${Math.round(log_message * 100)}+"%";`;

   win.webContents.executeJavaScript(code_2);
   win.webContents.executeJavaScript(code_3);
   win.webContents.executeJavaScript(code_4);

});
autoUpdater.on('update-downloaded', (ev, info) => {
sendStatusToWindow('Update downloaded; will install in 5 seconds');
setTimeout(function() {
autoUpdater.quitAndInstall();
}, 5000)
});
autoUpdater.checkForUpdates();
//
