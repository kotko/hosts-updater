'use strict'
import { app, BrowserWindow, dialog, remote, shell} from 'electron'
const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());
var sudo = require('sudo-prompt')
var fs = remote.require('fs')
var hosts =  '/etc/hosts'
const { exec } = require('child_process');


var resetHost = function() {
  var options = {name: 'electron sudo application'};
  if(process.platform == 'darwin'){
        storage.get('hostsOrig', function(error, data) {
          var command = 'echo "'+data+'" > '+ hosts
          exec(command, options,
            function(error, stdout, stderr) {
              // console.log(error)
              console.log(stderr)
              console.log('stdout: ' + stdout);
            }
          );
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
      exec(command, options,
        function(error, stdout, stderr) {
          // console.log(error)
          console.log(stderr)
          console.log('stdout: ' + stdout);
        }
      );
    }else{
        storage.get('hostsOrig', function(error, data) {
          var command = 'echo "'+data+'" > '+ hosts
          exec(command, options,
            function(error, stdout, stderr) {
              // console.log(error)
              console.log(stderr)
              console.log('stdout: ' + stdout);
            }
          );
        });
    }
  }else{
    if(status){
      var content = atob(contents.content)
      var command = 'echo "'+content+'" > '+ hosts
        sudo.exec(command, options,
          function(error, stdout, stderr) {
            // console.log(error)
            console.log(stderr)
            console.log('stdout: ' + stdout);
          }
        );
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
}
export {write, resetHost}
