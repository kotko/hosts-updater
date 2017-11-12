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


// const ses = session.fromPartition('testproject')
// console.log(ses.getUserAgent())
var tsest =''



const config = {
  'hosts' : hosts,
  'options' : 'Hosts updater',
  'name' : 'Hosts updater'
}
var spawn = require('child_process').exec;



var shshs = ''

var changeFile = function(content, fileName, status) {
  var command = 'echo "'+content+'" > '+ config.hosts
  fs.writeFile(config.hosts, content, function(err) {
      if(err) {
        console.log(err)
      } else {

          var notification = new Notification('Hosts updater', {
             body: fileName+ " "+status,
          })
      }
  })

}
var resetHost = function(fileName, status) {
  storage.get('hostsOrig', function(error, data) {
    changeFile(data, fileName, status)
  });
}
var write = function(fileName, status, path, contents) {
  var content = atob(contents.content)
  changeFile(content, fileName, status)
}
export {write, resetHost}
