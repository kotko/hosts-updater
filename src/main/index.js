import { app, BrowserWindow, remote, Tray, nativeImage, Notification } from 'electron'
const path = require('path')
const os = require('os');
const storage = require('electron-json-storage');
// const notify = require('electron-main-notification')
storage.setDataPath(os.tmpdir());
var sudo = require('sudo-prompt')
var hosts =  '/etc/hosts'
let tray = undefined
let mainWindow = undefined

if(process.platform == 'darwin'){
  app.dock.hide()
}



/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}


const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {



  tray = new Tray( path.join(__static, 'sunTemplate.png'));
  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', function (event) {
    toggleWindow()

    // Show devtools when command clicked
    // if (window.isVisible() && process.defaultApp && event.metaKey) {
      mainWindow.openDevTools({mode: 'detach'})
    // }
  })

  // tray = new Tray(path.join(assetsDirectory, 'app-icon.png'))

  mainWindow = new BrowserWindow({
    width: 350,
    // useContentSize: true,
    minHeight: 400,
    "web-preferences": {
     "web-security": false
   },
    icon: path.join(__static, 'sunTemplate.png')
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}



const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    showWindow()
  }
}
const showWindow = () => {
  const trayPos = tray.getBounds()
  const windowPos = mainWindow.getBounds()
  let x, y = 0
  if (process.platform == 'darwin') {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
    y = Math.round(trayPos.y + trayPos.height)
  } else {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
    y = Math.round(trayPos.y + trayPos.height * 10)
  }


  mainWindow.setPosition(x, y, false)
  mainWindow.show()
  mainWindow.focus()
}



app.on('ready', () => {
//   notify('This is a notification!', { body: 'See? Really easy to use!' }, () => {

// })

  createWindow()
  showWindow()
});

app.on('window-all-closed', () => {
  // resetHost()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})




var resetHost = function() {
  var options = {name: 'electron sudo application'};

  if(process.platform == 'darwin'){
    var Sudoer = require('electron-sudo-mac').default;
    var sudoer = new Sudoer(options);
        storage.get('hostsOrig', function(error, data) {
          var command = 'echo "'+data+'" > '+ hosts
          sudoer.spawn(command, ['']).then(function (cp) {
            cp.stdout.on('data', (msg) => {
              console.log('Looks like we have a message on STDOUT');
              // console.log(err.toString('utf8'));
            });
            cp.on('close',() => {
              console.log('Processed Finished!');
            });
          })
        });
  }else{
      storage.get('hostsOrig', function(error, data) {
        var command = 'echo "'+data+'" > '+ hosts
          sudo.exec(command, options,
            function(error, stdout, stderr) {
              if (error) throw error;
              console.log('stdout: ' + stdout);
            }
          );
      });
  }
}



/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
