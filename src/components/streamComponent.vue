<!--   CHAT COMPONENT PROPS   -->
<!--   'comp-id' // Integer // The component's id   -->
<!--   'stream-name' // Literal String // The name of the data set   -->
<!--   'stream-data' // Referenced Array // The data to be used   -->
<!--   'message-history' // Integer // Number of recent messages to show   -->

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    compId: Number,
    streamName: String,
    streamData: Array,
    messageHistory: Number
  },

  template: '#stream-component-template',

  data: () => {
    return {
      newMessage: '',
      users: 2
    }
  },

  computed: {
    recentMessages: function () {
      return this.streamData.slice(-1 * this.messageHistory)
    },

    girdleInfo: function () {
      return {
        compName: this.streamName + ' (Stream Component)',
        compInfo: [
          ['streamName', this.streamName, this.streamData.length + ' total messages'],
          ['users', this.users],
          ['history slice', this.messageHistory]
        ]
      }
    }
  },

  ready: function () {
    this.passInfoToGirdle(this.girdleInfo)
  },

  methods: {
    passInfoToGirdle: function (information) {
      this.$dispatch('give-component-info', information)
    },

    createMessage: function () {
      this.streamData.push({
        user: 'Kevin Weber',
        text: this.newMessage
      })
      this.passInfoToGirdle(this.girdleInfo)
    },

    submitOnEnter: function () {
      if (this.newMessage.length > 0) {
        this.createMessage()
      }
      this.newMessage = ''
    }
  }
})
</script>

<template id="stream-component-template">
  <div class="stream-component component-meta">

    <div class="stream-message"
      v-for="msg in recentMessages">
      {{msg.user}} » {{msg.text}}
    </div>

    <input type="text"
      v-model="newMessage"
      @keydown.enter="submitOnEnter()">

  </div>

</template>

<style>

.stream-component{
}

.stream-component .stream-message{
  outline: 1px dotted #686058;
  outline-offset: -1px;
  background: rgba(255,255,255,0.03);
  padding: 0.25em;
  margin: 0.25em;
}



/*********************/
/* INPUT START
/*********************/
table input{
  background-color: transparent;
  border: none;
  color: #d0d0d0;
  width: auto;
  font-size: 14px;
  font-family: monospace;
}
table input:focus{outline: none;}
input::-webkit-input-placeholder,
input:-moz-input-placeholder,
input::-moz-input-placeholder,
input:-ms-input-placeholder{
  color: #f06060;
}
/*********************/
/* INPUT START
/*********************/
</style>
