// const {app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, ipcRenderer, dialog} = require('electron');
// let {autoUpdater} = require("electron-updater");
//
//
// function sendStatusToWindow(text) {
//   let title = win.getTitle();
//   console.log(title)
// }
//
//
//
//
//
//
//
//
//
// ipcMain.on('update-title',(event,title)=>{
// win.setTitle(title);
// });
//
// app.on('window-all-closed', () => {
// app.quit()
// });
//
// autoUpdater.on('checking-for-update', () => {
// sendStatusToWindow('Checking for update...');
// });
// autoUpdater.on('update-available', (ev, info) => {
// sendStatusToWindow('Update available.');
// });
// autoUpdater.on('update-not-available', (ev, info) => {
// sendStatusToWindow('Update not available.');
// });
// autoUpdater.on('error', (ev, err) => {
// sendStatusToWindow('Error in auto-updater.:'+err);
// process.stdout.write(ev,err);
// });
// autoUpdater.on('download-progress', (progressObj) => {
// let log_message = "Download speed: " + progressObj.bytesPerSecond;
// log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
// log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
// sendStatusToWindow(log_message);
// });
// autoUpdater.on('update-downloaded', (ev, info) => {
// sendStatusToWindow('Update downloaded; will install in 5 seconds');
// setTimeout(function() {
// autoUpdater.quitAndInstall();
// }, 5000)
// });
// var autoUpdate = function(){
//   autoUpdater.checkForUpdates();
// }
// export {autoUpdate}
