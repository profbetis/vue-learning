<!--   CHAT COMPONENT PROPS   -->
<!--   'comp-id' // Integer // The component's id   -->
<!--   'stream-name' // Literal String // The name of the data set   -->
<!--   'stream-data' // Referenced Array // The data to be used   -->
<!--   'message-history' // Integer // Number of recent messages to show   -->

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    // propName: PropType,
    backend: String,
    source: Object
  },

  template: '#source-component-template',

  data: () => {
    return {
    }
  },

  created: function () {
    // GET /someUrl
    this.$http.get(this.backend + '/source').then((response) => {
    // success callback
    this.passSourceToApp(JSON.parse(response.body))
  }, (err) => {
      console.log('Failed to GET /source: ' + JSON.stringify(err))
    })
  },

  methods: {
    passSourceToApp: function (source) {
      this.$dispatch('update-source', source)
    }
  }
})
</script>



<template id="source-component-template">
  <div class="source-component component-meta outline">

    <a href="{{source.location}}">
      Copyright {{source.licensed-to}} under {{source.license}}
    </a>

  </div>

</template>



<style>

.source-component{
}

</style>
