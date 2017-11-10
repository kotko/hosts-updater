import { app, BrowserWindow, remote } from 'electron'
const os = require('os');
const storage = require('electron-json-storage');

storage.setDataPath(os.tmpdir());
var sudo = require('sudo-prompt')
var hosts =  '/etc/hosts'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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
