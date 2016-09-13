<!--   BACKEND TEST PROPS   -->

<script>
import Vue from 'vue'

// COMPONENT TEMPLATE
var comp = Vue.extend({
  props: {
    backend: String,
    portNumber: Number
  },

  data: function () {
    return {
      username: 'n/a',
      usnEntry: '',
      pwdEntry: '',
      session: ''
    }
  },

  template: '#backend-test-template',

  ready: function () {
    // Give component info to component girdle
    this.$dispatch('give-component-info',
      { compName: 'Backend Test',
        compInfo: [
        ['currentUser', this.username],
        ['session', this.session],
        ['port', this.portNumber]
        ]
      }
    )
  },

  methods: {
    submitLogin: function () {
      this.$http.get(this.backend + '/source').then((response) => {
        console.log(JSON.parse(response.body))
        }, (err) => {
        console.log('Failed to GET /source: ' + JSON.stringify(err))
      })
    },

    createUser: function () {
      this.$http.get(this.backend + '/source').then((response) => {
        console.log(JSON.parse(response.body))
        }, (err) => {
        console.log('Failed to GET /source: ' + JSON.stringify(err))
      })
    }
  },

  events: {
    'login-success': function () {
    }
  }
})

export default comp

</script>

<!-- COMPONENT TEMPLATE -->
<template id="backend-test-template">
  <div class="backend-test component-meta">

    <h2>User Access</h2>
    <div class="outline">
      <div class="input-group">
        <input name='usn' placeholder='username' v-model='usnEntry'>
        <input name='pwd' type='password' placeholder='password' v-model='pwdEntry'>
      </div>
      <button v-on:click='loginUser()'>Log-in</button>
      <button v-on:click='sayHi()'>Create User</button>
    </div>

  </div>
</template>


<style>
.backend-test{
  position: relative;
}

.backend-test .input-group{
  display: flex;
}
.backend-test input{
  text-align: center;
  width: 100%;
}
.backend-test button{
  width: 100%;
}

</style>
