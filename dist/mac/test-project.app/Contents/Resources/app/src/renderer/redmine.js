'use strict'
import {remote} from 'electron'
// import Hosts from '../hosts'
// const Git = require('../git')
// var sudo = require('sudo-prompt')
// var fs = remote.require('fs')
// var file =  '/etc/hosts'
// var options = {
//   name: 'Electron',
// };
// const pathConfig = '/Users/kotko/Desktop';
// var sudo = require('sudo-prompt')

const os = require('os');
const storage = require('electron-json-storage');
storage.setDataPath(os.tmpdir());


// export default function Test() {
  // Git.saveOrigHosts()
  // sudo.exec('echo hello', { name: 'Hosts'},
  //   function(error, stdout, stderr) {
  //     if (error) throw error;
  //     storage.has('getListFileContents', function(error, hasKey) {
  //       if (error) throw error;
  //
  //       if (hasKey) {
  //         Git.getListHosts();
  //       }else{
  //
  //         Git.setListHosts();
  //       }
  //     });
  //   }
  // );

// }

// var options = {
//     name: 'Hosts',
// }



// storage.remove('hostsOrig', function(error) {
//   if (error) throw error;
// });

// storage.getAll(function(error, data) {
// if (error) throw error;
//
// console.log(data);
// });

// Git.updateStorage()

// Git.saveOrigHosts()


// storage.has('getListFileContents', function(error, hasKey) {
//   if (error) throw error;
//
//   if (hasKey) {
//     Git.getListHosts();
//   }else{
//
//     Git.setListHosts();
//   }
// });

// $('body').on('change', '.togglebutton input', function (e) {
//   var btn = $(this)
//   var status = toggleBtnHosts($(this))
//   Git.enableHost(status, btn.attr('data-fileName'))
// });
// var toggleBtnHosts = function(btn) {
//   if(btn.prop("checked") == true){
//     $('.togglebutton input').each(function() {
//       if(btn != $(this)){
//         $(this).prop("checked", false)
//         $(this).val() == 'off'
//       }
//     })
//     btn.prop("checked", true)
//     btn.val('on')
//   }else{
//     btn.prop("checked", false)
//     btn.val('off')
//   }
//   return btn.prop("checked")
// }
