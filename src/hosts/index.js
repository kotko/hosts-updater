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


// import os from 'os'
const Mac = require('./mac')
const from = require('./mac')
// import Linux from './linux'
// import Win32 from './win32'

console.log()
var Hosts = function() {
  console.log(path)
  var platform = process.platform;
  var os
  switch (platform) {
      case 'darwin':
          os = write(status, path, content);
          break;
      case 'linux':
          os = write(status, path, content);
          break;
      case 'win32':
          os = write(status, path, content);
          break;
  }
  return os
}
export {Hosts}



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
