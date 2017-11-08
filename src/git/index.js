'use strict'
import {remote} from 'electron'
const Hosts = require('../hosts')
const token = 'G9YdzzeyHT-RsoXaFA8e';
const ApiUrl = 'http://gitlab.stb.ua/api/v3/projects/'
const storage = require('electron-json-storage');
var fs = remote.require('fs')


var tree = [];
var status = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
var json = function(response) {
  return response.json()
}
var setListHosts = function () {
  var getTree = new Promise(function(resolve, reject) {
    var url = ApiUrl+'149/repository/tree'
    fetch(url,
      {
        method: 'GET',
        headers: {
        'PRIVATE-TOKEN': token,
        'Content-Type': 'application/json'
      },
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      resolve(data)
    })
    .catch(function (error) {
    });
  })
  getTree.then(
    result => {
      getListFileName(result)
    },
    error => alert("Rejected: " + error.message) // Rejected: время вышло!
  )
}
var getListFileName = function (arr) {
  var arrName = [];
  Promise.all(arr.map(val => {
    arrName.push(val.name)
  })).then(response => {
    getListFileUrl(arrName)
  })
}
var getListFileUrl = function (arr) {
    var urls = []
    Promise.all(arr.map(fileName => {
      urls.push(ApiUrl+'149/repository/files?file_path='+fileName+'&ref=master')
    })).then(response => {
      getListFileContent(urls)
    })
}
var getListFileContent = function (urls) {
  var content = [];
  var fetchAttr = {
    method: 'GET',
    headers: {
      'PRIVATE-TOKEN': token,
      'Content-Type': 'application/json'
    }
  }
  Promise.all(urls.map(url =>
    fetch(url,fetchAttr)
    .then(status)
    .then(json)
    .then(function(data) {
      return data
    }).catch(function(error) {
      console.log('Request failed', error);
    })
  )).then(function(response){
    Promise.all(response.map(value => {
      content.push(
        {
          'fileName' : value.file_name,
          'content' : value.content
        }
      )
    })).then(response => {
      getListFileContents(content)
    })
  });
}
var getListFileContents = function (contents) {
  storage.set('getListFileContents', contents, function(error) {
    if (error) throw error;
  });
}

var getListHosts = function (contents) {
  storage.get('getListFileContents', function(error, data) {
    $.each(data, function (index, value) {
      var name = value.fileName;
      name = name.substring(0, name.length - 4);
      var item = '<div class="row align-items-center items__hosts">'+
        '<div class="col-3">'+
        '<div class="togglebutton">'+
        '<label class="title__hosts">'+
        '<input data-fileName="'+value.fileName+'" type="checkbox" value="off">'+
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
  });
}

var updateStorage = function(path, contents) {
  setListHosts()
}

var enableHost = function(status, fileName) {
  var getFileContent = new Promise(function(resolve, reject) {
    var url = ApiUrl+'149/repository/files?file_path='+fileName+'&ref=master'
    fetch(url,
      {
        method: 'GET',
        headers: {
        'PRIVATE-TOKEN': token,
        'Content-Type': 'application/json'
      },
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      resolve(data)
    })
    .catch(function (error) {
    });
  })
  getFileContent.then(
    result => {
      setHost(status, fileName, result)
    },
    error => alert("Rejected: " + error.message) // Rejected: время вышло!
  )
}

var setHost = function(status, filePath, content) {
  Hosts.write(status, filePath, content)
}

var saveOrigHosts = function(){
  fs.readFile('/etc/hosts', 'utf8', function (err,data) {
    storage.set('hostsOrig', data, function(error) {
      if (error) throw error;
    });
  })
}

export {setListHosts, getListHosts, enableHost, updateStorage, storage, saveOrigHosts }
