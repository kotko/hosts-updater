'use strict'
import { app, BrowserWindow, dialog, remote, shell} from 'electron'
import Hosts from '../hosts'
const storage = require('electron-storage');
const Git = require('../git')
var sudo = require('sudo-prompt')

var fs = remote.require('fs')
var file =  '/etc/hosts'
var options = {
  name: 'Electron',
};
const pathConfig = '/Users/kotko/Desktop';


export default function Test() {

}
Git.getListHosts();

storage.get('getListFileContents')
.then(data => {

  $.each(data, function (index, value) {
    var name = value.fileName;
    name = name.substring(0, name.length - 3);
    var item = '<div class="row align-items-center items__hosts">'+
      '<div class="col-3">'+
      '<div class="togglebutton">'+
      '<label>'+
      '<input type="checkbox" value="off">'+
      '<div class="toggle"></div>'+
      name
      '</label>'+
      '</div>'+
      '</div>'+
      '<div class="col-9">'+
      '<h5 class="title__hosts mb-1"></h5>'+
      '</div>'+
      '</div>';
    $('.HostsList').append(item);

  });

})
.catch(err => {
  console.error(err);
});



$('body').on('change', '.togglebutton input', function (e) {
  var thi = $(this)
  if($(this).prop("checked") == true){
    $('.togglebutton input').each(function() {
      if(thi != $(this)){
        $(this).prop("checked", false)
        $(this).val() == 'off'
      }
    })
    $(this).prop("checked", true)
    $(this).val('on')
  }else{
    $(this).prop("checked", false)
    $(this).val('off')
  }
});



$('body').on('click', '#testclick', function (e) {
  e.preventDefault()
  Hosts('/Users/kotko/Desktop/test.file').write
});
