<!--   DASHBOARD PROPS   -->

<script>
import Vue from 'vue'
import $ from 'jquery'

export default Vue.extend({
  props: {
    dataSources: Array
  },

  template: '#comp-spawner-template',

  data: () => {
    return {
      dataSources: [],
      components: []
    }
  },

  events: {
    'add-component': function () {

    }
  }
})
</script>

<template id="dashboard-template">
  <div id="dashboard">
    <h1>Dashboard</h1>

    <div>
      <!-- <component-girdle comp-id="000"> -->
    </component-girdle>
    </div>

    <comp-spawner id="dashboard-comp-spawner"
      :data-sources="dataSources"></comp-spawner>

  </div>
</template>

<style>
</style>
