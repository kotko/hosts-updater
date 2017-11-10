<template>
  <form>
    <span>Выбранные имена: {{ toggle }}</span>
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
              {{ msg.fileName }}
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
const Git = require('../../../git')
const os = require('os');
const storage = require('electron-json-storage');
const sudo = require('sudo-prompt');
storage.setDataPath(os.tmpdir());
Git.saveOrigHosts()
if(process.platform == 'darwin'){
  var Sudoer = require('electron-sudo-mac').default;
  var options = {name: 'electron sudo sapplication'};
  var sudoer = new Sudoer(options);
  console.log(sudoer)
  // sudoer.spawn('su', ['']).then(function (cp) {
  //   cp.stdout.on('data', (msg) => {
  //     console.log('Looks like we have a message on STDOUT');
  //     console.log(msg)
  //   });
  //   cp.on('close',() => {
  //       console.log('close')
  //   });
  // })
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
       console.log('handler')
       var this_ = this;

       if(this_.check == 0){
       var filename = val[0]
       var status = true;
       if(filename == undefined){
         Git.disableHost()
       }else{
         var enableHost = new Promise(function(resolve, reject) {
            Git.enableHost(true, filename)
            resolve(resolve)
         })
         enableHost.then(
           result => {
            //  storage.get('toggle-status', function(error, data) {
            //    console.log(data)
            //   // this_.toggle = ''
            //   if(data != 'off'){
            //     this_.toggle = []
            //   }
            //  });
            //  this_.check = 0
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



    Git.setListHosts(),

    this.getProfile()


  },
}
</script>
