'use strict'

const token = 'G9YdzzeyHT-RsoXaFA8e';
const ApiUrl = 'http://gitlab.stb.ua/api/v3/projects/'
const storage = require('electron-storage');



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
var getListHosts = function () {
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
          'content' : atob(value.content)
        }
      )
    })).then(response => {
      // getListFileContent(urls)
      // console.log(content)
      getListFileContents(content)
    })
  });
}
var getListFileContents = function (contents) {
  storage.set('getListFileContents', contents, (err) => {
  if (err) {
    console.error(err)
  }
});
}








export {getListHosts }
