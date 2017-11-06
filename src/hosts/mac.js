'use strict'
import { app, BrowserWindow, dialog, remote, shell} from 'electron'
var sudo = require('sudo-prompt')
var fs = remote.require('fs')
var hosts =  '/etc/hosts'
var options = {
  name: 'Electron',
};
const pathConfig = '/Users/kotko/Desktop';

export default function write(path) {
  var command = 'cp "'+path+'" ' + hosts;
  var options = {
      name: 'Hosts',
  }
  return new Promise(function(resolve, reject){
    sudo.exec(command, options,
      function(error, stdout, stderr) {
        if (error) throw error;
         console.log('stdout: ' + stdout);
      }
    );
  });
}
