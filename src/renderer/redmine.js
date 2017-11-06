'use strict'
import { app, BrowserWindow, dialog, remote, shell} from 'electron'
import Hosts from '../hosts'
var sudo = require('sudo-prompt')
var fs = remote.require('fs')
var file =  '/etc/hosts'
var options = {
  name: 'Electron',
};
const pathConfig = '/Users/kotko/Desktop';


export default function Test() {

}



$('body').on('click', '#testclick', function (e) {
  e.preventDefault()
  Hosts('/Users/kotko/Desktop/test.file').write
});
