'use strict'
// const remote = require('electron')
const os = require('os')
const storage = require('electron-json-storage')
const sudo = require('sudo-prompt')
const fs = require('fs')
const { exec } = require('child_process')
var hosts =  '/etc/hosts'
if(process.platform == 'win32'){
 hosts = 'C:\\Windows\\System32\\drivers\\etc\\hosts'
}

storage.setDataPath(os.tmpdir())

var Sudoer = require('electron-sudo-mac').default;
let options = {name: 'electron sudo application'};
var sudoer = new Sudoer(options);


const config = {
  'hosts' : hosts,
  'options' : 'Hosts updater',
  'name' : 'Hosts updater'
}

var changeFile = function(content, fileName, status) {
  var command = ''
  storage.get('hostsOriginal', function(error, data) {
    fs.writeFile(config.hosts, data+' '+content, function(err) {
        if(err) {
          console.log(err) 
        } else {
          fileName = fileName.substring(0, fileName.length - 4);
          var notification = new Notification('Hosts updater', {
             body: fileName+ " "+status,
          })
        }
    })
  });

}
var resetHost = function(fileName, status) {
  storage.get('hostsOriginal', function(error, data) {
    fs.writeFile(config.hosts, data, function(err) {
        if(err) {
          console.log(err)
        } else {
          fileName = fileName.substring(0, fileName.length - 4);
          var notification = new Notification('Hosts updater', {
             body: fileName+ " "+'reset',
          })
        }
    })
  });
}
var write = function(fileName, status, path, contents) {
  var content = atob(contents.content)
  changeFile(content, fileName, status)
}
export {write, resetHost}
