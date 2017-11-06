<template>
  <div id="app">
    <router-view></router-view>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test-project'
  }
</script>

<style>
  @import "https://fonts.googleapis.com/icon?family=Material+Icons";
  /*@import "~bootstrap/dist/css/bootstrap.min.css";*/
  /*@import "~bootstrap/dist/css/bootstrap.css";*/
  /*@import "~bootstrap-vue/dist/bootstrap-vue.css";*/
  @import "~bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
  @import "./assets/css/main.css";
  /*@import '~bootstrap/dist/css/bootstrap-material-design.min.css';*/
</style>
