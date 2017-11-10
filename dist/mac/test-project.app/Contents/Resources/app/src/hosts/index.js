'use strict'
import { app, BrowserWindow, dialog, remote, shell} from 'electron'
const os = require('os');
const storage = require('electron-json-storage')
const sudo = require('sudo-prompt')
const fs = remote.require('fs')
const hosts =  '/etc/hosts'
const { exec } = require('child_process');
const path = require('path')
const assetsDirectory = path.join(__dirname, '../', 'main/assets')
const icon = path.join(assetsDirectory, 'png/64x64.png')
storage.setDataPath(os.tmpdir())



var resetHost = function() {
  var options = {name: 'electron sudo application'};
  if(process.platform == 'darwin'){
        storage.get('hostsOrig', function(error, data) {
          var command = 'echo "'+data+'" > '+ hosts
          exec(command, options,
            function(error, stdout, stderr) {
              var notification = new Notification('Hosts updater', {
                 body: "Hosts reset",
              });
            }
          );
        });
  }else{
      storage.get('hostsOrig', function(error, data) {
        var command = 'echo "'+data+'" > '+ hosts
          sudo.exec(command, options,
            function(error, stdout, stderr) {
              if (error) throw error;
              var notification = new Notification('Hosts updater', {
                 body: "Hosts reset",
              });
            }
          );
      });
  }
}
var write = function(fileName, status, path, contents) {
  var options = {name: 'electron sudo application'};

  if(process.platform == 'darwin'){
    if(status){
      var content = atob(contents.content)
      var command = 'echo "'+content+'" > '+ hosts
      exec(command, options,
        function(error, stdout, stderr) {
          var notification = new Notification('Hosts updater', {
             body: fileName+ " enable",
          });
        }
      );
    }else{
        storage.get('hostsOrig', function(error, data) {
          var command = 'echo "'+data+'" > '+ hosts
          exec(command, options,
            function(error, stdout, stderr) {
              var notification = new Notification('Hosts updater', {
                 body: fileName+ " enable",
              });
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
            var notification = new Notification('Hosts updater', {
               body: fileName+ " enable",
            });
          }
        );
    }else{
      storage.get('hostsOrig', function(error, data) {
        var command = 'echo "'+data+'" > '+ hosts
          sudo.exec(command, options,
            function(error, stdout, stderr) {
              var notification = new Notification('Hosts updater', {
                 body: fileName+ " enable",
              });
            }
          );
      });
    }
  }
}
export {write, resetHost}
