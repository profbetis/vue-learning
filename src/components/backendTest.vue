<!--   BACKEND TEST PROPS   -->

<script>
import Vue from 'vue'
import sjcl from 'sjcl'

// COMPONENT TEMPLATE
var comp = Vue.extend({
  props: {
    backend: String,
    portNumber: Number
  },

  data: function () {
    return {
      username: '',
      coin: 0,
      aakEntry: '',
      cUsnEntry: '',
      usnEntry: '',
      cPwdEntry: '',
      pwdEntry: '',
      sessionToken: '',
      ticket: '',
      aakResponse: 'Waiting for server event...',
      aakResponseOK: true,
      createResponse: 'Waiting for server event...',
      createResponseOK: true,
      loginResponse: 'Waiting for server event...',
      loginResponseOK: true
    }
  },

  computed: {
    cpwhash: function () {
      return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(this.cPwdEntry))
    },

    pwhash: function () {
      return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(this.pwdEntry))
    }
  },

  template: '#backend-test-template',

  ready: function () {
    this.updateGirdle()
  },

  methods: {
    getTicket: function () {
      this.$http.post(this.backend + '/admin/tickets', '', {headers: {'Authorization': 'Admin ' + this.aakEntry}}).then((response) => {
        this.ticket = JSON.parse(response.body)
        this.aakResponseOK = true
        this.aakResponse = 'Returned with valid ticket'
        }, (err) => {
        this.aakResponseOK = false
        this.aakResponse = 'Failed to get ticket (POST to /tickets): ' + JSON.stringify(err)
      })

      this.aakEntry = ''
      this.aakResponseOK = false
      // this.aakResponse = 'Waiting for server event...'
    },

    createUser: function () {
      this.$http.post(this.backend + '/incept' + '/' + this.ticket, {'name': this.cUsnEntry, 'pwhash': this.cpwhash}).then((response) => {
        console.log(JSON.parse(response.body))
        this.createResponseOK = true
        this.createResponse = 'Successfully created user ' + this.cusnEntry
      }, (err) => {
        console.log('Failed to create user (POST to /incept): ' + JSON.stringify(err))
        this.createResponseOK = false
        this.createResponse = 'Failed to create user'
      })

      this.cusnEntry = ''
      this.cpwdEntry = ''
      // this.createResponseOK = false
      // this.createResponse = 'Waiting for server event...'
    },

    submitLogin: function () {
      this.$http.post(this.backend + '/tokens', {'name': this.usnEntry, 'pwhash': this.pwhash}).then((response) => {
        console.log(JSON.parse(response.body))
        this.sessionToken = (JSON.parse(response.body)).token
        console.log(this.sessionToken)
        this.loginResponseOK = true
        this.loginResponse = 'Successfully logged-in'
        this.updateGirdle()
        this.getProfile()
        this.clearFields()
        }, (err) => {
          console.log('Failed to log-in (POST to /token): ' + JSON.stringify(err))
          this.loginResponseOK = false
          this.loginResponse = 'Failed to log-in'
      })
    },

    getProfile: function () {
      this.$http.get(this.backend + '/profile', {headers: {'Authorization': 'Bearer ' + this.sessionToken}}).then((response) => {
        console.log(JSON.parse(response.body))
        this.username = (JSON.parse(response.body)).name
        this.coin = (JSON.parse(response.body)).coin
        }, (err) => {
          console.log('Failed to get profile (GET to /profile): ' + JSON.stringify(err))
      })
    },

    clearFields: function () {
      this.usnEntry = ''
      this.pwdEntry = ''
      // this.loginResponse = 'Waiting for server event...'
    },

    updateGirdle: function () {
      this.$dispatch('give-component-info',
        { compName: 'Backend Test',
          compInfo: [
          ['sessionToken', this.sessionToken],
          ['port', this.portNumber]
          ]
        }
      )
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

    <h2>Admin Access</h2>
    <div class="outline">
      <div class="input-group">
        <input name='aak' placeholder='admin api key' v-model='aakEntry'>
        <button v-on:click='getTicket()' :disabled='!aakEntry'>Get Ticket</button>
      </div>
      <h4 v-bind:class="['api-response', aakResponseOK ? 'good' : 'bad']">{{aakResponse}}</h4>

      <p>Incept Ticket » {{ticket}}</p>
      <div class="input-group">
        <input name='cusn' placeholder='username' v-model='cUsnEntry'>
        <input name='cpwd' type='password' placeholder='password' v-model='cPwdEntry'>
      </div>
      <button v-on:click='createUser()' :disabled='!ticket'>Create User</button>
      <h4 v-bind:class="['api-response', createResponseOK ? 'good' : 'bad']">{{createResponse}}</h4>
    </div>

    <h2>User Access</h2>
    <div class="outline">
      <div class="input-group">
        <input name='usn' placeholder='username' v-model='usnEntry'>
        <input name='pwd' type='password' placeholder='password' v-model='pwdEntry'>
      </div>
      <button v-on:click='submitLogin()'>Log-in</button>
      <h4 v-bind:class="['api-response', loginResponseOK ? 'good' : 'bad']">{{loginResponse}}</h4>
      <h3 v-if='sessionToken'>User: {{username}}, Coin: {{coin}}</h3>
    </div>
  </div>
</template>


<style>
.backend-test{
  position: relative;
}

.backend-test .api-response{
  text-align: center;
  font-weight: 100;
  font-size: 0.8em;
}
.backend-test .api-response.good{ color: #60a060; }
.backend-test .api-response.bad{ color: #a06060; }

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
