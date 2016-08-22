<!--   BACKEND TEST PROPS   -->

<script>
import Vue from 'vue'
import $ from 'jquery'

// COMPONENT TEMPLATE
var comp = Vue.extend({
  props: {
    portNumber: Number
  },

  data: function () {
    return {
      usn: '',
      pwd: ''
    }
  },

  template: '#backend-test-template',

  ready: function () {
    // Give component info to component girdle
    this.$dispatch('give-component-info',
      { compName: 'Backend Test',
        compInfo: [
        ['port', this.portNumber]
        ]
      }
    )
  },

  methods: {
    submitLogin: function () {
    },

    sayHi: function () {
      $.get('api/hello', function (res) {
        console.log('Response from mock backend: ' + res)
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
  <div class="backend-test component-meta outline">
    <button v-on:click="sayHi()">Say Hello</button>
  </div>
</template>


<style>
.backend-test{
  position: relative;
}

</style>
