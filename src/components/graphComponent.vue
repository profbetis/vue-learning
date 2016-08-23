<!--   GRAPH COMPONENT PROPS   -->
<!--   'data-name' // Literal String // The name of the data set   -->
<!--   'data-set' // Referenced Array // The data to be used   -->
<!--   'canvas-id' // Bool // Generates a column for the index number   -->
<!--   'animated' // Bool // Generates a column for the index number   -->

<script>
import Vue from 'vue'

const msUpdate = 16
const TAU = 2 * Math.PI

// COMPONENT TEMPLATE
var comp = Vue.extend({
  props: {
    compId: Number,
    compName: String,
    dataName: String,
    dataSet: Array,
    animated: Boolean,
    canvasW: Number,
    canvasH: Number
  },

  data: function () {
    return {
      time: 0,
      ctx: null,
      ready: false
    }
  },

  template: '#graph-component-template',

  compiled: function () {
    this.passInfoToGirdle({
      compName: this.compName + ' (Graph Editor)',
      compInfo: [
        ['canvasId', '#' + this.compId],
        ['dataSet', this.dataName, this.dataSet.length + ' elements'],
        ['canvasSize', this.canvasW + ' × ' + this.canvasH],
        ['animated', this.animated]
      ]
    })
  },

  ready: function () {
    this.initCanvas()
  },

  methods: {
    passInfoToGirdle: function (information) {
      this.$dispatch('give-component-info', information)
    },

    initCanvas: function () {
      let canvasEl = document.getElementById('canvas-graph-' + this.compId)
      this.ctx = canvasEl.getContext('2d')
      this.animated ? this.startLoop() : this.drawTick()
    },

    makeCircle: function (centerX, centerY, radius) {
      let cx = this.ctx
      cx.beginPath()
      cx.arc(centerX, centerY, radius, 0, TAU)
      cx.stroke()
    },

    drawTick: function () {
      let cx = this.ctx
      cx.strokeStyle = '#686058'
      cx.fillStyle = '#686058'

      cx.clearRect(0, 0, this.canvasW, this.canvasH)

      this.makeCircle(128, 128, 64 * (0.5 + 0.25 * Math.sin(this.time * 1)))

      let count = this.dataSet.length
      for (let i = 0; i < count; i++) {
        let centerX = Math.sin(this.time * 2 + (TAU * i / count)) * 64 + 128
        let centerY = Math.cos(this.time * 2 + (TAU * i / count)) * 64 + 128

        this.makeCircle(centerX, centerY, this.dataSet[i] * 1)
        cx.font = '20px "Open Sans Light"'
        cx.textAlign = 'center'
        cx.textBaseline = 'middle'
        cx.fillText(this.dataSet[i], centerX, centerY)
      }

      this.time += msUpdate * 0.001
    },

    startLoop: function () {
      setInterval(this.drawTick, msUpdate)
    }
  }
})

export default comp

</script>

<!-- COMPONENT TEMPLATE -->
<template id="graph-component-template">
  <div class="graph-component component-meta">

    <canvas
      id="canvas-graph-{{compId}}"
      width='{{canvasW}}'
      height='{{canvasH}}'>
    </canvas>

  </div>
</template>



<style>
.graph-component{
}
.graph-component canvas{
  background-color: rgba(0,0,0,0.2);
  outline: 1px dotted #686058;
  outline-offset: -1px;
  margin-bottom: -5px;
}
</style>
