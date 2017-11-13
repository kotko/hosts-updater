const {app, BrowserWindow, ipcMain, nativeImage} = require('electron');
let {autoUpdater} = require("electron-updater");

let win = null;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function sendStatusToWindow(text) {
let title = win.getTitle();
win.setTitle(title+": "+text);
}
app.on('ready', ()=>{
win = new BrowserWindow({title:'Browser',show:false,});
win.maximize();
win.loadURL(winURL)
win.once('ready-to-show', () => {
win.show();
});
autoUpdater.allowDowngrade = true;
// autoUpdater.setFeedURL({
//   "provider": "github",
//   "owner": "kotko",
//   "repo": "hosts-updater",
//   "token": "8e6ad3968461ad1e7ce50e088a07db2116f99a5b"
// });
});

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
