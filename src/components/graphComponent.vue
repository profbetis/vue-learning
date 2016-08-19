<script>
import Vue from 'vue'

var canvasW = 256
var canvasH = 256

var time = 0
const msUpdate = 16

var canvasId = '000' // Need to get this updated on creation
var canvasEl
var ctx

const TAU = 2 * Math.PI

function initLoop () {
  setInterval(() => { drawLoop() }, msUpdate)
}

function makeCircle (centerX, centerY, radius) {
  ctx.strokeStyle = '#686058'
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, TAU)
  ctx.stroke()
}

function drawLoop () {
  ctx.clearRect(0, 0, canvasW, canvasH)
  makeCircle(128, 128, 64 * (0.5 + 0.25 * Math.sin(time * 1)))
  makeCircle(
    Math.sin(time * 4) * 64 + 128,
    Math.cos(time * 4) * 64 + 128,
    16)
  time = time + msUpdate * 0.001
}

export default Vue.extend({
  props: ['dataSet', 'canvasId', 'animatedGraph'],
  template: `
  <div class="graph-component-meta component-meta">

      <h2 class="component-title">Graph Component</h2>

      <canvas
        id="canvas-graph-{{canvasId}}"
        width="256"
        height="256">
      </canvas>

  </div>`,
  data: () => {
    return {
      // isAnimated: this.animatedGraph
    }
  },
  ready: () => {
    canvasEl = document.getElementById('canvas-graph-' + canvasId)
    ctx = canvasEl.getContext('2d')
    // console.log(this.isAnimated)
    true ? initLoop() : drawLoop()
  }
})

</script>

<style>
.graph-component-meta{
}
.graph-component-meta canvas{
    background-color: rgba(0,0,0,0.1);
    outline: 1px dotted #686058;
    outline-offset: -1px;
}
</style>
