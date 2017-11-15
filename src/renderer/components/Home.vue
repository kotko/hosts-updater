<template>
  <div id="wrapper">
    <p id="demo"></p>
    <!-- <button type="input" class="btn" @click="updateStorage">test</button> -->
    <rowitems></rowitems>
    <div style="float:left" id="updating-status"></div>
    <div style="text-align:right" id="version">v{{version}}</div>


    <div id="modals"  style="text-align:center">
      <div class="modal-dialog update-modal">
        <div class="modal-content" style="">
          <div class="modal-body" style="height: 120px;">
            <i style="
                padding: 0;
                text-align: center;
                display: table;
                position: absolute;
                top: 30px;

                right: 0;
                left: 0;
                margin: auto;
            " class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span class="sr-only"></span>
            <p id="percent-update"></p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>


  import SystemInformation from './LandingPage/SystemInformation'
  import Rowitems from './LandingPage/Rowitems'
  const Git = require('../../git')
  // const Update = require('../updater.js')
  export default {
    name: 'home-page',
    components: { SystemInformation, Rowitems  },
    data(){
      return {
        version: ''
      }
    },
    methods: {
      updateStorage: function(e) {
        Git.updateStorage()
      }
    },
    created () {
      this.updateStorage()
      var appVersion = require('electron').remote.app.getVersion()
      this.version = appVersion
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
