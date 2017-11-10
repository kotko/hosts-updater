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

storage.setDataPath(os.tmpdir());
const sudo = require('sudo-prompt');
// sudo.exec('echo hello', { name: 'Hosts'},
//   function(error, stdout, stderr) {
//     if (error) throw error;
//     // storage.has('getListFileContents', function(error, hasKey) {
//     //   if (error) throw error;
//     //
//     //   if (hasKey) {
//     //     Git.getListHosts();
//     //   }else{
//     //
//     //     Git.setListHosts();
//     //   }
//     // });
//   }
// );
export default {

  data() {
    return {
        checkbox: "",
        selectedMembers: "",
        toggle: [],
        arrHosts: '',
        selected: [],
        allSelected: [],
        userIds: []
      }
  },
  methods: {
    checkboxToggle: function(e) {
      // console.log(this.toggle)
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
       var filename = val[0]
       var status = true;
       if(filename == undefined){
         Git.disableHost()
       }else{
         Git.enableHost(true, filename)
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


    Git.saveOrigHosts(),
    Git.setListHosts(),

    this.getProfile()


  },
}
</script>
