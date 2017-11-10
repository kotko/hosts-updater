'use strict'
import { app, BrowserWindow, dialog, remote, shell} from 'electron'
const os = require('os');
const storage = require('electron-json-storage');

storage.setDataPath(os.tmpdir());
var sudo = require('sudo-prompt')
// var Sudo = require('electron-sudo')
// import Sudoer from 'electron-sudo';
var fs = remote.require('fs')
var hosts =  '/etc/hosts'
// var options = {
//   name: 'Electron',
// };
// const pathConfig = '/Users/kotko/Desktop';
// const { exec } = require('child_process');


// import os from 'os'
// const Mac = require('./mac')
// const from = require('./mac')
// import Linux from './linux'
// import Win32 from './win32'


// var Hosts = function() {
//
//   var platform = process.platform;
//   var os
//   switch (platform) {
//       case 'darwin':
//           os = write(status, path, content);
//           break;
//       case 'linux':
//           os = write(status, path, content);
//           break;
//       case 'win32':
//           os = write(status, path, content);
//           break;
//   }
//   return os
// }
// export {Hosts}
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
var write = function(status, path, contents) {
  var options = {name: 'electron sudo application'};

  if(process.platform == 'darwin'){
    if(status){
      var content = atob(contents.content)
      var command = 'echo "'+content+'" > '+ hosts
      var Sudoer = require('electron-sudo-mac').default;
      var sudoer = new Sudoer(options);

      sudoer.spawn(command, ['']).then(function (cp) {
        cp.stdout.on('data', (msg) => {
          console.log('Looks like we have a message on STDOUT');
          // console.log(err.toString('utf8'));
        });
        cp.on('close',() => {
          console.log('Processed Finished!');
        });
      })
    }else{
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
    }
  }else{
    if(status){
      var content = atob(contents.content)
      var command = 'echo "'+content+'" > '+ hosts

      // return new Promise(function(resolve, reject){
        sudo.exec(command, options,
          function(error, stdout, stderr) {
            // console.log(error)
            console.log(stderr)
            console.log('stdout: ' + stdout);
          }
        );
      // });
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
  //
  //

  //






  // console.log(storage)
  // var options = {name: 'electron sudo application'}
  //   sudoer = new Sudoer(options);






  // sudo.exec('echo hello', options,
  // function(error, stdout, stderr) {
  //   if (error) throw error;
  //   console.log('stdout: ' + stdout);
  // }
  // );



  // if(result){
  //   var content = atob(contents.content)
  //   var command = 'echo "'+content+'" > '+ hosts
  //     exec(command, options,
  //       function(error, stdout, stderr) {
  //         if (error) throw error;
  //         console.log('stdout: ' + stdout);
  //       }
  //     );
  // }

  // if(status){
  //   var content = atob(contents.content)
  //   var command = 'echo "'+content+'" > '+ hosts
  //
  //   // return new Promise(function(resolve, reject){
  //     sudo.exec(command, options,
  //       function(error, stdout, stderr) {
  //         // console.log(error)
  //         console.log(stderr)
  //         console.log('stdout: ' + stdout);
  //       }
  //     );
  //   // });
  // }else{
  //   storage.get('hostsOrig', function(error, data) {
  //     var command = 'echo "'+data+'" > '+ hosts
  //       sudo.exec(command, options,
  //         function(error, stdout, stderr) {
  //           if (error) throw error;
  //           console.log('stdout: ' + stdout);
  //         }
  //       );
  //   });
  // }




}
export {write, resetHost}
