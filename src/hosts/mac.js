'use strict'
import { app, BrowserWindow, dialog, remote, shell} from 'electron'
const storage = require('electron-json-storage');
var sudo = require('sudo-prompt')
var fs = remote.require('fs')
var hosts =  '/etc/hosts'
var options = {
  name: 'Electron',
};
const pathConfig = '/Users/kotko/Desktop';
const { exec } = require('child_process');

var write = function(status, path, contents) {
  // var command = 'cp "'+path+'" ' + hosts;
  // console.log(storage)
  var options = {
      name: 'Hosts',
  }


  if(status){
    var content = atob(contents.content)
    var command = 'echo "'+content+'" > '+ hosts
    // var command = 'echo hello'
    // &&  say '+path+ 'enabled';
    return new Promise(function(resolve, reject){
      exec(command, options,
        function(error, stdout, stderr) {
        }
      );
    });
  }else{
    storage.get('hostsOrig', function(error, data) {
      var command = 'echo "'+data+'" > '+ hosts
      return new Promise(function(resolve, reject){
        exec(command, options,
          function(error, stdout, stderr) {
          }
        );
      });
    });

    // var command = 'echo hello'
    // var command = 'echo "'+content+'" > '+ hosts
    // &&  say '+path+ 'disabled';
  }





}
export {write}

// var setContent = function (fileName, content) {
//   console.log(fs)
// }
