<template>
  <form>
    <div class="row">
      <div class="row align-items-center items__hosts" v-for="msg in arrHosts">
        <div class="col-3">
          <div class="togglebutton">
            <label class="title__hosts">
              <input :data-fileName="msg.fileName" :name="msg.name" :id="msg.name" :value="msg.fileName" type="checkbox"
              v-model="toggle"
              v-on:input="checkboxVal = $event.target.value"
              v-bind:selected.sync="selectedMembers"
              @click="checkboxToggle"
              >
              <div class="toggle"></div>
              {{ msg.name }}
            </label>
          </div>
        </div>
      <div class="col-9">
        <h5 class="title__hosts mb-1"></h5>
      </div>
      </div>
    </div>
  </form>
</template>
<script>




const path = require('path')
const Git = require('../../../git')
const os = require('os');
const storage = require('electron-json-storage');
const assetsDirectory = path.join(__dirname, 'assets')
storage.setDataPath(os.tmpdir());
Git.saveOrigHosts()
if(process.platform == 'darwin'){
  // var tests =  new Promise(function(resolve, reject) {
  //   let cp = sudoer.spawn(
  //     'su', ['']
  //   );
  //   if(cp){
  //     resolve(cp)
  //   }else{
  //     reject(cp)
  //   }
  //
  // })
  // tests.then(
  //   result => {
  //     console.log(result)
  //
  //   },
  //   error => {
  //     console.log(error)
  //   }
  // )
}

export default {

  data() {
    return {
        checkbox: "",
        selectedMembers: "",
        toggle: [],
        arrHosts: '',
        selected: [],
        allSelected: [],
        userIds: [],
        check: 0
      }
  },
  methods: {
    checkboxToggle: function(e) {





      //  notification.onclick = function () {
      //    window.open("https://atom.io/");
      //  };


      this.toggle = []

    },
    getProfile () {
      var this_ = this;
      storage.get('getListFileContents', function(error, data) {
        this_.arrHosts = data
      })
    }
  },
  watch: {// depth  watcher

   'toggle': {

     handler: function (val, oldVal) {
       var this_ = this;

       if(this_.check == 0){
       var filename = val[0]
       if(filename == undefined){
         Git.disableHost(filename, 'reset')
       }else{
         var enableHost = new Promise(function(resolve, reject) {
            Git.enableHost('enable', filename)
            resolve(resolve)
         })
         enableHost.then(
           result => {
           },
           error => alert("Rejected: " + error.message) // Rejected: время вышло!
         )
       }
       }
     },
     deep: true

  }
  },
  created () {
    // storage.getAll(function(error, data) {
    // if (error) throw error;
    //
    // console.log(data);
    // });
    new Promise(function(resolve, reject) {
        resolve(Git.setListHosts())
    }).then(
      resolve => {
        this.getProfile()
      },
      error => {
        console.log(error)
      }
    )
  },
}
</script>
